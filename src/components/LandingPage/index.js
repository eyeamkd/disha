import React, { Component } from 'react'
import LineTo from 'react-lineto';
import { Line } from 'react-lineto';
import FadeAnimation from 'react-fade-animation';
import { Fade } from '@material-ui/core';

import MapImage from './../../assets/map.jpg'

class LandingPage extends Component {
    render() {
        return (
            <div styles={{ backgroundImage:`url(${MapImage})` }}>
                <Fade in={true}><div className="A"><h1>Element A</h1></div></Fade>
                <br/>
                <br/>
                <br/>
                <FadeAnimation from={"left"} duration={3.5}>
                    <div className="B"><h1>Element B</h1></div>
                </FadeAnimation>
                
                <LineTo from="A" to="B" />
                <img src={MapImage} />
                <FadeAnimation from={"left"} duration={3.5}>
                    <Line x0={350} y0={350} x1={100} y1={100} />
                </FadeAnimation>
            </div>
        )
    }
}

export default LandingPage;
