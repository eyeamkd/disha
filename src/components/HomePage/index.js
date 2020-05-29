import React from 'react' ;  
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Post from '../Post';
import './style.css';

import { CircularProgress } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {database} from '../../firebase/firebase.utils';
import Link from '@material-ui/core/Link';


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
                let info = JSON.stringify(doc.data())
                localStorage.setItem('currentUserInfo', info)
                this.setState({ userInfo: doc.data() })

              //console.log('Document data:', doc.data());
            }
          })
          .catch(err => {
            // console.log('Error getting document', err);
        });
    }

    removePost=(post) => {
        console.log("deleting")
        let arr = this.state.allPosts;
        let index = arr.indexOf(post)
        arr.splice(index, 1)
        this.setState({allPosts:arr});
        let deleteDoc = database.collection('posts').doc(post.id).delete();
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
                post={post}
                userLiked={this.state.userInfo.likedPosts.includes(post.id)}
                postedByUser={this.state.userInfo.rollNumber == post.authorRollNumber}
                removePost={this.removePost}
                />
            )
        }
        else {
            if(post.category === this.state.filterValue) {
                return(
                    <Post 
                    post={post}
                    userLiked={this.state.userInfo.likedPosts.includes(post.id)}
                    postedByUser={this.state.userInfo.rollNumber == post.authorRollNumber}
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
                <Fab color="primary" aria-label="add" className="fab-icon">
                    <Link href="/new-post" variant="body2">
                        <AddIcon className="add-icon"/>
                    </Link>
                </Fab>
                {
                    this.state.allPosts.map(post => {
                        return this.filterPosts(post)
                    })
                }
                
            </div>
        );
    }
}