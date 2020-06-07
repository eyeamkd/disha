import React, { Component } from 'react';
import CommentsPanel from './CommentsPanel'; 
import './styles.css';
import CommentsDisplay from './CommentsDisplay'; 
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

export class CommentsComponent extends Component { 
    constructor(props){ 
        super(props); 
        this.state={ 
            postInfo : this.props.postInfo, 
            commentsPanelDisplay: this.getCurrentUserId()
        }
    }  
    componentDidUpdate(prevProps){ 
        console.log("Prev Props", prevProps); 
        console.log("Current Props", this.props);
    }
    getCurrentUserId() {
        var currentUserId = localStorage.getItem('currentUserId');
        if(currentUserId)
            return true;
        else   
            return false;
    } 
    render() {
        return (
            <div className="comments-components-display"> 
                <CommentsDisplay comments={this.props.commentsState} postInfo={this.state.postInfo}/>
                <CommentsPanel commentsPanelDisplay={this.state.commentsPanelDisplay} postInfo={this.state.postInfo}/>  
                { !this.state.commentsPanelDisplay 
                    && 
                    <div>
                        <Link to="/SignIn">
                            <Typography align="center" color="primary" >
                                Sign in 
                            </Typography>
                        </Link>
                        <Typography align="center">
                            to post a comment
                        </Typography>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {   
    console.log("State updated!!",state);
    return{ 
    commentsState : state.comments.commentsState
    }
}

export default connect(mapStateToProps)(CommentsComponent);
