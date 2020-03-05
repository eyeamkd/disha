import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { Typography, Divider, Grid } from "@material-ui/core";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";
import UserCommunity from "./UserCommunity";
import UserPosts from "./UserPosts";

import { connect } from 'react-redux';


export class Profile extends Component {
  render() {
    console.log("User from Redux:", this.props)
    return (
      <Grid item xs={12}>
        <Container style={{maxWidth : '100%'}}>
          <Row className="user-profile-header-row">
            <ProfileImage name="KE" scale={200} variant="square"/>
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

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Profile);

