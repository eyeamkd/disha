import React, { Component } from "react";
import firebase from "firebase/app";
import { database } from "../../firebase/firebase.utils";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import {
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import "./style.css";
import zxcvbn from "zxcvbn";
import { PASSWORD_STRENGTHS } from "../../shared/constants";
import Logo from "../Logo/Logo";

export class SetPassword extends Component {
  snackBarStyle = "";
  snackBarMessage = "";
  vertical = "bottom";
  horizontal = "center";

  constructor(props) {
    super(props);
    this.state = {
      facultyData: null,
      email: "",
      dataLoaded: false,
      open: false,
      emailExists: false,
      newPassword: "",
      confirmPassword: "",
      isNewPasswordValid: true,
      isConfirmPasswordValid: true,
      passwordMessage: "",
      accountCreated: false,
    };
  }

  componentDidMount() {
    debugger;
    const { email } = this.props.match.params;
    console.log(email);
    let mailId = atob(email);
    debugger;
    this.setState({ email: mailId }, () => {
      this.verifyMailId();
    });
  }

  verifyMailId() {
    database
      .collection("faculty")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          this.setState({ dataLoaded: true });
          return;
        }
        snapshot.forEach((doc) => {
          let a = doc.data();
          a.id = doc.id;
          this.setState({
            facultyData: a,
            emailExists: true,
            dataLoaded: true,
          });
        });
      })
      .catch((err) => {
        console.log("Error in getting not verified users");
      });
  }

  handleNewPasswordChange = (event) => {
    let pwdAnalysis = zxcvbn(event.target.value); //Gives the password strength score
    if (event.target.value.length < 8) {
      this.setState({ isNewPasswordValid: false });
    } else {
      this.setState({ isNewPasswordValid: true });
    }
    if (
      this.state.confirmPassword &&
      event.target.value !== this.state.confirmPassword
    ) {
      this.setState({ isConfirmPasswordValid: false });
    } else {
      this.setState({ isConfirmPasswordValid: true });
    }
    this.setState({
      newPassword: event.target.value,
      passwordMessage: PASSWORD_STRENGTHS[pwdAnalysis.score],
    });
  };

  handleConfirmPasswordChange = (event) => {
    if (event.target.value !== this.state.newPassword) {
      this.setState({ isConfirmPasswordValid: false });
    } else {
      this.setState({ isConfirmPasswordValid: true });
    }
    this.setState({ confirmPassword: event.target.value });
  };

  handlePasswordSubmit = () => {
    if (this.state.isNewPasswordValid && this.state.isConfirmPasswordValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email,
          this.state.newPassword
        )
        .then(() => {
          this.setState({ accountCreated: true });
          database
            .collection("faculty")
            .doc(this.state.facultyData.id)
            .update({ isActivated: true })
            .then((docRef) => {
              console.log("Updated");
            })
            .catch((err) => {
              console.log(
                "Oof! there was an error! Please try after some time"
              );
            });
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(
            "Oof! there was an error! Please try after some time",
            errorCode,
            errorMessage
          );
        });
    }
  };

  render() {
    console.log(this.state.facultyData);
    if (!this.state.dataLoaded) {
      return (
        <div className="dashboard-loader-style">
          <CircularProgress size={100} thickness={2} />
          <Typography style={{ marginTop: "10px" }}>
            Loading... Please wait
          </Typography>
        </div>
      );
    } else {
      debugger;
      if (
        this.state.emailExists &&
        this.state.facultyData.isActivated === false
      ) {
        return (
          <Container component="main" maxWidth="sm">
            <div className="paper">
              <Logo height="196" width="150" />
              <br />
              <Typography
                variant="h1"
                style={{ fontSize: "3em", textAlign: "center" }}
              >
                Hello, {this.state.facultyData.name}!
              </Typography>
              <Typography
                variant="h1"
                style={{ fontSize: "2em", textAlign: "center" }}
              >
                Set your Faculty Password
              </Typography>
            </div>
            <Box justifyContent="center">
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="New Password"
                      id="NewPassword"
                      placeholder="New Password"
                      variant="outlined"
                      required
                      type="password"
                      onChange={this.handleNewPasswordChange}
                      error={!this.state.isNewPasswordValid}
                    />
                  </FormControl>
                  {!this.state.isNewPasswordValid && (
                    <FormHelperText error={true}>
                      * Password too short!
                    </FormHelperText>
                  )}
                  <FormHelperText error={false}>
                    {this.state.passwordMessage}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Confirm Password"
                      id="ConfirmPassword"
                      placeholder="Confirm Password"
                      variant="outlined"
                      required
                      type="password"
                      onChange={this.handleConfirmPasswordChange}
                      error={!this.state.isConfirmPasswordValid}
                    />
                  </FormControl>
                  {!this.state.isConfirmPasswordValid && (
                    <FormHelperText error={true}>
                      Passwords do not match!
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="button"
                  size="medium"
                  onClick={this.handlePasswordSubmit}
                >
                  <div id="textColor">Set Password</div>
                </Button>
              </Grid>
            </Box>
            {this.state.accountCreated ? <Redirect to="/" /> : <div></div>}
          </Container>
        );
      } else {
        return <Redirect to="/404" />;
      }
    }
  }
}

export default SetPassword;
