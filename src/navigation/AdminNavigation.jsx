import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import OverAllStats from "../components/Admin/OverAllStats";
import SetAdmins from "../components/Admin/SetAdmins/SetAdmins";
import SignIn from "../components/Auth/SignIn/SignIn";
import LandingPage from "../components/LandingPage";

export class AdminNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };

    console.log("In Admin Navigation");
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
          <Route path="/home" exact render={() => <LandingPage />} />
          <Route
            path="/dashboard"
            exact
            render={() =>
              !this.getCurrentUserId() ? (
                <Redirect to="/SignIn" />
              ) : (
                <AdminDashboard />
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
          <Route
            path="/set-admins" 
            exact
            render={() =>
              !this.getCurrentUserId() ? (
                <Redirect to="/SignIn" />
              ) : (
                <SetAdmins />
              )
            }
          />
          <Route
            path="/overall-stats" 
            exact
            render={() =>
              !this.getCurrentUserId() ? (
                <Redirect to="/SignIn" />
              ) : (
                <OverAllStats />
              )
            }
          /> 
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
export default AdminNavigation;
