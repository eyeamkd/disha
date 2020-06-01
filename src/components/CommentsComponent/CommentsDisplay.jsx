import React, { Component } from 'react'

export class CommentsDisplay extends Component { 
    constructor(props){ 
        super(props); 
        this.state={ 
            comments: null
        }
    } 

    componentDidUpdate(prevProps){ 
        if(prevProps.comments !== this.props.comments){ 
            this.commentsUpdated();
        }
    }
    commentsUpdated(){
        this.setState({comments : this.props.comments})
    }
    render() {
        if(this.state.comments === null){ 
            return( 
                <div>  
                This post doesn't have any comments yet, be the first one to comment
                </div>
            )
        }else { 
            return( 
                <div>  
                    Comments OChay Rooo!
                </div>
            )
        }
    }
}

export default CommentsDisplay
