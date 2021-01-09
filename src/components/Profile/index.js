import React, { Component, Fragment } from "react";
import Fab from "@material-ui/core/Fab";
import Post from "../Post";
import { Container, Col, Row } from "react-bootstrap";
import Link from "@material-ui/core/Link";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography, Divider, Grid, CircularProgress } from "@material-ui/core";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";
import UserCommunity from "./UserCommunity";
import UserPosts from "./UserPosts";
import { database } from "../../firebase/firebase.utils";
import { connect } from "react-redux"; 
import {getInitials} from '../../utils/Functions';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
    let currentUserId = localStorage.getItem("currentUserId");
    let userData = database.collection("users").doc(currentUserId);
    this.getUserData(userData);
  }

  getUserData(userData) {
    var a;
    a = userData
      .get()
      .then((doc) => {
        if (!doc.exists) {
          // console.log('No such document!');
        } else {
          this.setState({ info: doc.data() });
          //console.log('Document data:', doc.data());
        }
      })
      .catch((err) => {
        // console.log('Error getting document', err);
      });
  }


  // image={!!this.state.info.profileImagePath} imageSrc={this.state.profileImagePath}

  render() {
    return this.state.info ? (
      <Grid item xs={12}>
        <Container className="user-profile-container">
          <Row className="user-profile-header-row">
            <Grid container spacing={2}>
              <Grid item xs={12} md={1}>
                <ProfileImage
                  name={getInitials(this.state.info.firstName,this.state.info.lastName)}
                  scale={100}
                  variant="square" 
                  imageSrc={this.state.info.profileImagePath}  
                  image={!!((this.state.info.profileImagePath.length)>1)} 
                />
              </Grid>
              <Grid item xs={12} md={11} style={{ margin: "1px" }}>
                <Typography
                  variant="h2"
                  classes={{ root: "user-name-title-style" }}
                >
                  {this.state.info.firstName + " " + this.state.info.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Row>
          <Row>
            <Grid item xs={12}>
              <UserInfo userInfo={this.state.info} />
            </Grid>
          </Row>
          <Divider></Divider>
          <Row>
            <Col>
              <UserPosts
                currentUserRollNumber={this.state.info.rollNumber}
                userRollNumber={this.state.info.rollNumber}
                userLikedPosts={this.state.info.likedPosts}
              />
            </Col>
            <Col>
              <UserCommunity userInfo={this.state.info} />
            </Col>
          </Row>
        </Container>
        <Link href="/reauth" variant="body2">
          <Tooltip title="Edit Profile" aria-label="add">
            <Fab color="primary" aria-label="add" className="fab-icon">
              <EditIcon className="add-icon" />
            </Fab>
          </Tooltip>
        </Link>
      </Grid>
    ) : (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={80} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Profile);
