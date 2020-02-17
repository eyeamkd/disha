import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Logo from '../../Logo/Logo';

import './SignUp.css';
import { setFirstName } from './../../../redux/signup/firstName-actions';
import { setLastName } from './../../../redux/signup/lastName-actions';
import { setEmail } from './../../../redux/signup/email-actions';
import { setRollNumber } from './../../../redux/signup/rollNumber-actions';
import { setYear } from './../../../redux/signup/year-actions';
import { setSection } from './../../../redux/signup/section-actions';
import { setDepartment } from './../../../redux/signup/department-actions';
import { setPassword } from './../../../redux/signup/password-actions';
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';
import { setIsNewUser } from '../../../redux/signup/isNewUser-actions';


class SignUp extends React.Component {

    state = {
        isFirstName: false,
        isLastName: false,
        isEmail: false,
        isRollNumber: false,
        isYear: false,
        isSection: false,
        isPassword: false,
        isConfirmPassword: false,
        isAckChecked: false,
        isSignup: false,
        isAlumni: false,
        isAuthenticated: false,
        signupErrorMessage: '',
        confirmPassword: '',
        labelWidth: 0,
        inputLabel: null
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
        let tempRollNumber = event.target.value;
        let departments = {"01": "Civil", "02": "EEE", "03": "Mech", "04": "ECE", "05": "CSE", "12": "IT"};
        this.props.setRollNumber(tempRollNumber);
        let isRollNumberProper = this.validateTicketNum(tempRollNumber);
        (tempRollNumber.length < 1 || !isRollNumberProper) ? this.setState({ isRollNumber: true}) : this.setState({ isRollNumber: false});
        if(tempRollNumber.length > 7) {
            let deptCode = tempRollNumber.substring(6,8);
            this.props.setDepartment(departments[deptCode])
        }
            
    }

    handleYearChange = event => {
        this.props.setYear(event.target.value);
        let yearValue = (Number)(event.target.value);
        let isYearProper = ((Number)(event.target.value) > 2007 && (Number)(event.target.value) <2050) ;
        let date = new Date()
        let currentYear = date.getFullYear()
        let currentMonth = date.getMonth() + 1;
        if(event.target.value.length < 1 || !isYearProper)
            this.setState({ isYear: true});
        else
            this.setState({ isYear: false});        
        if(event.target.value.length > 3) {
            console.log(yearValue, currentYear)
            if (yearValue < currentYear ) {
                this.setState({isAlumni: true})

            }
            else if (yearValue === currentYear  && currentMonth > 6) {
                this.setState({isAlumni: true}) 
            }
            else {
                this.setState({isAlumni: false})

            }   
        }
        
    } 


    handleSectionChange = event => {
        this.props.setSection(event.target.value);
        this.setState({isSection: true})
    };

