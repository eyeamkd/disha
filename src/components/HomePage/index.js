import React from 'react';
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
import { database } from '../../firebase/firebase.utils';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import { POST_SCORES, POST_CATEGORIES, POST_SCORE_THRESHOLD } from '../../shared/constants'

import postData from './postsdata.json';

let posts = [];

export default class HomePage extends React.Component {

    state = {
        items: postData.slice(0, 5),
        hasMore: true,
        index: 5,
        filterClicked: null,
        filterValue: POST_CATEGORIES.NONE,
        allPosts: [],
        postsArrived: false,
        userDspaces: [],
        userDspacesArrived: false,
        userInfo: null,
        userInfoReceived: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUserData();
        this.getPosts();
        console.log(this.state.allPosts)
    }

    componentWillUnmount() {
        this.setState({allPosts: null});
        console.log(this.state.allPosts)
        posts = []
    }

    getUserData = () => {
        let currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
        if (currentUserInfo) {
            this.setState({ userInfo: currentUserInfo, userInfoReceived: true })
            this.getUserDspaces(currentUserInfo);
        }
        else {
            let currentUserId = localStorage.getItem('currentUserId')
            let userData = database.collection('users').doc(currentUserId);
            var a;
            a = userData.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        let data = doc.data()
                        if (data.password) data.password = "[hidden]"
                        let info = JSON.stringify(data)
                        localStorage.setItem('currentUserInfo', info)
                        this.setState({ userInfo: doc.data(), userInfoReceived: true })
                        this.getUserDspaces(doc.data());
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        }
    }

    getUserDspaces = (userInfo) => {
        let postsData = database.collection('d-spaces')
        let query = postsData.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                let a = [] 
                if(!!snapshot){ 
                    snapshot.forEach(doc => { 
                        if(!!userInfo.dspaces){ 
                            userInfo.dspaces.forEach((dspaceId) => {
                                if (dspaceId === doc.id) {
                                    a.push(doc.data().title)
                                }
                            })
                        }
                    });
                }
                // let dspaceInfo = snapshot.data()
                this.setState({ userDspaces: a, userDspacesArrived: true })
                console.log(this.state.userDspaces)
            })
    }

    removePost = (post) => {
        console.log("deleting")
        let arr = this.state.allPosts;
        let index = arr.indexOf(post)
        arr.splice(index, 1)
        this.setState({ allPosts: arr });
        let deleteDoc = database.collection('posts').doc(post.id).delete();
    }

    getPosts = () => {
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
                    a.score = 0
                    a.userLiked = this.state.userInfo.likedPosts.includes(doc.id)
                    posts.push(a)
                });
                posts = this.sortPosts(posts)
                this.setState({ postsArrived: true, allPosts: posts })
                posts = [];
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    sortPosts = (posts) => {
        let importantPosts = [];
        let unimportantPosts = [];
        posts.forEach((post) => {
            post = this.calculatePostScored(post)
            if (post.score > POST_SCORE_THRESHOLD) {
                importantPosts.push(post)
            }
            else {
                unimportantPosts.push(post)
            }
        })
        importantPosts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
        unimportantPosts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
        posts = importantPosts.concat(unimportantPosts);
        posts.forEach((post, index) => {
            post.score = 0
            posts[index] = post
        })
        console.log(posts)
        return posts
    }

    calculatePostScored = (post) => {
        if (post.isAdminPost) {
            post.score = post.score + POST_SCORES.ADMIN
        }
        if (post.category === POST_CATEGORIES.PROJECT || post.category === POST_CATEGORIES.INTERNSHIP) {
            post.score = post.score + POST_SCORES.INTERNSHIP_PROJECT
        }
        if (!post.userLiked) {
            post.score = post.score + POST_SCORES.NOT_LIKED
        }
        let authorRollNumber = post.authorRollNumber
        let userRollNumber = this.state.userInfo.rollNumber
        if (authorRollNumber.substring(0, 1) === userRollNumber.substring(0, 1)
            || authorRollNumber.substring(4, 6) === userRollNumber.substring(4, 6)) {
            post.score = post.score + POST_SCORES.YEAR_BRANCH
        }
        post.dSpaces.forEach(dspace => {
            if (this.state.userDspaces.includes(dspace)) {
                post.score = post.score + POST_SCORES.SUBSCRIBED_DSPACE
            }
        })
        return post
    }

    handleClick = event => {
        this.setState({ filterClicked: event.currentTarget });
    };

    handleClose = (value) => {
        this.setState({ filterClicked: null, filterValue: value });
    };


    filterPosts = (post) => {
        if (this.state.filterValue === POST_CATEGORIES.NONE) {
            return (
                <Post
                    post={post}
                    key={post.id}
                    userLiked={this.state.userInfo.likedPosts.includes(post.id)}
                    postedByUser={this.state.userInfo.rollNumber == post.authorRollNumber}
                    removePost={this.removePost}
                    inIndividualPost={false}
                />
            )
        }
        else {
            if (post.category === this.state.filterValue) {
                return (
                    <Post
                        post={post}
                        key={post.id}
                        userLiked={this.state.userInfo.likedPosts.includes(post.id)}
                        postedByUser={this.state.userInfo.rollNumber == post.authorRollNumber}
                        removePost={this.removePost}
                        inIndividualPost={false}
                    />
                )
            }
            else
                return (<div></div>)
        }
    }

    setPostsToNull = () => posts = [];

    render() {
        if (this.state.postsArrived === false || this.state.userDspacesArrived === false || !this.state.userInfo) {
            return (
                <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                >
                    <CircularProgress size={80} />
                </div>
            )
        }
        else return (
            <div>
                <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                    <Box p={1} >
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <SortIcon />Filter
                        </Button>
                    </Box>
                </Box>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.filterClicked}
                    keepMounted
                    open={Boolean(this.state.filterClicked)}
                    onClose={() => this.handleClose(POST_CATEGORIES.NONE)}
                >
                    {
                        Object.keys(POST_CATEGORIES).map(function (key) {
                            return (<MenuItem key={key} onClick={() => this.handleClose(POST_CATEGORIES[key])}>{POST_CATEGORIES[key]}</MenuItem>)
                        }, this)
                    }
                </Menu>
                <Link href="/new-post" variant="body2">
                    <Tooltip title="New Post" aria-label="add">
                        <Fab color="primary" aria-label="add" className="fab-icon">
                            <AddIcon className="add-icon" />
                        </Fab>
                    </Tooltip>
                </Link>
                {
                    this.state.allPosts.map(post => {
                        return this.filterPosts(post)
                    })
                }

            </div>
        );
    }
}