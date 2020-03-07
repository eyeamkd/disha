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
          <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
          <Post title={"ReactJS Internship"} subtitle={"PROJECTS "}/>  
          <Post title={"Python Workshop soon!"} subtitle={"WORKSHOPS"}/>  
          <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
          <Post title={"IEEE hosts Inceptra"} subtitle={"EVENTS"}/>  
          <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
          <Post title={"ReactJS Internship"} subtitle={"PROJECTS "}/>  
          <Post title={"Python Workshop soon!"} subtitle={"WORKSHOPS"}/>  
          <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
          <Post title={"IEEE hosts Inceptra"} subtitle={"EVENTS"}/>
        </Row>
      </Container>
    );
  }
}

export default UserPosts;
