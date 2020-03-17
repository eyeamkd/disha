import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Typography, Divider, Grid, CircularProgress } from "@material-ui/core";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";
import UserCommunity from "./UserCommunity";
import UserPosts from "./UserPosts";

import { connect } from 'react-redux';

export class Profile extends Component {

  state = {
    info: null
  }

  getUserData(userData) {
    var a;
    a = userData.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({ info: doc.data() })
          //console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  initials() {
    return this.state.info.firstName[0].toUpperCase() + this.state.info.lastName[0].toUpperCase()
  }



  render() {
    const db = firebase.firestore();
    var currentUserId = localStorage.getItem('currentUserId')
    let userData = db.collection('users').doc(currentUserId);

    this.getUserData(userData);

    return (
      this.state.info ?
        <Grid item xs={12}>
          <Container style={{ maxWidth: '100%' }}>
            <Row className="user-profile-header-row">
              <Grid container spacing={2}>
                <Grid item xs={12} md={1}><ProfileImage name={this.initials()} scale={100} variant="square" /></Grid>
                <Grid item xs={12} md={11}>
                  <Typography variant="h2" className = "user-name-title-style">{this.state.info.firstName + " " + this.state.info.lastName}</Typography>
                </Grid>
              </Grid>
            </Row>
            <Row>
              <Grid item xs={12}><UserInfo userInfo={this.state.info} /></Grid>
            </Row>
            <Divider></Divider>
            <Row>
              <Col><UserPosts userRollNumber={this.state.info.rollNumber}/></Col>
              <Col><UserCommunity /></Col>
            </Row>
          </Container>
        </Grid>
        :
        <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}
        >
        <CircularProgress size={80}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Profile);

