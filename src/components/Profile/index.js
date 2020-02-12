import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { Typography, Divider, Grid } from "@material-ui/core";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";
import UserCommunity from "./UserCommunity";
import UserPosts from "./UserPosts";

export class Profile extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Container style={{maxWidth : '100%'}}>
          <Row className="user-profile-header-row">
            <ProfileImage name="KD" scale={200} variant="square"/>
            <UserInfo/>
          </Row>
          <Divider></Divider>
          <Row>
            <Col><UserPosts/></Col>
            <Col><UserCommunity/></Col>
          </Row>
        </Container>
      </Grid >
    );
  }
}

export default Profile;