    handlePasswordChange = event => {
        this.props.setPassword(event.target.value);
        (event.target.value.length < 6) ? this.setState({ isPassword: true}) : this.setState({ isPassword: false});
    };

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value});
        (event.target.value === this.props.password) ? this.setState({ isConfirmPassword: true}) : this.setState({ isConfirmPassword: false});
    };

    handleAckChange = () => {
        this.state.isAckChecked = !this.state.isAckChecked;
        this.setState({isAckChecked: this.state.isAckChecked});
    };

    handleSignupClick = async () => {
        console.log(this.props)
        const { firstName, lastName, email, rollNumber, year, section, department, password } = this.props;
        const { isAlumni, isAuthenticated } = this.state;
        console.log(department);
        if (this.state.isAckChecked 
            && this.state.isConfirmPassword
            && !this.state.isEmail
            && !this.state.isPassword
            && !this.state.isYear
            && !this.state.isFirstName
            && !this.state.isLastName
            && this.state.isSection
            && !this.state.isRollNumber
        ) 
            {
                this.setState({isSignup : true}, () => this.setState({signupErrorMessage: ''}));
                try {
                    const information = await auth.createUserWithEmailAndPassword(email, password)
                    console.log(information);
                    this.props.setIsNewUser(information.additionalUserInfo.isNewUser)
                    const {user} = information; //Have a redux variable for isNewUser from additionalInfo to check if we need to set the current user or no
                    await createUserProfileDocument(user, {firstName, lastName, email, password, rollNumber, year, department, section, isAlumni, isAuthenticated});
                    this.props.setFirstName('');
                    this.props.setLastName('');
                    this.props.setEmail('');
                    this.props.setRollNumber('');
                    this.props.setSection('');
                    this.props.setYear('');
                    this.props.setPassword('');
                    this.props.setDepartment('');


                }catch(error) {
                    console.error(error)
                }
            }
        else {
            this.setState({isSignup : false}, () => this.setState({signupErrorMessage: '* Please check all the fields'}));
            return;
        }

    }

    checkPasswordMatch = () => {
        if(this.state.confirmPassword.length > 0) {
            if(!this.state.isConfirmPassword) 
                return ("Passwords do not match!")
        }
    }

    validateTicketNum(numb){
        numb = numb.toLowerCase();
        var first = ["0", "1", "2"];
        var second = ["1a", "5a"];
        var third = ["01", "02", "03", "04", "05", "12"]; // Add other branches
        
        if (numb.length!==10){
           return false;
        }
        if (first.indexOf(numb.substring(0,1))===-1){
           return false;
        }
        if (numb.substring(2,4)!=='p6'){
           return false;
        }
        if (second.indexOf(numb.substring(4,6))===-1){
            return false;
         }
        if (third.indexOf(numb.substring(6,8))===-1){
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
                        autoComplete="firstname"
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
                        autoComplete="lastname"
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
                    <Grid item xs={12}>
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
                        value={this.state.yearValue}
                        id="year"
                        type="number"
                        label="Pass-out Year"
                        name="year"
                        autoComplete="year"
                        helperText={this.state.isYear ? '* Enter a valid year' : ''}
                        onChange={event=> this.handleYearChange(event)}
                    /></Grid>
                    <Grid item xs={12} sm={7}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Department"
                        variant="outlined"
                        label="Department"
                        name="department"
                        autoComplete="department"
                        value={this.props.department}
                        helperText={this.state.isYear ? '* Enter a valid year' : ''}
                        onChange={event=> this.handleYearChange(event)}
                    /></Grid>
                    <Grid item xs={12}>
                    <FormLabel component="legend">Section</FormLabel>
                        <RadioGroup aria-label="section" name="section" value={this.props.section} onChange={event=> this.handleSectionChange(event)} row>
                            <FormControlLabel
                            value="a"
                            control={<Radio color="primary" />}
                            label="A"
                            labelPlacement="end"
                            />
                            <FormControlLabel
                            value="b"
                            control={<Radio color="primary" />}
                            label="B"
                            labelPlacement="end"
                            />
                            <FormControlLabel
                            value="c"
                            control={<Radio color="primary" />}
                            label="C"
                            labelPlacement="end"
                            />
                            <FormControlLabel
                            value="d"
                            control={<Radio color="primary" />}
                            label="D"
                            labelPlacement="end"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={this.state.isPassword}
                        helperText={this.state.isPassword ? 'Password length too short' : ''}
                        onChange={event=> this.handlePasswordChange(event)}
                        autoComplete="current-password"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        error={this.state.confirmPassword.length < 1 ? this.state.isConfirmPassword : !this.state.isConfirmPassword}
                        onChange={event=> this.handleConfirmPasswordChange(event)}
                        helperText={this.checkPasswordMatch()}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" onChange={() => this.handleAckChange()} />}
                        label="I agree that aforementioned details are correct."
                    />
                    </Grid>
                </Grid>
                </form>
                {this.state.isSignup ? '' : <p style={{color: 'red'}}>{this.state.signupErrorMessage}</p>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className="submit"
                    onClick={() => this.handleSignupClick()}
                >
                    Sign Up
                </Button>
                
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/SignIn" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                
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
    section: state.section.section,
    department: state.department.department,
    password: state.password.password
});

const mapDispatchToProps = dispatch => ({
    setFirstName: firstName => dispatch(setFirstName(firstName)),
    setLastName: lastName => dispatch(setLastName(lastName)),
    setEmail: email => dispatch(setEmail(email)),
    setRollNumber: rollNumber => dispatch(setRollNumber(rollNumber)),
    setYear: year => dispatch(setYear(year)),
    setSection: section => dispatch(setSection(section)),
    setDepartment: department => dispatch(setDepartment(department)),
    setPassword: password => dispatch(setPassword(password)),
    setIsNewUser: isNewUser => dispatch(setIsNewUser(isNewUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);