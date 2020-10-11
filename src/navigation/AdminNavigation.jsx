import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "../components/Auth/SignIn/SignIn";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import LandingPage from "../components/LandingPage";
import { UserContext } from "../utils/Context/index";

import HomePage from "../components/HomePage";
import ClaimAccountPage, {
  ConfirmAccount,
} from "../components/ConfirmAccountPage";
import CommunityPage from "../components/Community";
import SearchPage from "../components/SearchPage";
import Profile from "../components/Profile";
import SignUp from "../components/Auth/SignUp/SignUp";
import NewPost from "../components/NewPost";
import DataUpdated from "../shared/DataUpdated";
import NewDspaceForm from "../components/Dspace/NewDspaceForm";
import OtherUser from "../components/OtherUserProfile";
import IndividualPost from "../components/IndividualPost";
import UserDspaces from "../components/UserDspaces";
import EditProfile from "../components/EditProfile";
import Reauthentication from "../components/Reauthentication";
import IndividualDspace from "../components/IndividualDspace";
export class AdminNavigation extends Component {
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
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
            <center>
                <h1>OOF</h1>
                <h3> You seem to be heading in the wrong <i>DISHA</i>!</h3>
                <h4>Let's get you back to the home page.</h4>
                <br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="submit button"
                    size="large"
                >
                    <Link to="/SignIn"><div id="textColor">Shall we?</div></Link>
                </Button>
            </center>
        </div>
    );
  }
export default AdminNavigation;
