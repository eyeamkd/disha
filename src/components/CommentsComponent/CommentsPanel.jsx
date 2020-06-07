import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"; 
import './styles.css'; 
import { FormControl, InputLabel, Input, Card } from "@material-ui/core"; 
import { database } from '../../firebase/firebase.utils'; 
import { connect } from 'react-redux';  
import { onCommentPosted } from '../../redux/comments/comments-action'; 
import { makeStyles } from '@material-ui/core/styles';
// import Alert from '@material-ui/lab/Alert';



export class CommentsPanel extends Component { 

    snackBarStyle = "";
    snackBarMessage = "";
    vertical = "bottom";
    horizontal = "center"; 
    userInfo = JSON.parse(localStorage.getItem('currentUserInfo')); 


    
    constructor(props) {
        super(props);
        this.state = {
        comment: "",
        open: false, 
        commentsPanelVisible : props.commentsPanelDisplay,
        postId: props.postInfo.id, 
        initialComments:this.loadInitialComments(),
        };
    }  

    getCurrentUserId() {
        var currentUserId = localStorage.getItem('currentUserId');
        if(currentUserId)
            return true;
        else   
            return false;
    } 
    
    loadInitialComments(){ 
        if(this.props.postInfo.comments){ 
            return this.props.postInfo.comments; 
        }
        else return [];
    } 

    onCommentClicked = () => { 
        if(!this.state.commentsPanelVisible){ 
            this.snackBarStyle = "error";
            this.snackBarMessage = "You think you're clever? Sign in farst-uuu";
            this.setState({ open: true }); 
        }else{ 
            if (this.state.comment === "") {
                this.snackBarStyle = "error";
                this.snackBarMessage = "Enter some content!";
                this.setState({ open: true }); 
        
                } else {
                this.snackBarStyle = "success";
                this.snackBarMessage = "Succesfully Commented!";
                this.setState({ open: true }); 
                this.postComment();
                }
        }
        
    }; 

    postComment(){   
        let dateString = new Date(); 

        const comment={ 
            date: dateString.toLocaleDateString() ,
            comment: this.state.comment, 
            userName: this.userInfo.firstName, 
            rollNumber: this.userInfo.rollNumber
        } 
        database.collection('posts').doc(this.state.postId).update({ 
            comments : [...this.state.initialComments,comment]
        }) 
        this.props.onCommentPosted(comment); 
        this.setState({ 
            comment : ''
        }); 
        
    }
    render() {
    return (
    <Card className={this.state.commentsPanelVisible? "comments-panel-display" : "comments-panel-display-inactive"}> 
            <FormControl classes={{root:'input-comments-style'}} fullWidth className="comments-input" >
                <Input
                    variant="filled"
                    onChange={(e) => this.setState({ comment: e.target.value })}
                    color="primary" 
                    value={this.state.comment} 
                    disableUnderline 
                    inputProps={{ 'aria-label': 'description' }}  
                    placeholder="Enter your comment"
                />
            </FormControl>
            
            <Button
            variant="outlined"
            color="primary"
            onClick={this.onCommentClicked} 
            style={{margin:'10px'}}
            >
                Comment
            </Button>
            <Snackbar
            anchorOrigin={{
                vertical: this.vertical,
                horizontal: this.horizontal,
            }}
            open={this.state.open}
            autoHideDuration={5000}
            key={this.vertical + this.horizontal} 
            onClose={() => this.setState({open: false})}
            >
                <MuiAlert severity={this.snackBarStyle}>
                    {this.snackBarMessage}
                </MuiAlert>
            </Snackbar>
        </Card>
    );
}
}

const mapDispatchToProps = dispatch => ({ 
    onCommentPosted : comment => dispatch(onCommentPosted(comment))
}) 

const mapStateToProps = state => ({
    commentsState : state.comments.commentsState
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPanel);
