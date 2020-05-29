import React, { Component } from "react";
import CommentsBlock from "simple-react-comments"; 
import './styles.css'; 
import { database } from '../../firebase/firebase.utils';

export class Comments extends Component {  
    username = null; 
    authorUrl = null;  
    date = new Date();
    initialComments = []; 
    constructor(props){ 
        super(props);   
        this.loadInitialComments();
        this.state={ 
            comments:this.initialComments,  
            postId: props.postInfo.id
            
        }  
        let userInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
        this.username = userInfo.firstName; 
        this.authorUrl = `/id=${userInfo.rollNumber}`
    } 

    loadInitialComments(){ 
        if(this.props.postInfo.comments){ 
            this.initialComments = this.props.postInfo.comments; 
        }
    }
    
    componentWillUnmount(){  
        database.collection('posts').doc(this.state.postId).update({ 
            comments : this.state.comments
        })
        //store all the comments in the firebase
    }    

    commentStyles = { 
        textarea: (base) => ({ 
            ...base,
            background: 'antiquewhite',
            maxHeight: '45px !important',
            padding: '15px',
            margin: '2px'
        }), 
        btn: (base)=>({ 
            ...base,
            backgroundColor: 'orange',
            maxHeight: '45px !important'
        }), 
        comments:(base)=>({ 
            ...base,
        })
    }
    render() {
        return (
        <div>
            <CommentsBlock 
            className="comment-box"
            comments={this.state.comments}
            signinUrl={"#"}
            isLoggedIn={true}
            reactRouter = {false} // set to true if you are using react-router
            onSubmit={(text) => {
                if (text.length > 0) {
                this.setState({
                    comments: [
                    ...this.state.comments,
                    {
                        authorUrl: this.authorUrl,
                        avatarUrl: "#avatarUrl",
                        fullName: this.username,
                        text,
                    },
                    ],
                });
                console.log("Comment submit:", text);
                }
            }} 
            styles={this.commentStyles}
            />
        </div>
        );
    }
    }

export default Comments;
