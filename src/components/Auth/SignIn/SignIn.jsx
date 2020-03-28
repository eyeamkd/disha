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
import { setIsNewUser } from '../../../redux/signup/isNewUser-actions';
import Logo from '../../Logo/Logo';

import { 
    FormControl, 
    OutlinedInput, 
    InputLabel, 
    CircularProgress,
    FormHelperText} from '@material-ui/core';

import './SignIn.css';
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';


class SignIn extends React.Component {

    state = {
        isEmail: false,
        isPassword: false,
        email: '',
        password: '',
        isSignin: false,
        errorMessage:'',
        signinErrorMessage: 'Please fill all the fields',
        labelWidth: 0,
        inputLabel: null
    };

    handleEmailChange = event => {
        let isEmailProper = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
        (event.target.value.length < 1 || !isEmailProper) ? this.setState({ isEmail: true}) : this.setState({ isEmail: false});
        this.setState({email: event.target.value});           
    }

   

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };


    handleSigninClick = async () => {
        this.setState({isSignin : true}, () => this.setState({signinErrorMessage: ''}));
        const { email, password } = this.state;
        if (!this.state.isEmail && !this.state.isPassword) {
            try {
                var signedIn = await auth.signInWithEmailAndPassword(email, password);
                //this.props.setIsNewUser(signedIn.additionalUserInfo.isNewUser);
                //console.log("signedIn.additionalUserInfo.isNewUser", signedIn)

                this.setState({
                    email: '',
                    password: ''
                });
            } catch(error) {
                if(error.code === "auth/user-not-found")
                    this.setState({errorMessage: "User with this email ID does not exist. Please check!", isSignin:false})
                else if(error.code === "auth/wrong-password")
                    this.setState({errorMessage: "Wrong password. Please check!", isSignin:false})
                console.error("KAUSTUBH:",error)
            }
            console.log("ok")
        }
        else {
            console.log("not ok")
            this.setState({isSignin : false}, () => this.setState({signinErrorMessage: '* Please fill all the fields'}));
            return;
        }
    }

    render() { 
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
                <Logo height="150" width="150"/>
                <Typography component="h1" variant="h5">
                Sign In
                </Typography>
                <form className="form" noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Email Address
                            </InputLabel>
                            <OutlinedInput
                                id="email"
                                labelWidth={60} 
                                error={this.state.isEmail}
                                required={true}
                                fullWidth
                                autoComplete="email"
                                onChange={event=> this.handleEmailChange(event)}
                            /> 
                            {this.state.isEmail&&  
                                <FormHelperText error={true}>* Please check the email entered</FormHelperText>   
                            } 
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>   
                            <InputLabel variant="outlined" className="input-label" > 
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type="password"
                                labelWidth={60} 
                                required={true}
                                fullWidth
                                onChange={event=> this.handlePasswordChange(event)}
                            /> 
                    </FormControl>
                    </Grid>
                </Grid>
                </form>
                <br/>
                <p style={{color: 'red'}}>{this.state.errorMessage}</p>                
                {  this.state.isSignin 
                    ? 
                <CircularProgress color="primary" />  
                    : 
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className="submit"
                    onClick={() => this.handleSigninClick()}
                >
                    Sign In
                </Button>
                }
                
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/SignUp">
                        Don't have an account? Sign up
                    </Link>
                    </Grid>
                </Grid>
                
            </div>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setIsNewUser: isNewUser => dispatch(setIsNewUser(isNewUser))
});

export default connect(null, mapDispatchToProps)(SignIn);
