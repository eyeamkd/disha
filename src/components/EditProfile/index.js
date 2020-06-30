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
import Box from '@material-ui/core/Box';
import { Row } from "react-bootstrap";
import { database } from '../../firebase/firebase.utils';
import "./style.css";
import { Redirect } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import firebase from 'firebase/app';
import LocationSearch from './LocationSearch';


let posts = []
export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            location: "",
            company: "",
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            onDataSubmitting: false,
            detailsUpdatedSuccessfully: false,
            currentUserInfo: null,
            userDataReceived: false,
            postsUpdated: false,
            isPasswordTab: false,
            isCurrentPasswordValid: true,
            isNewPasswordValid: true,
            isConfirmPasswordValid: true,
            isConfirmPasswordValid: true,
            cities: null,
        }

    }


    componentDidMount() {
        this.getUserDetails();
        this.getPosts()
        this.getCities()
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

    getCities = () => {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
        fetch(proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                this.setState({cities: data})
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
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
    handleNewPasswordChange = (event) => {
        if (event.target.value.length < 8) {
            this.setState({ isNewPasswordValid: false })
        }
        else {
            this.setState({ isNewPasswordValid: true })
        }
        if (this.state.confirmPassword && event.target.value !== this.state.confirmPassword) {
            this.setState({ isConfirmPasswordValid: false })
        }
        else {
            this.setState({ isConfirmPasswordValid: true })
        }
        this.setState({ newPassword: event.target.value })
    }
    handleConfirmPasswordChange = (event) => {
        if (event.target.value !== this.state.newPassword) {
            this.setState({ isConfirmPasswordValid: false })
        }
        else {
            this.setState({ isConfirmPasswordValid: true })
        }
        this.setState({ confirmPassword: event.target.value })
    }

    isNameChanged = () => {
        if (this.state.firstName === this.state.currentUserInfo.firstName && this.state.lastName === this.state.currentUserInfo.lastName) {
            return false
        }
        else return true
    }

    isOtherDetailsChanged = () => {
        if (this.state.location === this.state.currentUserInfo.location && this.state.company === this.state.currentUserInfo.company) {
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
    }

    updateUserDetails = () => {
        if (!this.state.firstName || !this.state.lastName) return;
        let currentUserId = localStorage.getItem("currentUserId");
        let userData = this.state.currentUserInfo
        userData.firstName = this.state.firstName
        userData.lastName = this.state.lastName
        if (this.state.location)
            userData.location = this.state.location
        if (this.state.company)
            userData.company = this.state.company
        localStorage.setItem("currentUserInfo", JSON.stringify(userData))
        database.collection("users").doc(currentUserId).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            location: userData.location,
            company: userData.company,
        });
        this.setState({ detailsUpdatedSuccessfully: true });
    }


    handleDetailsSubmit = () => {
        debugger;
        if (this.isNameChanged()) {
            this.setState({ postsUpdated: false })
            this.updatePostData();
        }
        if (this.isNameChanged() || this.isOtherDetailsChanged()) {
            this.updateUserDetails();
            this.setState({
                onDataSubmitting: true
            })
        }
    }

    handlePasswordSubmit = () => {
        if (this.state.isNewPasswordValid && this.state.isConfirmPasswordValid) {
            let result;
            let user = firebase.auth().currentUser;
            try {
                result = user.updatePassword(this.state.newPassword)
            } catch (error) {
                if (error.code === "auth/user-not-found")
                    this.setState({ errorMessage: "Incorrect Password. Please check!", isSignin: false })
                else if (error.code === "auth/wrong-password")
                    this.setState({ errorMessage: "Incorrect Password. Please check!", isSignin: false })
                console.error(error)
            }
            finally {
                if (result) {
                    this.setState({ detailsUpdatedSuccessfully: true })
                }
            }
        }
    }

    getUserDetails = () => {
        let currentUserInfo = localStorage.getItem('currentUserInfo');
        let userData = JSON.parse(currentUserInfo);
        this.setState({
            currentUserInfo: userData,
            userDataReceived: true,
            firstName: userData.firstName,
            lastName: userData.lastName,
            company: userData.company,
            location: userData.location,
        })
    }

    handleTabSwitch = () => {
        this.setState({ isPasswordTab: !this.state.isPasswordTab, currentPassword: null, firstName: null })
    }

    handleLocationChange = (event) => {
        this.state.location = event.target.value
    }

    handleCompanyChange = (event) => {
        this.state.company = event.target.value
    }


    render() {
        // console.log(this.state);
        if (this.state.detailsUpdatedSuccessfully) {
            return (<Redirect to={{ pathname: "/data-updated", state: { message: "Details Updated Successfully" } }} />);
        }
        else if (!this.props.location.state) {
            return (<Redirect to={{ pathname: "/" }} />);
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
                                    defaultValue={this.state.currentUserInfo.firstName}
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
                                    defaultValue={this.state.currentUserInfo.lastName}
                                    placeholder={this.state.currentUserInfo.lastName}
                                    variant="outlined"
                                    required
                                    onChange={this.handleLastNameChange}
                                    error={this.state.isLastNameInvalid}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <LocationSearch />
                            <FormControl fullWidth>
                                <TextField
                                    label="Location"
                                    id="location"
                                    defaultValue={this.state.currentUserInfo.location || ""}
                                    placeholder={this.state.currentUserInfo.location || ""}
                                    variant="outlined"
                                    onChange={this.handleLocationChange}
                                    error={this.state.isLocationInvalid}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Company"
                                    id="company"
                                    defaultValue={this.state.currentUserInfo.company || ""}
                                    placeholder={this.state.currentUserInfo.company || ""}
                                    variant="outlined"
                                    onChange={this.handleCompanyChange}
                                    error={this.state.isCompanyInvalid}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className="button"
                            size="large"
                            onClick={this.handleDetailsSubmit}
                        >
                            <div id="textColor" >Save Changes</div>
                        </Button>
                    </Grid>
                    <br />
                    <Box justifyContent="center">

                        <form className="form" noValidate>

                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="New Password"
                                            id="NewPassword"
                                            placeholder="New Password"
                                            variant="outlined"
                                            required
                                            type="password"
                                            onChange={this.handleNewPasswordChange}
                                            error={!this.state.isNewPasswordValid}
                                        />
                                    </FormControl>
                                    {!this.state.isNewPasswordValid &&
                                        <FormHelperText error={true}>* Password too short!</FormHelperText>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Confirm Password"
                                            id="ConfirmPassword"
                                            placeholder="Confirm Password"
                                            variant="outlined"
                                            required
                                            type="password"
                                            onChange={this.handleConfirmPasswordChange}
                                            error={!this.state.isConfirmPasswordValid}
                                        />
                                    </FormControl>
                                    {!this.state.isConfirmPasswordValid &&
                                        <FormHelperText error={true}>Passwords do not match!</FormHelperText>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className="button"
                                    size="medium"
                                    onClick={this.handlePasswordSubmit}
                                >
                                    <div id="textColor" >Change Password</div>
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            );
        }

    }
}