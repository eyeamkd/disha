import React, { Component } from "react";
import CommentsBlock from "simple-react-comments"; 
import './styles.css';

export class Comments extends Component { 
    constructor(props){ 
        super(props); 
        this.state={ 
            comments:[]
        }
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
            reactRouter = {true} // set to true if you are using react-router
            onSubmit={(text) => {
                if (text.length > 0) {
                this.setState({
                    comments: [
                    ...this.state.comments,
                    {
                        authorUrl: "#",
                        avatarUrl: "#avatarUrl",
                        createdAt: new Date(),
                        fullName: "Name",
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
