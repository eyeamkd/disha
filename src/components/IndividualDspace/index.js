import { CircularProgress } from "@material-ui/core";
import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { database } from '../../firebase/firebase.utils';
import Dspace from '../Dspace';
import './styles.css';
import { UserContext } from "../../utils/Context";

export class IndividualDspace extends Component { 
  
    constructor(props) {
      super(props); 
      this.state = {
        info: null,
        dSpaceNotArrived: true,
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

  componentDidMount () {
    const { dspace } = this.props.match.params
    this.getDspaceData(dspace); 
  }
  
  render() { 
    if(this.state.dSpaceNotArrived) {
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
      if(this.state.dSpaceNotExists)
      return(<Redirect to="/404"/>)
      else return (
        <UserContext.Consumer>
          {(value) => (
            <Dspace currentUser={value.state.currentUser} dSpace={this.state.info} />
          )}
        </UserContext.Consumer>
      );
    }
  }
}

export default IndividualDspace;

