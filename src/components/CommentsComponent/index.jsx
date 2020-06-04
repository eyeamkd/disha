import React, { Component } from 'react';
import CommentsPanel from './CommentsPanel'; 
import './styles.css';
import CommentsDisplay from './CommentsDisplay'; 
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

export class CommentsComponent extends Component { 
    constructor(props){ 
        super(props); 
        this.state={ 
            postInfo : this.props.postInfo, 
            commentsPanelDisplay: this.getCurrentUserId()
        }
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
                <CommentsPanel commentsPanelDisplay={this.state.commentsPanelDisplay}/> 
                { !this.state.commentsPanelDisplay 
                    && 
                    <Typography align="center" >Sign in to post a comment</Typography>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    commentsState : state.comments.commentsState
})

export default connect(mapStateToProps)(CommentsComponent);
