import React, { Component } from 'react'
import LineTo from 'react-lineto';
import { Line } from 'react-lineto';
import FadeAnimation from 'react-fade-animation';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { Fade } from '@material-ui/core';
import MapImage from './../../assets/map.jpg'
import Grid from '@material-ui/core/Grid';
import Logo from './../Logo/Logo';
import './index.css';


var background = {
    width: "100%",
    minHeight: '100%',
    backgroundImage: `url(${MapImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100% !important",
  };

  

class LandingPage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid xs={12} sm={6}>
                    <center>
                        <Logo height="500" width="500"/>
                    </center>
                </Grid>
                <div >
                    <center>
                        <Link to="/SignIn">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className="submit button"
                                size="large"
                            >
                                <div id="textColor">Get Started</div>
                            </Button>
                        </Link>
                    </center>
                </div>
            </div>
        )
    }
}

export default LandingPage;
