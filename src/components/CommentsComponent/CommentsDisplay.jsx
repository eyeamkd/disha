import React, { Component, Fragment } from 'react'
import { Typography, Link, Divider } from '@material-ui/core'; 
import { database } from '../../firebase/firebase.utils';

export class CommentsDisplay extends Component {  
    initialComments = [];
    constructor(props){ 
        super(props); 
        this.state={ 
            comments: this.loadInitialComments(),
            postId: props.postInfo.id
        } 
    } 
    
    loadInitialComments(){ 
        if(this.props.postInfo.comments){ 
            return this.props.postInfo.comments; 
        }
        else return [];
    } 
    
    commentsUpdated(){
        this.setState({comments : [...this.state.comments,this.props.comments]})
    } 

    componentDidUpdate(prevProps){ 
        if(prevProps.comments !== this.props.comments){ 
            this.commentsUpdated();
        }
    } 

    renderComments(){
        for (let index = 0; index < this.state.comments.length; index++) {
            const commentData = this.state.comments[index]; 
            let userLink = `/id=${commentData.rollNumber}`; 
            return (  
                <div>  
                    <div className="comment-fragment-display">   
                        <Link href={userLink}>{commentData.userName}</Link> 
                        <Typography variant="caption">{commentData.date}</Typography> 
                    </div> 
                        <Typography>{commentData.comment}</Typography>
                </div>
            )
            
        }
    } 

    render() {
        if(this.state.comments.length === 0){ 
            return( 
                <div className="comment-fragment-display">  
                    <Typography>This post doesn't have any comments yet, be the first one to comment</Typography>
                </div>
            )
        }else { 
            return( 
                <div className="comment-fragment-display">  
                    { this.state.comments.map((commentData,index)=>( 
                        <div className="comment-body">  
                            <div className="comment-component-display">   
                                <Link href={`/id=${commentData.rollNumber}`} style={{ marginRight:'5px' }} variant="subtitle1">{commentData.userName}</Link> 
                                <Typography variant="caption">{commentData.date}</Typography> 
                            </div> 
                                <Typography className="comment-style">{commentData.comment}</Typography> 
                                {/* <Divider light style={{margin:'5px'}}/> */}
                        </div>
                    ))}
                </div>
            )
        }
    }
}

export default CommentsDisplay
