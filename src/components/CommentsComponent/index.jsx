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
                <CommentsPanel commentsPanelDisplay={this.state.commentsPanelDisplay}/> 
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
