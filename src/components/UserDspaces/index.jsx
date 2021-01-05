import React, { Component } from "react";
import { database } from "./../../firebase/firebase.utils";
import { Container, Col, Row } from "reactstrap";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import { Group } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app'
import "./style.css";


const userId = localStorage.getItem("currentUserId");

export class UserDspaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      dSpaces: [],
      dSpaceIds: [],
    };
  }
  async loadUserData() {
    let userRefDoc = database.collection("users").doc(userId);
    let userDoc = await userRefDoc.get().then((doc) => {
      if (!doc.exists) {
        // console.log("Invalid User Document");
      } else {
        // console.log("Ids", doc.data().dspaces);
        let a = doc.data();
        a.docId = doc.id;
        this.loadUserDspaces(doc.data().dspaces);
        this.setState({
          userInfo: a,
          dSpaceIds: doc.data().dspaces,
        });

      }
    });
  }

  handleJoinedClick = (id) => {
    let userDoc = {
      name: this.state.userInfo.firstName
        + " " +
        this.state.userInfo.lastName,
      rollNumber: this.state.userInfo.rollNumber
    }
    database.collection('d-spaces').doc(id).update({
      members: firebase.firestore.FieldValue.arrayRemove(userDoc)
    });
    database.collection('users').doc(this.state.userInfo.docId).update({
      dspaces: firebase.firestore.FieldValue.arrayRemove(id)
    });
    this.removeFromDspaceList(id)
  }

  removeFromDspaceList = (id) => {
    this.state.dSpaces.forEach((dSpace, index) => {
      if(id === dSpace.docId) {
        this.state.dSpaces.splice(index, 1);
        this.setState({dSpaces: this.state.dSpaces})
      }
    })
  }

  loadUserDspaces = (ids) => {
    ids.map((id) => {
      let dspaceDocRef = database.collection("d-spaces").doc(id);
      dspaceDocRef.get().then((doc) => {
        if (!doc.exists) {
          // console.log("NO Dspace found with that ID");
        } else {
          let a = doc.data();
          a.docId = doc.id;
          this.setState({
            dSpaces: [...this.state.dSpaces, a],
          });
        }
      });
    });
  };
  componentDidMount() {
    this.loadUserData();
  }
  render() {
    // console.log(this.state);
    if (this.state.dSpaces.length === 0) {
      return (
        <Container>
          <Typography variant="h1"> Your D-Spaces </Typography>{" "}
          <Row
            style={{
              margin: "50px",
            }}
          >
            <Col
              sm="12"
              md={{
                size: 6,
                offset: 3,
              }}
            >
              <CircularProgress />
            </Col>{" "}
          </Row>{" "}
        </Container>
      );
    } else {
      return (
        <Container>
          <Typography variant="h1"> Your D-Spaces </Typography>{" "}
          <Row>
            <Col className="user-dspaces">
              <List>
                {" "}
                {this.state.dSpaces.map((dSpace) => (
                  <div>
                    <Row>
                      <Col md={10}>
                        <Link to={{
                          pathname: `/dspace=${dSpace.id}`
                        }}>
                          <ListItem>
                            <ListItemIcon>
                              <Group color="primary" />
                            </ListItemIcon>{" "}
                            <ListItemText primary={dSpace.title} />{" "}
                          </ListItem>
                        </Link>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          className="submit"
                          onClick={() => this.handleJoinedClick(dSpace.docId)}
                        >
                          Leave
                      </Button>
                      </Col>
                      {" "}
                    </Row>
                    <Divider />
                  </div>
                ))}{" "}
              </List>{" "}
            </Col>{" "}
          </Row>{" "}
        </Container>
      );
    }
  }
}

export default UserDspaces;
