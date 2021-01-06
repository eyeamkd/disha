import React from "react";
import { connect } from "react-redux";
import { UserContext } from "../utils/Context/index";
import AdminNavigation from "./AdminNavigation";
import FacultyNavigation from "./FacultyNavigation";
import GeneralUserNavigation from "./GeneralUserNavigation";
import userRoles from "../utils/userRoles";
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };

    console.log("Admin Navigation");
  }

  componentWillReceiveProps() {
    this.setState({ userInfo: this.props.userInfo });
  }

  getCurrentUserId() {
    let currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId) return true;
    else return false;
  }

  render() {
    return (
      <UserContext.Consumer>
        {(value) => {
          switch (value.userType) {
            case userRoles.admin:
              return <AdminNavigation />;
            case userRoles.general:
              return <GeneralUserNavigation />;
            case userRoles.faculty:
              return <FacultyNavigation />;
            default:
              return <GeneralUserNavigation/>;
          }
        }}
      </UserContext.Consumer>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Navigation);