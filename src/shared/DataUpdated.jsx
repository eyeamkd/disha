import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './style.css';
import { Typography } from "@material-ui/core";
import Tick from '../assets/tickmark.gif'


export class DataUpdated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOut: false
        }
    }
    redirectToHomePage = () => {
        this.setState({ timeOut: true });
    }
    render() {
        if (this.state.timeOut) {
            return (
                <Redirect to="/home" />
            )
        } else {
            setTimeout(() => { this.redirectToHomePage() }, 2000);
            return (
                <div>
                    {
                        this.props.location.state
                            ?
                            <div className="post-submitted-div">
                                <img
                                    alt="post-submitted"
                                    src={Tick}
                                    width="fit-content"
                                    height="fit-content"
                                />
                                <Typography variant="h4" className="post-submitted-text">{this.props.location.state.message}</Typography>
                            </div>
                            : 
                            <Typography variant="h4" className="post-submitted-div">Loading HomePage...</Typography>
                    }
                </div>
            );
        }
    }
}

export default DataUpdated;
