import React, { Component } from "react";
import { Typography, Divider } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";
import Post from "../Post";

export class UserPosts extends Component {
  render() {
    return (
      <Container class="user-activity-parent-div">
        <Typography variant="h6">Your Activity</Typography>
        <Row>
          <Post />
          <Divider />
          <Post />
          <Divider />
          <Post />
          <Divider />
        </Row>
      </Container>
    );
  }
}

export default UserPosts;
