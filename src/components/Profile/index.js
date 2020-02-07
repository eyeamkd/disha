import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { Typography, Divider, Grid } from "@material-ui/core";
import ProfileImage from "./ProfileImage";

export class Profile extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Container style={{margin:'0px'}}>
          <Row>
            <Col><ProfileImage/></Col>
            <Col>Profile Information</Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col>Your Posts</Col>
            <Col>Your Community</Col>
          </Row>
        </Container>
      </Grid >
    );
  }
}

export default Profile;
