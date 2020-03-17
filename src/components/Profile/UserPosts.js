import React, { Component } from "react";
import { Typography, Divider, CircularProgress } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";
import Post from "../Post";

import InfiniteScroll from "react-infinite-scroll-component";

import postData from './postsdata.json';


export class UserPosts extends Component {

  state = {
    items: postData.slice(0,2),
    hasMore: true,
    index: 2,
  };

  fetchMoreData = () => {
      if (postData.length === this.state.items.length) {
        this.setState({ hasMore: false });
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
      setTimeout(() => {
        this.setState({
          items: this.state.items.concat(postData.slice(this.state.index, this.state.index+2)),
          index: this.state.index + 2
        });
      }, 500);
  };

  render() {
    return (
      <Container class="user-activity-parent-div">
        <Typography variant="h6">Your Activity</Typography>
        <Row>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<div style={{
              position: 'absolute', left: '50%',
              transform: 'translate(-50%, -50%)'
          }}
          >
          <CircularProgress size={20}/>
          </div>}
          endMessage={
              <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
              </p>
          }
        >
        <div style={{}} className="main-div"> 
            {this.state.items.map(element => {
                return(<Post title={element.title} subtitle={element.subtitle} description={element.description}/>)
            })}
        </div>
        </InfiniteScroll>
        </Row>
      </Container>
    );
  }
}

export default UserPosts;
