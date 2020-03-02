import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage'; 
import Navigation from './Navigation/index';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("Reaching here")
      console.log(this.props.isNewUser)
        if(userAuth) {
          let userRef = await createUserProfileDocument(userAuth);
          if(this.props.isNewUser === false) {
            console.log("Auth ", userAuth)
            userRef.onSnapshot(snapShot => {
              this.setState({
                currentUser: {
                  id: snapShot.id,
                  ...snapShot.data()
                }
              })
    
              //console.log(this.state)
            })
          }
          else if(this.props.isNewUser === true){
            userRef = null;
            this.setState({ currentUser: null })
          }
        }
        else {
          this.setState({ currentUser: userAuth })
        }
      
      

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  changeCurrentUser() {
    this.setState({currentUser: null})
    console.log("this.state.currentUser")
  }

  render() {
    return (
      <Layout currentUser={this.props.isNewUser ? null : this.state.currentUser} changeCurrentUser>  
          <Navigation/>
      </Layout>
    )
  }
}   

const mapStateToProps = state => ({
  isNewUser: state.isNewUser.isNewUser
});


export default connect(mapStateToProps)(App);
