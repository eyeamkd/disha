import React, { Component, Fragment } from "react";
import DspaceCard from "../SearchPage/DspaceCard";
import { Container, CircularProgress, Typography } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import "../SearchPage/styles.css";
import { database } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { FILTER_TYPES } from "../../shared/constants";
const usersReference = database.collection("users");

let Users = [];

let SearchUsers = [];

let FilteredUsers = [];

let CompleteUsersArray = [];

export class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isUserPresent: true,
      display: [],
      render: false,
      usersLoaded: false,
    };
  }

  componentWillMount() {
    this.storeUsers();
  }

  componentWillUnmount() {
    Users = [];
    SearchUsers = [];
  }

  componentDidUpdate(prevProps) {
    this.updateUsers(prevProps);
  }

  updateUsersArray = (searchValue, filterValues) => {
    if (!searchValue) {
      if (FilteredUsers) return FilteredUsers;
      else return CompleteUsersArray;
    } else {
      if (filterValues.length)
        return FilteredUsers.filter((user) => {
          let userFullName = user.firstName + user.lastName;
          console.log(user);
          return userFullName.toLowerCase().includes(searchValue.toLowerCase());
        });
      else
        return CompleteUsersArray.filter((user) => {
          let userFullName = user.firstName + user.lastName;

          console.log(user);
          return userFullName.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
  };

  filterUsers = (searchValue, filterValues) => {
    if (!filterValues.length) {
      if (SearchUsers) return SearchUsers;
      else return CompleteUsersArray;
    } else {
      if (searchValue)
        return SearchUsers.filter((user) => {
          return this.checkUserValid(user, filterValues);
        });
      else
        return CompleteUsersArray.filter((user) => {
          return this.checkUserValid(user, filterValues);
        });
    }
  };

  checkUserValid = (user, filterValues) => {
    let isSameBatch = false;
    let isSameDepartment = false;
    let isSameClass = false;
    filterValues.forEach((value) => {
      switch (value) {
        case FILTER_TYPES.BATCH:
          isSameBatch = this.isUserFromSameBatch(user, this.props.currentUser);
          break;
        case FILTER_TYPES.DEPARTMENT:
          isSameDepartment = this.isUserFromSameDepartment(
            user,
            this.props.currentUser
          );
          break;
        case FILTER_TYPES.SECTION:
          isSameClass = this.isUserFromSameClass(user, this.props.currentUser);
          break;
      }
    });
    return isSameBatch || isSameDepartment || isSameClass;
  };

  isUserFromSameBatch = (user) => {
    return this.props.currentUser.year === user.year;
  };
  isUserFromSameDepartment = (user) => {
    return this.props.currentUser.department === user.department;
  };
  isUserFromSameClass = (user) => {
    return (
      this.props.currentUser.year === user.year &&
      this.props.currentUser.department === user.department &&
      this.props.currentUser.section === user.section
    );
  };

  updateUsers(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      Users = this.updateUsersArray(
        this.props.searchValue,
        this.props.filterValues
      );
      SearchUsers = Users;
      if (Users.length === 0) {
        this.noUsersFound();
      } else {
        this.UserFound();
      }
    }
    if (prevProps.filterValues !== this.props.filterValues) {
      Users = this.filterUsers(this.props.searchValue, this.props.filterValues);
      FilteredUsers = Users;
      if (Users.length === 0) {
        this.noUsersFound();
      } else {
        this.UserFound();
      }
    }
    if (this.props.searchValue === "" && this.props.filterValues.length < 1) {
      Users = CompleteUsersArray;
    }
  }

  noUsersFound() {
    this.setState({
      isUserPresent: false,
    });
  }

  UserFound() {
    this.setState({
      isUserPresent: true,
    });
  }

  async storeUsers() {
    await usersReference
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach((doc) => {
          //console.log(doc.id, '=>', doc.data().title);
          let userData = doc.data();
          userData.id = doc.id;
          Users.push(userData);
        });
        //console.log('dspaces', dspaces)
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    this.countByDept(Users);
    SearchUsers = Users;
    CompleteUsersArray = Users;
    FilteredUsers = Users;
    this.setState({ usersLoaded: true });
  }

  countByDept(users) {
    let count = {};
    count["CSE"] = users.filter((obj) => obj.department === "CSE").length;
    count["IT"] = users.filter((obj) => obj.department === "IT").length;
    count["ECE"] = users.filter((obj) => obj.department === "ECE").length;
    count["Civil"] = users.filter((obj) => obj.department === "Civil").length;
    count["Mech"] = users.filter((obj) => obj.department === "Mech").length;
    count["EEE"] = users.filter((obj) => obj.department === "EEE").length;
    console.log(count);
  }

  render() {
    if (!this.state.usersLoaded) {
      return (
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <CircularProgress color="secondary" />
            </Col>
          </Row>
        </Container>
      );
    } else {
      // console.log(this.props);
      return (
        <Container>
          <Row className="d-space-cards-display-row">
            {this.state.isUserPresent ? (
              Users.map((User) => {
                let linkPath = `/id=${User.rollNumber}`;
                return (
                  <Link to={linkPath} key={User.rollNumber}>
                    <UserCard
                      className="d-space-card"
                      title={User.firstName + " " + User.lastName}
                      // description = { dSpace.description }
                      key={User.firstName}
                    />
                  </Link>
                );
              })
            ) : (
              <Fragment>
                <center>
                  <Typography variant="h4">Oof,User not found!</Typography>
                </center>
                <br />
                <center>
                  <Typography variant="h6">
                    if you have your friends contact, ask him to register on
                    DISHA
                  </Typography>
                </center>
              </Fragment>
            )}
          </Row>
        </Container>
      );
    }
  }
}

export default UserCards;
