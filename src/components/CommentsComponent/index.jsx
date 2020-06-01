import React, { Component } from 'react';
import CommentsPanel from './CommentsPanel'; 
import './styles.css';
import CommentsDisplay from './CommentsDisplay'; 
import { connect } from 'react-redux';

export class CommentsComponent extends Component {
    render() {
        return (
            <div className="comments-components-display"> 
                <CommentsDisplay comments={this.props.commentsState}/>
                <CommentsPanel/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    commentsState : state.comments.commentsState
})

export default connect(mapStateToProps)(CommentsComponent);
