import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import HomePage from '../components/HomePage'; 
import ClaimAccountPage from '../components/ClaimAccountPage'; 
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
                <Route path="/claim-account-page" exact component={ClaimAccountPage}/>   
                <Route path="/d-space-search" exact component={SearchPage}/>   
                <Route path="/profile" exact component={Profile}/>   
                <Route path="/d-spaces" exact component={Dspaces}/>   
            </Switch>
        )
    }
}

export default Navigation
