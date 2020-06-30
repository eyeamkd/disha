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
import { Redirect } from "react-router-dom";
import firebase from 'firebase/app';

import { database, auth } from '../../firebase/firebase.utils';

import "./style.css";




export default class Reauthentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: null,
            currentUserInfo: null,
            userDataReceived: false,
            isCurrentPasswordValid: true,
            reauthenticated: false,
            errorMessage: null
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }


    handleSubmit = async () => {
        debugger;
        let result;
        if (this.state.isCurrentPasswordValid) {
            var user = firebase.auth().currentUser;
            var credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                this.state.currentPassword
            );
            try {
                result = await user.reauthenticateWithCredential(credential)
            } catch (error) {
                if (error.code === "auth/user-not-found")
                    this.setState({ errorMessage: "Incorrect Password. Please check!", isSignin: false })
                else if (error.code === "auth/wrong-password")
                    this.setState({ errorMessage: "Incorrect Password. Please check!", isSignin: false })
                console.error(error)
            }
            finally {
                if(result && result.user) {
                    this.setState({ reauthenticated: true })
                }
            }
        }
    }



    handleCurrentPasswordChange = (event) => {
        if (event.target.value.length < 1) {
            this.setState({ isCurrentPasswordValid: false })
        }
        else {
            this.setState({ isCurrentPasswordValid: true })
        }
        this.setState({ currentPassword: event.target.value })
    }

    getUserDetails = () => {
        let currentUserInfo = localStorage.getItem('currentUserInfo');
        let userData = JSON.parse(currentUserInfo);
        this.setState({ currentUserInfo: userData, userDataReceived: true })
    }

    render() {
        if (this.state.userDataReceived === false) {
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
        else if (this.state.reauthenticated) {
            return (<Redirect to={{ pathname: "/edit-profile", state: { message: "REAUTH_SUCCESS" } }} />);
        }
        else {
            return (
                <Container component="main" maxWidth="xs">
                    <Typography variant="h1">Confirm Password</Typography>
                    <div className="align-center">
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="mail"
                                        placeholder="Current Mail ID"
                                        variant="outlined"
                                        disabled
                                        type="text"
                                        value={this.state.currentUserInfo.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Current Password"
                                        id="currentPassword"
                                        placeholder="Current Password"
                                        variant="outlined"
                                        required
                                        type="password"
                                        onChange={this.handleCurrentPasswordChange}
                                        error={!this.state.isCurrentPasswordValid}
                                    />
                                </FormControl>
                                {!this.state.isCurrentPasswordValid &&
                                    <FormHelperText error={true}>* Required</FormHelperText>
                                }
                            </Grid>
                        </Grid>
                        <br />
                        {this.state.errorMessage &&
                            <FormHelperText error={true}>{this.state.errorMessage}</FormHelperText>
                        }
                        <Grid container direction="row" justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className="button"
                                size="large"
                                onClick={this.handleSubmit}
                            >
                                <div id="textColor" >Continue</div>
                            </Button>
                        </Grid>
                    </div>
                </Container>
            );
        }
    }


}