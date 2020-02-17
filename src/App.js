import React, { Component } from 'react';
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
      console.log(this.props.isNewUser)
      if(this.props.isNewUser) {
        if(userAuth) {
          console.log("Auth ", userAuth)
          const userRef = await createUserProfileDocument(userAuth);
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
        else {
          this.setState({ currentUser: userAuth })
        }
      }
      
      createUserProfileDocument(userAuth);  

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
      <Layout currentUser={this.state.currentUser} changeCurrentUser>  
          <Navigation/>
      </Layout>
    )
  }
}   

const mapStateToProps = state => ({
  isNewUser: state.isNewUser.isNewUser
});


export default connect(mapStateToProps)(App);
