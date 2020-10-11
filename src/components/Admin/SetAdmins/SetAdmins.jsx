import React, { Component } from "react";
import MaterialTable from "material-table";
import { database } from "../../../firebase/firebase.utils";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { DEPARTMENT_CODES } from "../../../shared/constants";
import Form from "react-bootstrap/Form";
import "./style.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { red, green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

export class SetAdmins extends Component {
  snackBarStyle = "";
  snackBarMessage = "";
  vertical = "bottom";
  horizontal = "center";
  deptCodes = [];
  constructor(props) {
    super(props);
    this.state = {
      facultyData: [],
      facultyDepts: [],
      open: false,
    };
    this.getFacultyData();
    for (let key in DEPARTMENT_CODES) {
      this.deptCodes.push(DEPARTMENT_CODES[key]);
    }
  }

  componentWillUnmount() {}

  getFacultyData() {
    let facultyDataArray = [];
    let facultyDepts = [];

    database
      .collection("faculty")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          facultyDataArray.push(a);
          facultyDepts.push(a.department);
        });
        this.setState({
          facultyData: facultyDataArray,
          facultyDepts: facultyDepts,
          dataLoaded: true,
        });
      })
      .catch((err) => {
        console.log("Error in getting not verified users");
      });
  }

  addFaculty = (newData) => {
    return new Promise((resolve, reject) => {
      database
        .collection("faculty")
        .add(newData)
        .then((docRef) => {
          newData.id = docRef.id;
          this.state.facultyDepts.push(newData.department);
          this.setState({
            facultyData: [...this.state.facultyData, newData],
            facultyDepts: this.state.facultyDepts,
          });
        })
        .then(() => {
          this.sendMail(newData.email);
          this.snackBarStyle = "success";
          this.snackBarMessage = "Faculty assigned!";
          this.setState({ open: true });
          resolve();
        })
        .catch((err) => {
          console.log("Oof! there was an error! Please try after some time");
        });
    });
  };

  updateFaculty = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      database
        .collection("faculty")
        .doc(newData.id)
        .update(newData)
        .then((docRef) => {
          const dataUpdate = [...this.state.facultyData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          let i = this.state.facultyDepts.indexOf(oldData.department);
          if (i > -1) {
            this.state.facultyDepts.splice(i, 1);
          }
          this.state.facultyDepts.push(newData.department);
          this.setState({
            facultyData: [...dataUpdate],
            facultyDepts: this.state.facultyDepts,
          });
        })
        .then(() => {
          if (oldData.email !== newData.email) {
            this.sendMail(newData.email);
          }
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log("Oof! there was an error! Please try after some time");
        });
    });
  };

  deleteFaculty = (oldData) => {
    return new Promise((resolve, reject) => {
      database
        .collection("faculty")
        .doc(oldData.id)
        .delete()
        .then((docRef) => {
          const dataDelete = [...this.state.facultyData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          let i = this.state.facultyDepts.indexOf(oldData.department);
          if (i > -1) {
            this.state.facultyDepts.splice(i, 1);
          }
          this.setState({
            facultyData: [...dataDelete],
            facultyDepts: this.state.facultyDepts,
          });
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log("Oof! there was an error! Please try after some time");
        });
    });
  };

  sendMail(mailId) {
    let mailBase64 = btoa(mailId);
    console.log("Sending mail to", mailId, "with ID", mailBase64);
    //Add mailing code here
  }

  render() {
    if (
      this.state.facultyData.length === 0 &&
      this.state.dataLoaded === false
    ) {
      return (
        <div className="dashboard-loader-style">
          <CircularProgress size={100} thickness={2} />
          <Typography style={{ marginTop: "10px" }}>
            Loading Data, This Might take a While..
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <div id="responsive">
            <MaterialTable
              title="Faculty Admins"
              columns={[
                { title: "Name", field: "name" },
                {
                  title: "Department",
                  field: "department",
                  editComponent: (props) => (
                    <Form.Control
                      as="select"
                      value={props.value}
                      onChange={(e) => props.onChange(e.target.value)}
                      id="deptDropdown"
                    >
                      {this.deptCodes.map((dept, key) => (
                        <option
                          style={
                            this.state.facultyDepts.includes(dept) &&
                            dept !== props.value
                              ? { color: "#c7c7c7" }
                              : { color: "#000" }
                          }
                          disabled={
                            this.state.facultyDepts.includes(dept) &&
                            dept !== props.value
                          }
                          value={dept}
                        >
                          {dept}
                        </option>
                      ))}
                    </Form.Control>
                  ),
                },
                { title: "Email", field: "email" },
                {
                  title: "Activated",
                  field: "isActivated",
                  editable: "never",
                  render: (rowData) =>
                    rowData.isActivated ? (
                      <CheckIcon style={{ color: green[600] }} />
                    ) : (
                      <ClearIcon style={{ color: red[500] }} />
                    ),
                },
              ]}
              data={this.state.facultyData}
              editable={{
                onRowAdd: (newData) => this.addFaculty(newData),
                onRowUpdate: (newData, oldData) =>
                  this.updateFaculty(newData, oldData),
                onRowDelete: (oldData) => this.deleteFaculty(oldData),
              }}
              options={{ actionsColumnIndex: -1, search: false }}
              localization={{
                body: {
                  editRow: {
                    deleteText: "Are you sure you want to remove this faculty?",
                  },
                },
              }}
            />
            <Snackbar
              anchorOrigin={{
                vertical: this.vertical,
                horizontal: this.horizontal,
              }}
              open={this.state.open}
              autoHideDuration={5000}
              key={this.vertical + this.horizontal}
              onClose={() => this.setState({ open: false })}
            >
              <MuiAlert severity={this.snackBarStyle}>
                {this.snackBarMessage}
              </MuiAlert>
            </Snackbar>
          </div>
        </div>
      );
    }
  }
}

export default SetAdmins;
