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

const updateUsersArray = (searchValue, filterValues) => {
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

const filterUsers = (searchValue, filterValues) => {
  let currentUserInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
  if (!filterValues.length) {
    if (SearchUsers) return SearchUsers;
    else return CompleteUsersArray;
  } else {
    if (searchValue)
      return SearchUsers.filter((user) => {
        return checkUserValid(user, currentUserInfo, filterValues);
      });
    else
      return CompleteUsersArray.filter((user) => {
        return checkUserValid(user, currentUserInfo, filterValues);
      });
  }
};

const checkUserValid = (user, currentUserInfo, filterValues) => {
  let isSameBatch = false;
  let isSameDepartment = false;
  let isSameClass = false;
  filterValues.forEach((value) => {
    switch (value) {
      case FILTER_TYPES.BATCH:
        isSameBatch = isUserFromSameBatch(user, currentUserInfo);
        break;
      case FILTER_TYPES.DEPARTMENT:
        isSameDepartment = isUserFromSameDepartment(user, currentUserInfo);
        break;
      case FILTER_TYPES.SECTION:
        isSameClass = isUserFromSameClass(user, currentUserInfo);
        break;
    }
  });
  return isSameBatch || isSameDepartment || isSameClass;
};

const isUserFromSameBatch = (user, currentUserInfo) => {
  return currentUserInfo.year === user.year;
};
const isUserFromSameDepartment = (user, currentUserInfo) => {
  return currentUserInfo.department === user.department;
};
const isUserFromSameClass = (user, currentUserInfo) => {
  return (
    currentUserInfo.year === user.year &&
    currentUserInfo.department === user.department &&
    currentUserInfo.section === user.section
  );
};

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

  updateUsers(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      Users = updateUsersArray(this.props.searchValue, this.props.filterValues);
      SearchUsers = Users;
      if (Users.length === 0) {
        this.noUsersFound();
      } else {
        this.UserFound();
      }
    }
    if (prevProps.filterValues !== this.props.filterValues) {
      Users = filterUsers(this.props.searchValue, this.props.filterValues);
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
    SearchUsers = Users;
    CompleteUsersArray = Users;
    FilteredUsers = Users;
    this.setState({ usersLoaded: true });
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
                  <Link to={linkPath}>
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
