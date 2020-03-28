import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import { connect } from "react-redux";

import HomePage from '../components/HomePage'; 
import ClaimAccountPage, { ConfirmAccount } from '../components/ConfirmAccountPage'; 
import CommunityPage from '../components/Community';  
import SearchPage from '../components/SearchPage';
import Dspaces from '../components/Dspaces';
import Profile from '../components/Profile';
import SignUp from '../components/Auth/SignUp/SignUp';
import SignIn from '../components/Auth/SignIn/SignIn'; 
import NewPost from '../components/NewPost';
import PostSubmitted from '../components/NewPost/PostSubmitted';
import LandingPage from '../components/LandingPage';
import NewDspaceForm from '../components/Dspaces/NewDspaceForm';
import DspaceSubmitted from '../components/Dspaces/DspaceSubmitted';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import OtherUser from '../components/OtherUserProfile';
import IndividualPost from '../components/IndividualPost';


class Navigation extends React.Component {

    getCurrentUserId() {
        var currentUserId = localStorage.getItem('currentUserId');
        if(currentUserId)
            return true;
        else   
            return false;
    }
    render() {
        return (
            <Switch> 
                <Route path="/" exact render={() => <LandingPage/>}/>
                <Route path="/home" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <HomePage/>}/>
                <Route path="/SignUp" exact render={() => this.getCurrentUserId() ? (<Redirect to="/home"/>) : <SignUp/>}/>     
                <Route path="/SignIn" exact render={() => this.getCurrentUserId() ? (<Redirect to="/home"/>) : <SignIn/>}/>
                <Route path="/community" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <CommunityPage/>}/>   
                <Route path="/account-requests" exact render={() => <ClaimAccountPage/>}/>   
                <Route path="/search-d-spaces" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <SearchPage/>}/>   
                <Route path="/profile" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <Profile/>}/>   
                <Route path="/d-spaces" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <Dspaces/>}/>    
                <Route path="/claim-account" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <ClaimAccountPage/>}/>    
                <Route path="/confirm-account" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <ConfirmAccount/>}/>    
                <Route path="/new-post" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <NewPost/>}/>    
                <Route path="/post-submitted" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <PostSubmitted/>}/>    
                <Route path="/new-dspace" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <NewDspaceForm/>}/>    
                <Route path="/d-space-submitted" exact render={() => !this.getCurrentUserId() ? (<Redirect to="/SignIn"/>) : <DspaceSubmitted/>}/>   
                <Route path="/id=:id" exact component={ !this.getCurrentUserId() ? SignIn : OtherUser }/>
                <Route path="/post=:post" component={ IndividualPost } />
                <Route path="*"><NoMatch /></Route>
            </Switch>
        )
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
                <h3> Heading in the wrong <i>DISHA</i>, are we?</h3>
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

const mapStateToProps = state => ({
    user: state.user.user
});
export default connect(mapStateToProps)(Navigation);
