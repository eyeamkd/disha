import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout";
import {
  auth,
  database, 
  getUserDocument
} from "./firebase/firebase.utils";
import Navigation from "./navigation/index";
import { setUser } from "./redux/user/user-actions";
import { UserContext } from "./utils/Context/index"; 
import userRoles from "./utils/userRoles";

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
    localStorage.setItem("isAdmin", this.state.currentUser.isAdmin);
    this.setState({ admin: this.state.currentUser.isAdmin });
    this.props.setUser(this.state.currentUser.id); 
    this.setUserContext();
  } 

  getFacultyData(snapshot){   
    let data;
    snapshot.forEach(doc => {data= doc.data()});  
    return data;
  }

  setUserContext = async () => {  
    console.log("The Current User State is", this.state.currentUser); 
    if(!!this.state.currentUser){ 
      let domain = this.state.currentUser.email.split("@")[1].toLowerCase();
      const facultyCollection = database.collection("faculty");
      const query = facultyCollection.where(
        "email",
        "==",
        this.state.currentUser.email
      );
      if (domain === "disha.website") {
        this.setState({ userType: userRoles.admin });
      } else {
        let snapshot = await query.get();  
        // console.log("Snapshot is ",snapshot.data());
        if (snapshot.empty) this.setState({ userType: userRoles.general, admin:true });
        else this.setState({ userType: userRoles.faculty, facultyData:this.getFacultyData(snapshot) });
      }
    } else{ 
      this.setState({userType:userRoles.signedout});
    }
    
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => { 
      console.log("Auth state changed!!!");
      if (userAuth) {
        let snapShot = await getUserDocument(userAuth);
        if (snapShot) {
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
        } else {
          this.setState(
            {
              currentUser: {
                id: userAuth.uid,
                isAdmin: true
              },
            },
            () => {
              this.state.currentUser
                ? this.setUserId()
                : this.props.setUser(null);
            }
          );
        }
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
      <UserContext.Provider value={this.state}>
        <Layout
          currentUser={this.props.isNewUser ? null : currentUserId}
          changeCurrentUser
          userInfo={this.state.currentUser}
        >
          <Navigation userInfo={this.state.currentUser} />
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
