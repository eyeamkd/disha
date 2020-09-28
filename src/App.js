import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Navigation from "./navigation/index";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setUser } from "./redux/user/user-actions";
import AdminNavigation from "./navigation/admin-nav";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      admin: false,
    };
  }

  unsubscribeFromAuth = null;

  setUserId() {
    localStorage.setItem("currentUserId", this.state.currentUser.id);
    this.props.setUser(this.state.currentUser.id);
    let domain = this.state.currentUser.email.split("@")[1].toLowerCase();
    if (domain === "disha.website") {
      this.setState({ admin: true });
      return true;
    }
    this.setState({ admin: false });
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        let userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              this.state.currentUser
                ? this.setUserId()
                : this.props.setUser(null);
            }
          );
          //console.log(this.state)
        });
        // }
        // else if(this.props.isNewUser === true){
        // userRef = null;
        // this.setState({ currentUser: null }, () => {
        //   this.props.setUser(null)
        // })
        // }
      } else {
        this.setState({ currentUser: userAuth }, () => {
          this.props.setUser(null);
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  changeCurrentUser() {
    this.setState({ currentUser: null });
    this.props.setUser(null);
    localStorage.removeItem("currentUserId");
    // console.log(this.props.user)
  }

  render() {
    var currentUserId = localStorage.getItem("currentUserId");
    return !!this.state.currentUser ? (
      <Layout
        currentUser={this.props.isNewUser ? null : currentUserId}
        changeCurrentUser
        userInfo={this.state.currentUser}
      >
        {this.state.admin ? (
          <AdminNavigation />
        ) : (
          <Navigation userInfo={this.state.currentUser} />
        )}
      </Layout>
    ) : this.state.admin ? (
      <AdminNavigation />
    ) : (
      <Navigation userInfo={this.state.currentUser} />
    );
  }
}

const mapStateToProps = (state) => ({
  isNewUser: state.isNewUser.isNewUser,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
