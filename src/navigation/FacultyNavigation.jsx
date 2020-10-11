import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import SignIn from "../components/Auth/SignIn/SignIn";
import FacultyDashboard from "../components/FacultyDashboard";
import LandingPage from "../components/LandingPage";

export class FacultyNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };

    console.log("In Faculty Navigation");
  }

  componentWillReceiveProps() {
    this.setState({ userInfo: this.props.userInfo });
  }

  getCurrentUserId() {
    let currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId) return true;
    else return false;
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/home" render={() => <Redirect to="/dashboard" />} />
          <Route
            path="/dashboard"
            exact
            render={() =>
              !this.getCurrentUserId() ? (
                <Redirect to="/SignIn" />
              ) : (
                <FacultyDashboard />
              )
            }
          />
          <Route
            path="/SignIn"
            exact
            render={() =>
              this.getCurrentUserId() ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignIn />
              )
            }
          />
          <Route path exact="/home">
            <Redirect to="/dashboard" />
          </Route>
          <Route
            path="*"
            render={() =>
              !this.getCurrentUserId() ? <Redirect to="/SignIn" /> : <NoMatch />
            }
          />
        </Switch>
      </>
    );
  }
}
function NoMatch() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <center>
        <h1>OOF</h1>
        <h3>
          {" "}
          You seem to be heading in the wrong <i>DISHA</i>!
        </h3>
        <h4>Let's get you back to the home page.</h4>
        <br />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="submit button"
          size="large"
        >
          <Link to="/SignIn">
            <div id="textColor">Shall we?</div>
          </Link>
        </Button>
      </center>
    </div>
  );
}
export default FacultyNavigation;
