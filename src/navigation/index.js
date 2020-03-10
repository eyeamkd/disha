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
import LandingPage from '../components/LandingPage';





class Navigation extends React.Component {
    componentDidMount(){
        console.log("userrrr", this.props);   
    };

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
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});
  
export default connect(mapStateToProps)(Navigation);
