import React from 'react' ;  
import InfiniteScroll from "react-infinite-scroll-component";

import Post from '../Post';
import './style.css';

import { CircularProgress } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {database} from '../../firebase/firebase.utils';


import postData from './postsdata.json';

let posts = [];

export default class HomePage extends React.Component{

    state = {
        items: postData.slice(0,5),
        hasMore: true,
        index: 5,
        filterClicked: null,
        filterValue: "None",
        allPosts: [],
        postsArrived: false,
        userInfo: null
    };

    constructor(props) {
        super(props);
        this.getUserData();
        this.getPosts(); 
    }

    getUserData = () => {
        let currentUserId = localStorage.getItem('currentUserId')
        let userData = database.collection('users').doc(currentUserId);
        var a;
        a = userData.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              this.setState({ userInfo: doc.data() })
              //console.log('Document data:', doc.data());
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
        });
    }

    getPosts=()=>{
        let postsData = database.collection('posts')
        let query = postsData.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }  
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data().firstName);
                var a = doc.data()
                a.id = doc.id
                console.log('a', a)
                posts.push(a)
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
        if(this.state.filterValue === "None") {
            return(
                <Post 
                title={post.title} 
                subtitle={post.category} 
                description={post.description} 
                author={post.author} 
                date={post.timeStamp}
                rollNumber={post.authorRollNumber}
                likes={post.likes}
                id={post.id}
                postUrl={post.postUrl}
                userLikedPosts={this.state.userInfo.likedPosts}
                />
            )
        }
        else {
            if(post.category === this.state.filterValue) {
                return(
                    <Post 
                    title={post.title} 
                    subtitle={post.category} 
                    description={post.description} 
                    author={post.author} 
                    date={post.timeStamp}
                    rollNumber={post.authorRollNumber}
                    likes={post.likes}
                    id={post.id}
                    postUrl={post.postUrl}
                    userLikedPosts={this.state.userInfo.likedPosts}
                    />
                )
            }
            else
                return (<div></div>)
        }
    }

    setPostsToNull = () => posts = [];

    render() {
        console.log(this.state.filterValue);
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