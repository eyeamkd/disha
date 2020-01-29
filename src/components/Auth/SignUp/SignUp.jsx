import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Logo from '../../Logo/Logo';

import './SignUp.css';
import { setFirstName } from './../../../redux/signup/firstName-actions'; 
import { setLastName } from './../../../redux/signup/lastName-actions'; 

class SignUp extends React.Component {

    handleFirstNameChange = event => {
        this.props.setFirstName(event.target.value);
    }

    handleLastNameChange = event => {
        this.props.setLastName(event.target.value);
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
                <Logo height="150" width="150"/>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className="form" noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={event=> this.handleFirstNameChange(event)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={event=> this.handleLastNameChange(event)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I agree that aforementioned details are correct."
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className="submit"
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    firstName: state.firstName.firstName,
    lastName: state.lastName.lastName
});

const mapDispatchToProps = dispatch => ({
    setFirstName: firstName => dispatch(setFirstName(firstName)),
    setLastName: lastName => dispatch(setLastName(lastName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);