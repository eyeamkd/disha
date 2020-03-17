import React, { Component } from "react";
import { Typography, Divider, CircularProgress } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";
import Post from "../Post";
import {database} from '../../firebase/firebase.utils';

import InfiniteScroll from "react-infinite-scroll-component";

import Box from '@material-ui/core/Box';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import postData from './postsdata.json';

let posts = [];


export class UserPosts extends Component {

  state = {
    items: postData.slice(0,5),
    hasMore: true,
    index: 5,
    filterClicked: null,
    filterValue: "None",
    allPosts: [],
      postsArrived: false
  };

  constructor(props) {
      super(props);
      this.getPosts(); 
  }

  getPosts=()=>{
      let postsData = database.collection('posts')
      let query = postsData.where('authorRollNumber', '==', this.props.userRollNumber).get()
      .then(snapshot => {
          if (snapshot.empty) {
              console.log('No matching documents.');
              return;
          }  
          snapshot.forEach(doc => {
              //console.log(doc.id, '=>', doc.data().title); 
              posts.push(doc.data())
          });
          posts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
          this.setState({postsArrived: true, allPosts: posts})
          posts = [];
          //console.log('dspaces', dspaces)
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
      
  }

  fetchMoreData = () => {
      if (postData.length === this.state.items.length) {
        this.setState({ hasMore: false });
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
      setTimeout(() => {
        this.setState({
          items: this.state.items.concat(postData.slice(this.state.index, this.state.index+5)),
          index: this.state.index + 5
        });
      }, 500);
  };

  handleClick = event => {
      this.setState({filterClicked: event.currentTarget});
  };

  handleClose = (value) => {
      this.setState({filterClicked: null, filterValue: value});
  };

  filterPosts = (post) => {
      console.log("puva", post)
      if(this.state.filterValue === "None") {
          return(<Post title={post.title} subtitle={post.category} description={post.description} author={post.author} date={post.timeStamp}/>)
      }
      else {
          if(post.category === this.state.filterValue) {
              return(<Post title={post.title} subtitle={post.category} description={post.description} author={post.author} date={post.timeStamp}/>)
          }
          else
              return (<div></div>)
      }
  }

  setPostsToNull = () => posts = [];

  render() {
      console.log(this.props.userRollNumber);
      if(this.state.postsArrived === false) {
          return(
              <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)'
                  }}
              >
                  <CircularProgress size={80}/>
              </div>
          )
      }
      else return(  
          <div>
              <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                  <Box p={1} >
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                          <SortIcon/>Filter
                      </Button>
                  </Box>
              </Box>
              <Menu
              id="simple-menu"
              anchorEl={this.state.filterClicked}
              keepMounted
              open={Boolean(this.state.filterClicked)}
              onClose={() => this.handleClose("None")}
              >
              <MenuItem onClick={() => this.handleClose("Events")}>Events</MenuItem>
              <MenuItem onClick={() => this.handleClose("Internship")}>Internship</MenuItem>
              <MenuItem onClick={() => this.handleClose("Project")}>Project</MenuItem>
              <MenuItem onClick={() => this.handleClose("None")}>None</MenuItem>
              </Menu>

              {
                  this.state.allPosts.map(post => {
                      return this.filterPosts(post)
                  })
              }
          </div>
          
          
          
      );
  }
}

export default UserPosts;
