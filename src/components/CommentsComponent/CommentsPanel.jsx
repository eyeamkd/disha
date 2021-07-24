import { Card, FormControl, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase.utils";
import { onCommentPosted } from "../../redux/comments/comments-action";
import { UserContext } from "../../utils/Context";
import "./styles.css";
// import Alert from '@material-ui/lab/Alert';

export class CommentsPanel extends Component {
  snackBarStyle = "";
  snackBarMessage = "";
  vertical = "bottom";
  horizontal = "center";

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      open: false,
      commentsPanelVisible: props.commentsPanelDisplay,
      postId: props.postInfo.id,
      initialComments: this.loadInitialComments(),
    };
  }

  loadInitialComments() {
    if (this.props.postInfo.comments) {
      return this.props.postInfo.comments;
    } else return [];
  }

  onCommentClicked = (value) => {
    if (!this.state.commentsPanelVisible) {
      this.snackBarStyle = "error";
      this.snackBarMessage = "You think you're clever? Sign in farst-uuu";
      this.setState({ open: true });
    } else {
      if (this.state.comment === "") {
        this.snackBarStyle = "error";
        this.snackBarMessage = "Enter some content!";
        this.setState({ open: true });
      } else {
        this.snackBarStyle = "success";
        this.snackBarMessage = "Succesfully Commented!";
        this.setState({ open: true });
        this.postComment(value);
      }
    }
  };

  postComment(value) {
    let dateString = new Date();

    const comment = {
      date: dateString.toLocaleDateString(),
      comment: this.state.comment,
      userName: value.state.currentUser.firstName,
      rollNumber: value.state.currentUser.rollNumber,
    };
    database
      .collection("posts")
      .doc(this.state.postId)
      .update({
        comments: [...this.state.initialComments, comment],
      });
    this.props.onCommentPosted(comment);
    this.setState({
      comment: "",
    });
  }
  render() {
    return (
      <UserContext.Consumer>
        {(value) => (
          <Card
            className={
              this.state.commentsPanelVisible
                ? "comments-panel-display"
                : "comments-panel-display-inactive"
            }
          >
            <FormControl
              classes={{ root: "input-comments-style" }}
              fullWidth
              className="comments-input"
            >
              <Input
                variant="filled"
                onChange={(e) => this.setState({ comment: e.target.value })}
                color="primary"
                value={this.state.comment}
                disableUnderline
                inputProps={{ "aria-label": "description" }}
                placeholder="Enter your comment"
              />
            </FormControl>

            <Button
              variant="outlined"
              color="primary"
              onClick={this.onCommentClicked(value)}
              style={{ margin: "10px" }}
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
              onClose={() => this.setState({ open: false })}
            >
              <MuiAlert severity={this.snackBarStyle}>
                {this.snackBarMessage}
              </MuiAlert>
            </Snackbar>
          </Card>
        )}
      </UserContext.Consumer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCommentPosted: (comment) => dispatch(onCommentPosted(comment)),
});

const mapStateToProps = (state) => ({
  commentsState: state.comments.commentsState,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPanel);
