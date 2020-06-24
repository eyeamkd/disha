import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
    Typography,
    FormControl,
    TextField,
    MenuItem,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    FormLabel,
    Button,
    CircularProgress
} from "@material-ui/core";
import { Row } from "react-bootstrap";
import { database } from '../../firebase/firebase.utils';
import "./style.css";
import { Redirect } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const postCategories = ["Internship", "Project", "Events"];
let dspaces = [];



export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            password: null,
            confirmPassword: null,
            postTitle: '',
            isPostTitleInValid: false,
            postDescription: '',
            isPostDescriptionInValid: false,
            postCategory: '',
            onDataSubmitting: false,
            isSelectedCategoryInValid: false,
            dataSubmittedSuccessfully: false,
            dataSubmittingError: '',
            dSpaces: [],
            dspaceListArrived: false,
            userDetails: null,
            userDataReceived: false,
            postsUpdated: false,
            theme: 'snow'
        }
        this.handleChange = this.handleChange.bind(this)
        //     this.getDspaces();
        this.getUserDetails();
    }


    componentDidMount() {
        // console.log("CDM fired");
        this.getDspaces();
        this.getUserDetails();
    }

    componentWillUnmount() {
        dspaces = [];
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
            this.setState({postsUpdated: true, allPosts: posts})
            posts = [];
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }


    handleTextChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state)
    }

    handleFirstNameChange = (event) => {
        this.setState({firstName: event.target.value})
    }
    handleLastNameChange = (event) => {
        this.setState({lastName: event.target.value})
    }

    isNameChanged = () => {
        if(this.state.firstName === this.state.currentUserInfo.firstName && this.state.lastName === this.state.currentUserInfo.lastName) {
            return false
        }
        else return true
    }

    updatePostData =() => {
        
    }


    handleSubmit = () => {
        if (this.isNameChanged()) {
            this.setState({postsUpdated: false})
            this.updatePostData();
            this.setState({
                onDataSubmitting: true
            })
        }
    }

    getUserDetails = () => {
        let currentUserInfo = localStorage.getItem('currentUserInfo');
        let userData = JSON.parse(currentUserInfo);
        this.setState({ userDetails: doc.data(), userDataReceived: true })
    }

    postData = () => {
        const postUrl = this.addPostUrl()
        const name = this.state.userDetails.firstName + " " + this.state.userDetails.lastName
        // console.log('name', this.state.userDetails.rollNumber)
        // console.log('rollNumber', rollNumber)
        const newPostData = {
            title: this.state.postTitle,
            description: this.state.postDescription,
            category: this.state.postCategory,
            dSpaces: this.state.dSpaces,
            timeStamp: this.getCurrentDate(),
            author: name,
            postUrl: postUrl,
            authorRollNumber: this.state.userDetails.rollNumber,
            likes: 0

        }
        database.collection('posts').add(newPostData)
            .then((docRef) => { this.setState({ dataSubmittedSuccessfully: true }) })
            .catch(err => {
                this.setState({
                    dataSubmittingError: 'Oof! there was an error! Please try posting after some time',
                    onDataSubmitting: false
                })
            })
    }

    render() {
        // console.log(this.state);
        if (this.state.dataSubmittedSuccessfully) {
            return (<Redirect to="/post-submitted" />);
        }
        else if (this.state.userDataReceived === false || this.state.postsUpdated === false) {
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
        else {
            return (
                <Container>
                    <Typography variant="h1">Edit Profile</Typography>
                    <Row className="form-div">
                        <FormControl >
                            <TextField
                                label="First Name"
                                id="firstName"
                                placeholder="First Name"
                                value={this.state.userDetails.firstName}
                                variant="outlined"
                                required
                                onChange={this.handleFirstNameChange}
                                error={this.state.isFirstNameInvalid}
                            />
                            <TextField
                                label="Last Name"
                                id="lastName"
                                placeholder="Last Name"
                                variant="outlined"
                                required
                                onChange={this.handleLastNameChange}
                                value={this.state.userDetails.lastName}
                                error={this.state.isLastNameInvalid}
                            />
                            <button onClick={this.handleTextChange}>Clcikd</button>


                        </FormControl>
                    </Row>
                </Container>
            );
        }

    }
}