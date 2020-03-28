import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage'; 
import Navigation from './navigation/index';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setUser } from './redux/user/user-actions';


export class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  setUserId() {
    localStorage.setItem('currentUserId', this.state.currentUser.id)
    this.props.setUser(this.state.currentUser.id)

  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("Current user:", this.state.currentUser)
        if(userAuth) {
          let userRef = await createUserProfileDocument(userAuth);
          // if(this.props.isNewUser === false) {
            console.log("Auth ", userAuth)
            userRef.onSnapshot(snapShot => {
              this.setState({
                currentUser: {
                  id: snapShot.id,
                  ...snapShot.data()
                }
              }, () => {
                this.state.currentUser ? 
                this.setUserId()
                :
                this.props.setUser(null)
              })
              //console.log(this.state)
            })
          // }
          // else if(this.props.isNewUser === true){
            // userRef = null;
            // this.setState({ currentUser: null }, () => {
            //   this.props.setUser(null)
            // })
          // }
        }
        else {
          this.setState({ currentUser: userAuth }, () => {
            this.props.setUser(null)
          })
        }
      
      

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  changeCurrentUser() {
    this.setState({currentUser: null})
    this.props.setUser(null)
    localStorage.removeItem('currentUserId')
    console.log(this.props.user)
  }


  render() {
    var currentUserId = localStorage.getItem('currentUserId')

    return (
      <Layout currentUser={this.props.isNewUser ? null : currentUserId} changeCurrentUser>  
          <Navigation/>
      </Layout>
    )
  }
}   

const mapStateToProps = state => ({
  isNewUser: state.isNewUser.isNewUser,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
