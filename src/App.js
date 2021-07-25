import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout";
import { auth, database, getUserDocument } from "./firebase/firebase.utils";
import Navigation from "./navigation/index";
import { setUser } from "./redux/user/user-actions";
import { getUserContext, UserContext } from "./utils/Context/index";
import userRoles from "./utils/userRoles";
import { isAdmin } from "./utils/Functions";
import firebase from "firebase";

UserContext.displayName = "UserContext";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: localStorage.getItem("currentUserId"),
      currentUser: JSON.parse(localStorage.getItem("currentUserInfo") || null),
      admin: false,
    };
  }

  mounted = false;

  unsubscribeFromAuth = null;

  setUserId() {
    this.props.setUser(this.state.currentUser.id);
    this.setUserContext();
  }

  getFacultyData(snapshot) {
    let data;
    console.log("Snapshot is ", snapshot);
    if (Array.isArray(snapshot))
      snapshot.forEach((doc) => {
        data = doc.data();
      });
    return data;
  }

  setUserContext =  async () => {
    if (this.state.currentUserId) {
      const userObject = await getUserContext(this.state.currentUserId);
      this.setState({
        currentUser: userObject.data,
        userType: userObject.role,
      });
    } else {
      this.setState({ currentUser: null, userType: userRoles.signedout });
    }
  };

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("Auth state changed!!!");
      if (!!userAuth) {
        let data = await getUserDocument(userAuth.uid);
        if (this.state.currentUser === null) {
          if (!!data) {
            this.setState(
              {
                currentUser: data,
              },
              () => {
                this.state.currentUser
                  ? this.setUserId()
                  : this.props.setUser(null);
              }
            );
          } else {
            this.setState(
              {
                currentUser: data,
              },
              () => {
                this.state.currentUser
                  ? this.setUserId()
                  : this.props.setUser(null);
              }
            );
          }
        } else if (this.props.isNewUser === true) {
          // let userRef = null;
          this.setState({ currentUser: null }, () => {
            this.props.setUser(null);
          });
        }
      } else {
        this.setState({ currentUser: null }, () => {
          this.props.setUser(null);
          this.setUserContext();
          // localStorage.setItem("currentUserId", "");
          // localStorage.setItem("currentUserInfo", "");
        });
      }
    });
    this.mounted = true;
    if (this.mounted) this.setUserContext();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribeFromAuth();
  }

  changeCurrentUser() {
    this.setState({ currentUser: null });
    this.props.setUser(null);
    // console.log(this.props.user)
  }

  updateUser = (userDoc, role = null) => {
    console.log("faculty user doc", userDoc);
    if (userDoc) { 
      // Commented because there's no ID property on the user info document
     // localStorage.setItem("currentUserId", JSON.stringify(userDoc?.id));
      localStorage.setItem("currentUserInfo", JSON.stringify(userDoc));
      if (role != null) this.setState({ currentUser: userDoc, userType: role });
      else this.setState({ currentUser: userDoc });
    }
  };

  render() {
    // this.getUsers();
    return (
      <UserContext.Provider
        value={{ state: this.state, updateUser: this.updateUser }}
      >
        <Layout
          currentUser={this.props.isNewUser ? null : this.state.currentUser?.id}
          changeCurrentUser
          userInfo={this.state.currentUser}
        >
          <Navigation
            userInfo={(this.state.currentUser, this.state.userType)}
          />
        </Layout>
      </UserContext.Provider>
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
