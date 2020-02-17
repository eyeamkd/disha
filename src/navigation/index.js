import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import HomePage from '../components/HomePage'; 
import ClaimAccountPage, { ConfirmAccount } from '../components/ConfirmAccountPage'; 
import CommunityPage from '../components/Community';  
import SearchPage from '../components/SearchPage';
import Dspaces from '../components/Dspaces';
import Profile from '../components/Profile';



export class Navigation extends React.Component {
    render() {
        return (
            <Switch> 
                <Route path="/" exact component={HomePage}/>     
                <Route path="/community" exact component={CommunityPage}/>   
                <Route path="/account-requests" exact component={ConfirmAccount}/>   
                <Route path="/d-space-search" exact component={SearchPage}/>   
                <Route path="/profile" exact component={Profile}/>   
                <Route path="/d-spaces" exact component={Dspaces}/>    
                <Route path="/claim-account" exact component={ClaimAccountPage}/>    
                <Route path="/confirm-account" exact component={ConfirmAccount}/>   
            </Switch>
        )
    }
}

export default Navigation
