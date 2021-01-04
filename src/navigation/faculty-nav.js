import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "../components/Auth/SignIn/SignIn";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import SetAdmins from "../components/Admin/SetAdmins/SetAdmins";
import LandingPage from "../components/LandingPage";

class FacultyNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };

    console.log("Faculty Navigation");
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
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            this.getCurrentUserId() ? (
              <Redirect to="/admin-dashboard" />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/home"
          exact
          render={() =>
            this.getCurrentUserId() ? (
              <Redirect to="/admin-dashboard" />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/admin-dashboard"
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
          path="/set-admins"
          exact
          render={() =>
            !this.getCurrentUserId() ? <Redirect to="/SignIn" /> : <SetAdmins />
          }
        />
        <Route
          path="/SignIn"
          exact
          render={() =>
            this.getCurrentUserId() ? (
              <Redirect to="/admin-dashboard" />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="*"
          render={() =>
            !this.getCurrentUserId() ? <Redirect to="/SignIn" /> : <NoMatch />
          }
        />
        <Route
          path="*"
          render={() =>
            !this.getCurrentUserId() ? (
              <Redirect to="/admin-dashboard" />
            ) : (
              <NoMatch />
            )
          }
        />
      </Switch>
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

const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(FacultyNavigation);
