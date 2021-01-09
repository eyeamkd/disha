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
export class GeneralUserNavigation extends Component { 
    getCurrentUserId() {
        let currentUserId = localStorage.getItem('currentUserId');
        if(currentUserId)
            return true;
        else   
            return false;
    } 
  render() {
    return (
      <>
       <Switch>
                <Route path="/" exact render={() => <LandingPage />} />
                <Route path="/home" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <HomePage />} />
                <Route path="/SignUp" exact render={() => this.getCurrentUserId() ? (<Redirect to="/home" />) : <SignUp />} />
                <Route path="/SignIn" exact render={() => this.getCurrentUserId() ? (<Redirect to="/home" />) : <SignIn />} />
                <Route path="/community" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <CommunityPage />} />
                <Route path="/account-requests" exact render={() => <ClaimAccountPage />} />
                <Route path="/search-d-spaces" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <SearchPage />} />
                <Route path="/profile" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <Profile />} />
                <Route path="/user-dspaces" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <UserDspaces />} />
                <Route path="/claim-account" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <ClaimAccountPage />} />
                <Route path="/confirm-account" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <ConfirmAccount />} />
                <Route path="/new-post" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <NewPost />} />
                <Route path="/data-updated" render={(props) => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <DataUpdated {...props} />} />
                <Route path="/new-dspace" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <NewDspaceForm />} />
                <Route path="/edit-profile" exact render={(props) => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <EditProfile {...props} />} />
                <Route path="/reauth" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn" />) : <Reauthentication />} />
                <Route path="/id=:id" exact component={!this.getCurrentUserId() ? SignIn : OtherUser} />
                <Route path="/post=:post" component={IndividualPost} />
                <Route path="/dspace=:dspace" component={IndividualDspace} />
                <Route path="*" render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) :<NoMatch/> }/>
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
export default GeneralUserNavigation;
