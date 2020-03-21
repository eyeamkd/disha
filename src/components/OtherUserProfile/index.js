import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom'; 

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Typography, Divider, Grid, CircularProgress } from "@material-ui/core";
import UserInfo from "./../Profile/UserInfo";
import UserPosts from "./../Profile/UserPosts";
import ProfileImage from "./../Profile/ProfileImage";
import {database} from '../../firebase/firebase.utils';


export class OtherUser extends Component {

  state = {
    info: null,
    currentUserInfo: null,
    userNotExists: false
  }

  getUserData(usersData, id) {
    let query = usersData.where('rollNumber', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        this.setState({ userNotExists: true })
      }  
  
      snapshot.forEach(doc => {
        this.setState({ info: doc.data() })
        });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  getCurrentUserData = () => {
    let currentUserId = localStorage.getItem('currentUserId')
    let query = database.collection('users').doc(currentUserId).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({ currentUserInfo: doc.data() })
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

  constructor(props) {
    super(props);
    this.getCurrentUserData();
  }
  componentDidMount () {
    const { id } = this.props.match.params
    
    let usersData = database.collection('users');

    this.getUserData(usersData, id);
    
  }


  
  render() {
    if(this.state.userNotExists)
        return(<Redirect to="/home"/>)
    else return (
      this.state.info && this.state.currentUserInfo ?
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
              <Col><UserPosts userRollNumber={this.state.info.rollNumber} userLikedPosts={this.state.currentUserInfo.likedPosts}/></Col>
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

export default OtherUser;

