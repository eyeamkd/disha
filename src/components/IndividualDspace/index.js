import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom'; 

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Typography, Divider, Grid, CircularProgress, Card } from "@material-ui/core";
import Post from '../Post';
import {database} from '../../firebase/firebase.utils';
import CommentsComponent from "../CommentsComponent"; 
import './styles.css';
import Dspace from '../Dspace';


export class IndividualDspace extends Component { 
  
    constructor(props) {
      super(props); 
      this.state = {
        info: null,
        infoNotArrived: true,
        dSpaceNotArrived: true,
        currentUserInfo: null,
        dSpaceNotExists: false,
        userLoggedIn: true
      }
    }
  getDspaceData(id) { 
    let dSpaceData = database.collection('d-spaces');
    let query = dSpaceData.where('id', '==', id).get()
    .then(snapshot => { 
      console.log("Snapshots", snapshot);
      if (snapshot.empty) {
        // console.log('No matching documents.');
        this.setState({ dSpaceNotExists: true, dSpaceNotArrived: false })
      }  
      snapshot.forEach((doc) => {  
        console.log("Doc is ",doc);
          var a = doc.data() 
          console.log("Doc Data is", a);
          a.docId = doc.id
          this.setState({ info: a, dSpaceNotArrived: false })
        });
    })
    .catch(err => {
      // console.log('Error getting documents', err);
    });
  }

  getCurrentUserInfo = () => { 
    let currentUserId = localStorage.getItem('currentUserId'); 
    if(currentUserId) {
      let query = database.collection('users').doc(currentUserId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            this.setState({ infoNotArrived: false })
          } else {
            this.setState({ currentUserInfo: doc.data(), infoNotArrived: false })
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
    else {
      this.setState({ currentUserInfo: null })
    } 
  }


  componentDidMount () {
    const { dspace } = this.props.match.params
    this.getDspaceData(dspace); 
    this.getCurrentUserInfo(); 
  }


  
  render() { 
    if(this.state.infoNotArrived || this.state.dSpaceNotArrived) {
      return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
            <CircularProgress size={80} />
        </div>
      )
    }
    else {
      console.log("STATE", this.state);
      if(!this.state.currentUserInfo)
      return(<Redirect to="/home"/>)
      if(this.state.dSpaceNotExists)
      return(<Redirect to="/404"/>)
      else return (
        <Dspace dSpace={this.state.info} />
      );
    }
  }
}

export default IndividualDspace;

