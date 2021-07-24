import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import Button from '@material-ui/core/Button';
import { Container, Typography, CircularProgress, Avatar } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap'; 
import {database} from '../../firebase/firebase.utils';
import firebase from 'firebase/app'
import UploadModal from '../UploadModal';
import DspaceProfileImage from './DspaceProfileImage'; 
import { Redirect } from "react-router";

let dSpace = {};
export class Dspace extends Component {
    
    state = {
        filterClicked: null,
        noPostsYet: false,
        filterValue: "None",
        userInfo: null,
        joined: false,
        userDataReceived: false,
        editModalOpen : false
      };

  constructor(props) {
    super(props);
    console.log("propssss", props);
    this.setState({joined: props.currentUser.dspaces.includes(this.props.dSpace.docId)})
  }

  componentDidMount() {
    dSpace = this.props.dSpace;
  }

  handleJoinClick = () => {
    debugger;
    let currentUserId = this.props.currentUser.id;
    this.setState({ joined: true });
    // console.log("dspace id", dSpace.id)
    let userDoc = {
      name:
        this.props.currentUser.firstName +
        " " +
        this.props.currentUser.lastName,
      rollNumber: this.props.currentUser.rollNumber,
    };
    database
      .collection("d-spaces")
      .doc(this.props.dSpace.docId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userDoc),
      });
    database
      .collection("users")
      .doc(currentUserId)
      .update({
        dspaces: firebase.firestore.FieldValue.arrayUnion(
          this.props.dSpace.docId
        ),
      });
  };

  handleJoinedClick = () => {
    let currentUserId = this.props.currentUser.id;
    // console.log('dSpace.members', dSpace.members)
    this.setState({ joined: false });
    let userDoc = {
      name:
        this.props.currentUser.firstName +
        " " +
        this.props.currentUser.lastName,
      rollNumber: this.props.currentUser.rollNumber,
    };
    database
      .collection("d-spaces")
      .doc(this.props.dSpace.docId)
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(userDoc),
      });
    database
      .collection("users")
      .doc(currentUserId)
      .update({
        dspaces: firebase.firestore.FieldValue.arrayRemove(
          this.props.dSpace.docId
        ),
      });
  };

  componentDidMount() {}
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/home" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col md={11}>
            <Typography variant="h1">{this.props.dSpace.title}</Typography>
          </Col>
          <Col md={1}>
            {!this.state.joined ? (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="submit"
                onClick={() => this.handleJoinClick()}
              >
                Join
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="submit"
                onClick={() => this.handleJoinedClick()}
              >
                Joined
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <DspaceHeader dSpace={this.props.dSpace} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dspace;
