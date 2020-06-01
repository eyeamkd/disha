import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"; 
import './styles.css';
// import Alert from '@material-ui/lab/Alert';

export class CommentsPanel extends Component {
    snackBarStyle = "";
    snackBarMessage = "";
    vertical = "top";
    horizontal = "center";
    constructor(props) {
        super(props);
        this.state = {
        comment: "",
        open: false,
        };
    }
    onCommentClicked = () => {
        if (this.state.comment === "") {
        this.snackBarStyle = "error";
        this.snackBarMessage = "Enter content bruh!!";
        this.setState({ open: true });
        } else {
        this.snackBarStyle = "success";
        this.snackBarMessage = "Succesfully Commented!";
        this.setState({ open: true });
        }
    };
    render() {
    return (
    <div className="comments-panel-display">
            <TextField
            aria-label="minimum height"
            variant="filled"
            multiline
            rows="1" 
            fullwidth={true}
            placeholder="Enter your Comment"
            onChange={(e) => this.setState({ comment: e.target.value })}
            />
            <Button
            variant="outlined"
            color="primary"
            onClick={this.onCommentClicked}
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
            >
                <MuiAlert severity={this.snackBarStyle}>
                    {this.snackBarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
}

export default CommentsPanel;
