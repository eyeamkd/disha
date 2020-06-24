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
import Grid from '@material-ui/core/Grid';
import { Row } from "react-bootstrap";
import { database } from '../../firebase/firebase.utils';
import "./style.css";
import { Redirect } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const postCategories = ["Internship", "Project", "Events"];
let posts = [];



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
            nameUpdatedSuccessfully: false,
            dataSubmittingError: '',
            dSpaces: [],
            dspaceListArrived: false,
            currentUserInfo: null,
            userDataReceived: false,
            postsUpdated: false,
            theme: 'snow'
        }

    }


    componentDidMount() {
        this.getUserDetails();
        this.getPosts()
    }

    componentWillUnmount() {
        posts = [];
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
                    posts.push(a)
                });
                posts.sort((a, b) => (a.timeStamp > b.timeStamp) ? -1 : 1);
                this.setState({ postsUpdated: true, allPosts: posts })
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
        this.setState({ firstName: event.target.value })
    }
    handleLastNameChange = (event) => {
        this.setState({ lastName: event.target.value })
    }

    isNameChanged = () => {
        if (this.state.firstName === this.state.currentUserInfo.firstName && this.state.lastName === this.state.currentUserInfo.lastName) {
            return false
        }
        else return true
    }

    updatePostData = () => {
        this.state.allPosts.forEach(post => {
            if (post.authorRollNumber === this.state.currentUserInfo.rollNumber) {
                database.collection("posts").doc(post.id).update({
                    author: this.state.firstName + " " + this.state.lastName
                });
            }
        })
        this.setState({ nameUpdatedSuccessfully: true });
    }

    updateUserDetails = () => {
        if (!this.state.firstName || !this.state.lastName) return;
        let currentUserId = localStorage.getItem("currentUserId");
        let userData = this.state.currentUserInfo
        userData.firstName = this.state.firstName
        userData.lastName = this.state.lastName
        localStorage.setItem("currentUserInfo", JSON.stringify(userData))
        database.collection("users").doc(currentUserId).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        });
    }


    handleSubmit = () => {
        debugger;
        console.log("CLLL")
        if (this.isNameChanged()) {
            this.setState({ postsUpdated: false })
            this.updateUserDetails();
            this.updatePostData();
            this.setState({
                onDataSubmitting: true
            })
        }
    }

    getUserDetails = () => {
        let currentUserInfo = localStorage.getItem('currentUserInfo');
        let userData = JSON.parse(currentUserInfo);
        this.setState({ currentUserInfo: userData, userDataReceived: true, firstName: userData.firstName, lastName: userData.lastName })
    }


    render() {
        // console.log(this.state);
        if (this.state.nameUpdatedSuccessfully) {
            return (<Redirect to={{ pathname: "/data-updated", state: { message: "Details Updated Successfully" } }} />);
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
                <Container component="main" maxWidth="xs">
                    <Typography variant="h1">Edit Profile</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="First Name"
                                    id="firstName"
                                    placeholder={this.state.currentUserInfo.firstName}
                                    variant="outlined"
                                    required
                                    onChange={this.handleFirstNameChange}
                                    error={this.state.isFirstNameInvalid}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Last Name"
                                    id="lastName"
                                    placeholder={this.state.currentUserInfo.lastName}
                                    variant="outlined"
                                    required
                                    onChange={this.handleLastNameChange}
                                    error={this.state.isLastNameInvalid}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container direction="row" justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="button"
                            size="medium"
                            onClick={this.handleSubmit}
                        >
                            <div id="textColor" >Change Password</div>
                        </Button>
                    </Grid>
                    <br/>
                    <Grid container direction="row" justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className="button"
                            size="large"
                            onClick={this.handleSubmit}
                        >
                            <div id="textColor" >Save Changes</div>
                        </Button>
                    </Grid>
                </Container>
            );
        }

    }
}