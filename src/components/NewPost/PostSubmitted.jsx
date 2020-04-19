import React, { Component } from "react";
import { Redirect } from "react-router-dom"; 
import './style.css';
import { Typography } from "@material-ui/core";


export class PostSubmitted extends Component {   
    constructor(props){ 
        super(props); 
        this.state={ 
            timeOut:false
        } 
        console.log("Props",props);
    }
    redirectToHomePage=()=>{ 
        this.setState({timeOut:true});
    }
    render() { 
        if(this.state.timeOut){ 
            return( 
                <Redirect to="/home" />
            )
        }else {  
        setTimeout(()=>{this.redirectToHomePage()},2000);
        return (
        <div className="post-submitted-div">
            <img
            alt="post-submitted"
            src="https://media1.tenor.com/images/06ae072fb343a704ee80c2c55d2da80a/tenor.gif?itemid=14090897" 
            width="fit-content"
            height="fit-content"
            />
            { !!this.props.location.state
                ?
                <Typography variant="h4" className="post-submitted-text">{!!this.props.location.state.message ? "D-Space Created Successfully" : "Post Submitted Successfully"}</Typography> 
                : 
                <Typography variant="h4" className="post-submitted-text">Post Submitted Successfully!</Typography> 
            } 
        </div>
        );
        }
    }
    }

export default PostSubmitted;
