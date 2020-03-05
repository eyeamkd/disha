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

import './SignIn.css';
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';


class SignIn extends React.Component {

    state = {
        isEmail: false,
        isPassword: false,
        email: '',
        password: '',
        isSignin: false,
        signinErrorMessage: '',
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
                this.props.setIsNewUser(signedIn.additionalUserInfo.isNewUser);
                await console.log("signedIn.additionalUserInfo.isNewUser", signedIn)

                this.setState({
                    email: '',
                    password: ''
                });
            } catch(error) {
                console.error(error)
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
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={event=> this.handlePasswordChange(event)}
                        autoComplete="current-password"
                    />
                    </Grid>
                </Grid>
                </form>
                {this.state.isSignup ? '' : <p style={{color: 'red'}}>{this.state.signinErrorMessage}</p>}
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
