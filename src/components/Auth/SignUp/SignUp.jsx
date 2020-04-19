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
import {database} from '../../../firebase/firebase.utils';


import { 
    FormControl, 
    OutlinedInput, 
    InputLabel, 
    CircularProgress,
    FormHelperText} from '@material-ui/core';

import { Redirect } from 'react-router-dom'; 


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
        accountCreated: false,
        dept: "IT",
        signupErrorMessage: '',
        rollNumberError: false,
        emailExistsError: false,
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
        if(this.state.emailExistsError) this.setState({emailExistsError: false})
        this.props.setEmail(event.target.value);
        let isEmailProper = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
        (event.target.value.length < 1 || !isEmailProper) ? this.setState({ isEmail: true}) : this.setState({ isEmail: false});
    }

    handleRollNumberChange = event => {
        if(this.state.rollNumberError) this.setState({rollNumberError: false})
        let tempRollNumber = event.target.value.toLowerCase().split(" ")[0];
        let departments = {"01": "Civil", "02": "EEE", "03": "Mech", "04": "ECE", "05": "CSE", "12": "IT"};
        this.props.setRollNumber(tempRollNumber);
        let isRollNumberProper = this.validateTicketNum(tempRollNumber);
        (tempRollNumber.length < 1 || !isRollNumberProper) ? this.setState({ isRollNumber: true}) : this.setState({ isRollNumber: false});
        if(tempRollNumber.length > 7) {
            let deptCode = tempRollNumber.substring(6,8);
            this.setState({dept: departments[deptCode]})
            if(this.deptCode === "12") {
                this.props.setSection("a");
            }
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
        (event.target.value.length < 8) ? this.setState({ isPassword: true}) : this.setState({ isPassword: false});
    };

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value});
        (event.target.value === this.props.password) ? this.setState({ isConfirmPassword: true}) : this.setState({ isConfirmPassword: false});
    };

    handleAckChange = () => {
        console.log(this.props.rollNumber)
        this.state.isAckChecked = !this.state.isAckChecked;
        this.setState({isAckChecked: this.state.isAckChecked});
        
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    rollNumberExists = async (rN) => {
        if(!rN) return false;
        let usersRef = database.collection('users');
        let query = await usersRef.where('rollNumber', '==', rN).get()
        .then(snapshot => {
            if (snapshot.empty) {
                return false;
            }  else {
            return true;
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        return query
    }

    emailExists = async (email) => {
        if(!email) return false;
        let usersRef = database.collection('users');
        let query = await usersRef.where('email', '==', email).get()
        .then(snapshot => {
            if (snapshot.empty) {
                return false;
            }  else {
            return true;
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        console.log('email query', query)
        return query
    }

    handleSignupClick = async () => {
        // if(this.props.rollNumber === null || this.props.rollNumber.length<1) {
        //     return;
        // }
        if(await this.emailExists(this.props.email)) {
            this.setState({emailExistsError: true})
            return
        }
        else {
            this.setState({emailExistsError: false})
        }
        if(await this.rollNumberExists(this.props.rollNumber)) {
            this.setState({rollNumberError: true})
            return
        }
        else {
            this.setState({rollNumberError: false})
        }
        const { lastName, email, year, section, department, password } = this.props;
        const { isAlumni, isAuthenticated } = this.state;

        if (this.state.isAckChecked 
            && this.state.isConfirmPassword
            && !this.state.isEmail
            && !this.state.isPassword
            && !this.state.isYear
            && !this.state.isFirstName
            && !this.state.isLastName
            && this.state.isSection
            && !this.state.isRollNumber
            && this.props.rollNumber !== null && this.props.rollNumber.length>0
        ) 
            {
                this.setState({isSignup : true}, () => this.setState({signupErrorMessage: ''}));
                try {
                    const information = await auth.createUserWithEmailAndPassword(email, password)
                    let firstName = this.capitalizeFirstLetter(this.props.firstName)
                    var likedPosts = [];
                    var dspaces = [];
                    var rollNumber = this.props.rollNumber.toLowerCase()
                    const {user} = information; //Have a redux variable for isNewUser from additionalInfo to check if we need to set the current user or no
                    await createUserProfileDocument(user, {firstName, lastName, email, password, rollNumber, year, department, section, isAlumni, isAuthenticated, likedPosts, dspaces});
                    this.setState({accountCreated: true})

                }catch(error) {
                    console.error(error)
                }
            }
        else {
            this.setState({isSignup : false, signupErrorMessage: '* Please check all the fields'});
            return;
        }
    }

    checkPasswordMatch = () => {
        if(this.state.confirmPassword.length > 0) {
            if(this.state.isConfirmPassword) 
                return false
            else return true
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
            <div className="paper">
                <Logo height="196" width="150"/>
                <br/>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className="form" noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>   
                        <InputLabel variant="outlined" className="input-label" > 
                            First Name
                        </InputLabel>
                            <OutlinedInput
                                id="firstName"
                                labelWidth={60} 
                                error={this.state.isFirstName} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handleFirstNameChange(event)}
                            /> 
                            {this.state.isFirstName&&  
                                <FormHelperText error={true}>* Required</FormHelperText>   
                            } 
                        </FormControl>                     
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Last Name 
                            </InputLabel>
                            <OutlinedInput
                                id="lastName"
                                labelWidth={60} 
                                error={this.state.isLastName} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handleLastNameChange(event)}
                            /> 
                            {this.state.isLastName&&  
                                <FormHelperText error={true}>* Required</FormHelperText>   
                            } 
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>   
                                <InputLabel variant="outlined" className="input-label" > 
                                    Email Address
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    type="email"
                                    labelWidth={60} 
                                    error={this.state.isEmail} 
                                    required={true}
                                    fullWidth
                                    onChange={event=> this.handleEmailChange(event)}
                                /> 
                                {this.state.isEmail&&  
                                    <FormHelperText error={true}>* Please check the email entered</FormHelperText>   
                                } 
                                {this.state.emailExistsError&&  
                                    <FormHelperText error={true}>* This email already exists.</FormHelperText>   
                                }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Roll Number
                            </InputLabel>
                            <OutlinedInput
                                id="rollNumber"
                                labelWidth={60} 
                                error={this.state.isRollNumber || this.state.rollNumberError} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handleRollNumberChange(event)}
                            /> 
                            {this.state.isRollNumber&&  
                                <FormHelperText error={true}>* Enter valid Roll Number</FormHelperText>   
                            } 
                            {this.state.rollNumberError&&  
                                <FormHelperText error={true}>* This Roll Number already exists.</FormHelperText>   
                            } 
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Pass-out Year
                            </InputLabel>
                            <OutlinedInput
                                id="year"
                                type="number"
                                labelWidth={60} 
                                error={this.state.isYear} 
                                value={this.state.yearValue}
                                required={true}
                                fullWidth
                                onChange={event=> this.handleYearChange(event)}
                            /> 
                            {this.state.isYear&&  
                                <FormHelperText error={true}>* Enter a valid year</FormHelperText>   
                            } 
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Department
                            </InputLabel>
                            <OutlinedInput
                                disabled
                                labelWidth={60} 
                                defaultValue="Department"
                                value={this.props.department}
                                required={true}
                                fullWidth
                            /> 
                        </FormControl>
                    </Grid>
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
                            disabled={this.state.dept === "IT"}
                            label="B"
                            labelPlacement="end"
                            />
                            <FormControlLabel
                            value="c"
                            control={<Radio color="primary" />}
                            disabled={this.state.dept === "IT" || this.state.dept === "Civil" || this.state.dept === "EEE" || this.state.dept === "Mech"}
                            label="C"
                            labelPlacement="end"
                            />
                            <FormControlLabel
                            value="d"
                            control={<Radio color="primary" />}
                            disabled={this.state.dept === "IT" || this.state.dept === "Civil" || this.state.dept === "EEE" || this.state.dept === "Mech"}
                            label="D"
                            labelPlacement="end"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type="password"
                                labelWidth={60} 
                                error={this.state.isPassword} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handlePasswordChange(event)}
                            /> 
                            {this.state.isPassword&&  
                                <FormHelperText error={true}>* Password length too short</FormHelperText>   
                            } 
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="confirm-password"
                                type="password"
                                labelWidth={60} 
                                error={this.state.confirmPassword.length < 1 ? this.state.isConfirmPassword : !this.state.isConfirmPassword} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handleConfirmPasswordChange(event)}
                            /> 
                            {this.checkPasswordMatch()&&  
                                <FormHelperText error={true}>Passwords do not match!</FormHelperText>   
                            } 
                        </FormControl>
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
                {  this.state.isSignup 
                    ? 
                <CircularProgress color="primary" />  
                    : 
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
                }
                
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/SignIn" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                {this.state.accountCreated ? (<Redirect to="/home"/>) : null}
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