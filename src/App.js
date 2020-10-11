import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout";
import { auth, createUserProfileDocument, database } from "./firebase/firebase.utils";
import Navigation from "./navigation/index";
import { setUser } from "./redux/user/user-actions";
import { UserContext } from "./utils/Context/index";


UserContext.displayName = "UserContext";
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

  setUserContext = async () => {
    let domain = this.state.currentUser.email.split("@")[1].toLowerCase();
    const facultyCollection = database.collection("faculty");
    const query = facultyCollection.where(
      "email",
      "==",
      this.state.currentUser.email
    );
    if (domain === "disha.website") {
      this.setState({ userType: "admin" });
    } else {
      let snapshot = await query.get();
      if (snapshot.empty) this.setState({ userType: "general" });
      else this.setState({ userType: "faculty" });
    }
  };

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

              this.setUserContext();
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
          this.setUserContext();
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
    return (
      <Layout
        currentUser={this.props.isNewUser ? null : currentUserId}
        changeCurrentUser
        userInfo={this.state.currentUser}
      >
        <UserContext.Provider value={this.state}>
          <Navigation userInfo={this.state.currentUser} />
        </UserContext.Provider>
      </Layout>
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
