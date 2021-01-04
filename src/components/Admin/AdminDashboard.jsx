import React, { Component } from "react";
import MaterialTable from "material-table";
import { database } from "../../firebase/firebase.utils";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "./style.css";

export class AdminDashboard extends Component {
  snackBarStyle = "";
  snackBarMessage = "";
  vertical = "bottom";
  horizontal = "center";

  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      dataLoaded: false,
      open: false,
    };
    this.getUsersData();
  }

  componentWillUnmount() {
    this.setState({
      userData: [],
      dataLoaded: false,
      open: false,
    });
  }

  getUsersData() {
    let usersDataArray = [];
    database
      .collection("users")
      .where("isAuthenticated", "==", false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersDataArray.push(doc.data());
        });
        this.setState({ usersData: usersDataArray, dataLoaded: true });
      })
      .catch((err) => {
        console.log("Error in getting not verified users");
      });
  }

  verifyUser(userData, usersArray) {
    database
      .collection("users")
      .where("rollNumber", "==", userData.rollNumber)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("doc received", doc);
          doc.ref.update({
            isAuthenticated: true,
          });
          usersArray.splice(usersArray.indexOf(userData), 1);
          this.setState({ usersData: usersArray });
          this.snackBarStyle = "success";
          this.snackBarMessage = `${userData.firstName} Verified Successfully!`;
          this.setState({ open: true });
        });
      })
      .catch((err) => console.log(err));
  }

  userRejected(userData, usersArray) {
    usersArray.splice(usersArray.indexOf(userData), 1);
    this.setState({ usersData: usersArray });
    this.snackBarStyle = "error";
    this.snackBarMessage = `${userData.firstName} Rejected!`;
    this.setState({ open: true });
  }

  render() {
    console.log("not verified users", this.state.usersData);
    if (this.state.usersData.length === 0 && this.state.dataLoaded === false) {
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
        <Container>
          <MaterialTable
            title="Confirm Account Requests"
            columns={[
              { title: "Name", field: "firstName" },
              { title: "Batch", field: "year" },
              { title: "Roll Number", field: "rollNumber" },
              { title: "Department", field: "department" },
              { title: "Email", field: "email" },
            ]}
            data={this.state.usersData.filter((user) => !user.verified)}
            actions={[
              {
                icon: "check",
                tooltip: "Accept",
                onClick: (event, rowData) => {
                  return this.verifyUser(rowData, this.state.usersData);
                },
                color: "primary",
                iconProps: { style: { color: "green" } },
              },
              {
                icon: "clear",
                tooltip: "Reject",
                onClick: (event, rowData) =>
                  this.userRejected(rowData, this.state.usersData),
                color: "primary",
                iconProps: { style: { color: "red" } },
              },
            ]}
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
        </Container>
      );
    }
  }
}

export default AdminDashboard;
