import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom'; 

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Typography, Divider, Grid, CircularProgress } from "@material-ui/core";
import Post from '../Post';
import {database} from '../../firebase/firebase.utils';


export class IndividualPost extends Component {

  state = {
    info: null,
    currentUserInfo: null,
    postNotExists: false
  }

  getPostData(postsData, id) {
    let query = postsData.where('postUrl', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        this.setState({ postNotExists: true })
      }  
  
      snapshot.forEach(doc => {
          var a = doc.data()
          a.id = doc.id
          this.setState({ info: a })
        });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  getCurrentUserData = () => {
    let currentUserId = localStorage.getItem('currentUserId')
    if(currentUserId) {
      let query = database.collection('users').doc(currentUserId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.setState({ currentUserInfo: doc.data() })
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
    else {
      this.setState({ currentUserInfo: {likedPosts : []} })
    }
        
  }


  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { post } = this.props.match.params
    let postsData = database.collection('posts');
    this.getPostData(postsData, post); 
    this.getCurrentUserData();
  }


  
  render() {
    // return(<h1>Hello</h1>)
    if(this.state.postNotExists)
        return(<Redirect to="/home"/>)
    else return (
      this.state.info && this.state.currentUserInfo ? 
        <Post 
          post={this.state.info}
          userLiked={this.state.currentUserInfo.likedPosts.includes(this.state.info.id)}
          postedByUser={this.state.currentUserInfo.rollNumber == this.state.info.authorRollNumber}
          removePost={this.removePost}
        />
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

export default IndividualPost;

