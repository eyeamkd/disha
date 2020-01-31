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
import { setEmail } from './../../../redux/signup/email-actions';
import { setRollNumber } from './../../../redux/signup/rollNumber-actions';
import { setYear } from './../../../redux/signup/year-actions';

class SignUp extends React.Component {

    state = {
        isFirstName: false,
        isLastName: false,
        isEmail: false,
        isRollNumber: false,
        isYear: false
    };

    handleFirstNameChange = event => {
        this.props.setFirstName(event.target.value);
        (event.target.value.length < 1) ? this.setState({ isFirstName: true}) : this.setState({ isFirstName: false})
    }

    handleLastNameChange = event => {
        this.props.setLastName(event.target.value);
        (event.target.value.length < 1) ? this.setState({ isLastName: true}) : this.setState({ isLastName: false})
    }

    handleEmailChange = event => {
        this.props.setEmail(event.target.value);
        let isEmailProper = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
        (event.target.value.length < 1 || !isEmailProper) ? this.setState({ isEmail: true}) : this.setState({ isEmail: false});
    }

    handleRollNumberChange = event => {
        this.props.setRollNumber(event.target.value);
        let isRollNumberProper = this.validateTicketNum(event.target.value);
        (event.target.value.length < 1 || !isRollNumberProper) ? this.setState({ isRollNumber: true}) : this.setState({ isRollNumber: false});
    }

    handleYearChange = event => {
        this.props.setYear(event.target.value);
        let isYearProper = ((Number)(event.target.value) > 2000 && (Number)(event.target.value) <2050) ;
        (event.target.value.length < 1 || !isYearProper) ? this.setState({ isYear: true}) : this.setState({ isYear: false});
    }

    validateTicketNum(numb){
        numb = numb.toLowerCase();
        var first = ["1", "2"];
        var second = ["1a", "5a"];
        var third = ["02","04","05","12"]; // Add other branches
        if (numb.length!==10){
           return false;
        }
        else if (first.indexOf(numb.substring(0,1))===-1){
           return false;
        }
        else if (numb.substring(2,4)!=='p6'){
           return false;
        }
        else if (second.indexOf(numb.substring(4,6))===-1){
            return false;
         }
        else if (third.indexOf(numb.substring(6,8))===-1){
           return false;
        }
        return true;
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
                        error={this.state.isFirstName}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        helperText={this.state.isFirstName ? '* Required' : ''}
                        onChange={event=> this.handleFirstNameChange(event)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        error={this.state.isLastName}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        helperText={this.state.isLastName ? '* Required' : ''}
                        onChange={event=> this.handleLastNameChange(event)}
                    />

                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        error={this.state.isEmail}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        helperText={this.state.isEmail ? '* Please check the email entered' : ''}
                        onChange={event=> this.handleEmailChange(event)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                    <TextField
                        autoComplete="fname"
                        name="rollNumber"
                        variant="outlined"
                        error={this.state.isRollNumber}
                        required
                        fullWidth
                        id="rollNumber"
                        label="Roll Number"
                        autoFocus
                        helperText={this.state.isRollNumber ? '* Enter valid Roll Number' : ''}
                        onChange={event=> this.handleRollNumberChange(event)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <TextField
                        variant="outlined"
                        error={this.state.isYear}
                        required
                        fullWidth
                        id="year"
                        type="number"
                        label="Pass-out Year"
                        name="year"
                        autoComplete="year"
                        helperText={this.state.isYear ? '* Enter a valid year' : ''}
                        onChange={event=> this.handleYearChange(event)}
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
    lastName: state.lastName.lastName,
    email: state.email.email,
    rollNumber: state.rollNumber.rollNumber,
    year: state.year.year,
});

const mapDispatchToProps = dispatch => ({
    setFirstName: firstName => dispatch(setFirstName(firstName)),
    setLastName: lastName => dispatch(setLastName(lastName)),
    setEmail: email => dispatch(setEmail(email)),
    setRollNumber: rollNumber => dispatch(setRollNumber(rollNumber)),
    setYear: year => dispatch(setYear(year))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);