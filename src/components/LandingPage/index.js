import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Logo from './../Logo/Logo'; 
import { NewUserAdded } from '../../utils/Notfications/newUser'
import './index.css';


class LandingPage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
            <br/>
            <br/>
            <br/>
            <Box display="flex" justifyContent="center">
                <Logo height="327" width="250"/>
            </Box>
            <br/>
            <br/>
            <Grid container direction="row" justify="center" fullWidth>
                <Link to="/SignIn">
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="button"
                        size="large" 
                        fullWidth
                    >
                        <div id="textColor" >Get Started</div> 
                    </Button>
                </Link> 
            </Grid>
            </div>
        )
    }
}

export default LandingPage;
