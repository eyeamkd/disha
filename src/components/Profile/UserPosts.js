import React, { Component } from "react";
import { Typography, Divider, CircularProgress } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";
import Post from "../Post";
import {database} from '../../firebase/firebase.utils';


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
    noPostsYet: false,
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
            //   console.log('No matching documents.');
              this.setState({noPostsYet: true, postsArrived: true})
              return;
          }  
          snapshot.forEach(doc => {
              //console.log(doc.id, '=>', doc.data().title); 
                var a = doc.data()
                a.id = doc.id
                posts.push(a)
          });
          posts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
          this.setState({postsArrived: true, allPosts: posts})
          posts = [];
          //console.log('dspaces', dspaces)
      })
      .catch(err => {
        //   console.log('Error getting documents', err);
      });
      
  }

    removePost=(post) => {
        // console.log('post', post)
        // console.log("deleting")
        let arr = this.state.allPosts;
        let index = arr.indexOf(post)
        arr.splice(index, 1)
        this.setState({allPosts:arr});
        let deleteDoc = database.collection('posts').doc(post.id).delete();
    }

  

  handleClick = event => {
      this.setState({filterClicked: event.currentTarget});
  };

  handleClose = (value) => {
      this.setState({filterClicked: null, filterValue: value});
  };

  filterPosts = (post) => {
    // console.log(post.authorRollNumber === this.props.currentUserRollNumber)
      if(this.state.filterValue === "None") {
        return(
          <Post 
          post={post}
          userLiked={this.props.userLikedPosts.includes(post.id)}
          postedByUser={post.authorRollNumber === this.props.currentUserRollNumber}
          removePost={this.removePost}
          />
        )
      }
      else {
          if(post.category === this.state.filterValue) {
            return(
              <Post 
              post={post}
              userLiked={this.props.userLikedPosts.includes(post.id)}
              postedByUser={post.authorRollNumber === this.props.currentUserRollNumber}
              removePost={this.removePost}
              />
            )
          }
          else
              return (<div></div>)
      }
  }

  setPostsToNull = () => posts = [];

  render() {
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
      else {
          if(!this.state.noPostsYet) {
            return(  
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
        else {
            return <div>
            <br/>
            <div style={{
                position: 'absolute', left: '50%',
                transform: 'translate()'
                }}
            >
                <p>No posts yet!</p>
            </div>
            </div>
        }
    }
  }
}

export default UserPosts;
