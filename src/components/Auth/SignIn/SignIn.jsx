import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";
import { auth } from "../../../firebase/firebase.utils";
import { setIsNewUser } from "../../../redux/signup/isNewUser-actions";
import { setUser } from "../../../redux/user/user-actions";
import { getUserDocument } from "../../../firebase/firebase.utils";
import Logo from "../../Logo/Logo";
import "./SignIn.css";
import { Redirect } from "react-router-dom";
import userRoles from "../../../utils/userRoles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    props.setUser(null);
  }
  state = {
    isEmail: false,
    isPassword: false,
    email: "",
    password: "",
    isSignin: false,
    errorMessage: "",
    signinErrorMessage: "Please fill all the fields",
    labelWidth: 0,
    inputLabel: null,
    isSigninClicked: false,
    role: userRoles.signedout,
  };

  handleEmailChange = (event) => {
    let isEmailProper =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.target.value
      );
    event.target.value.length < 1 || !isEmailProper
      ? this.setState({ isEmail: true })
      : this.setState({ isEmail: false });
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSigninClick = async () => {
    this.setState({ isSigninClicked: true });
    const { email, password } = this.state;
    if (!this.state.isEmail && !this.state.isPassword) {
      try {
        var userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        localStorage.setItem("currentUserId", userCredential.user.uid);
        let userObject = await getUserDocument(userCredential.user.uid);
        console.log("user data for updating", userObject.data);
        await this.props?.updateUser(userObject.data, userObject.role);
        this.setState({ isSignin: true, role: userObject.role }, () =>
          this.setState({ signinErrorMessage: "" })
        );

        this.setState({
          email: "",
          password: "",
        });
      } catch (error) {
        if (error.code === "auth/user-not-found")
          this.setState({
            errorMessage: "Incorrect e-mail ID or password. Please check!",
            isSignin: false,
            role: userRoles.signedout,
          });
        else if (error.code === "auth/wrong-password")
          this.setState({
            errorMessage: "Incorrect e-mail ID or password. Please check!",
            isSignin: false,
            role: userRoles.signedout,
          });
        console.error(error);
      }
      // console.log("ok")
    } else {
      // console.log("not ok")
      this.setState({ isSignin: false, role: userRoles.signedout }, () =>
        this.setState({ signinErrorMessage: "* Please fill all the fields" })
      );
      return;
    }
  };

  redirectUser() {
    switch (this.state.role) {
      case userRoles.admin:
        return <Redirect to="/dashboard" />;
      case userRoles.faculty:
        return <Redirect to="/dashboard" />;
      case userRoles.general:
        return <Redirect to="/home" />;
      default:
        return <Redirect to="/SignIn" />;
    }
  }

  render() {
    if (this.state.isSignin) {
      this.redirectUser();
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Logo height="196" width="150" />
          <br />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel variant="outlined" className="input-label">
                    Email Address
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    labelWidth={60}
                    error={this.state.isEmail}
                    required={true}
                    fullWidth
                    autoComplete="email"
                    onChange={(event) => this.handleEmailChange(event)}
                  />
                  {this.state.isEmail && (
                    <FormHelperText error={true}>
                      * Please check the email entered
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel variant="outlined" className="input-label">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    type="password"
                    labelWidth={60}
                    required={true}
                    fullWidth
                    onChange={(event) => this.handlePasswordChange(event)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <br />
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
          {this.state.isSigninClicked ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className="submit"
              onClick={() => this.handleSigninClick()}
            >
              Sign In
            </Button>
          )}

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/SignUp">Don't have an account? Sign up</Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setIsNewUser: (isNewUser) => dispatch(setIsNewUser(isNewUser)),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
