import { Card, CircularProgress } from "@material-ui/core";
import "firebase/auth";
import "firebase/firestore";
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { database } from "../../firebase/firebase.utils";
import CommentsComponent from "../CommentsComponent";
import Post from "../Post";
import "./styles.css";

export class IndividualPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      currentUserInfo: null,
      postNotExists: false,
    };
  }
  async getPostData (postsData, id) { 
    let query = postsData
      .where("postUrl", "==", id) 
      .get()
      .then((snapshot) => {
        console.log("Snapshots", snapshot);
        if (snapshot.empty) {
          // console.log('No matching documents.');
          this.setState({ postNotExists: true });
        }
        let postData = null;
        snapshot.forEach((doc) => {  
          postData = doc.data()
        });  
        console.log("Post data is", postData);
        this.setState({info:postData})
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  getCurrentUserData = () => {
    debugger;
    let currentUserId = localStorage.getItem("currentUserId");
    if (currentUserId) {
      let query = database
        .collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            this.setState({ currentUserInfo: doc.data() });
          }
        })   
        .catch((err) => {
          console.log("Error getting document", err);
        });
    } else {
      this.setState({ currentUserInfo: { likedPosts: [] } });
    }
  };

  componentDidMount() {
    const { post } = this.props.match.params;
    let postsData = database.collection("posts");
    this.getPostData(postsData, post);
    if (this.state.currentUserInfo == null) {
      this.setState({
        currentUserInfo: JSON.parse(localStorage.getItem("currentUserInfo")),
      });
    }
    // if(this.state.currentUserInfo==null)
    // this.getCurrentUserData();
  }

  render() {
    console.log("STATE", this.state);
    // return(<h1>Hello</h1>)
    if (this.state.postNotExists) return <Redirect to="/home" />;
    else
      return this.state.info && this.state.currentUserInfo ? (
        <Fragment>
          <Post
            post={this.state.info}
            userLiked={this.state.currentUserInfo.likedPosts.includes(
              this.state.info.id
            )}
            postedByUser={
              this.state.currentUserInfo.rollNumber ==
              this.state.info.authorRollNumber
            }
            removePost={this.removePost}
            inIndividualpost={true}
          />
          <Card className="comments-card-style">
            <CommentsComponent postInfo={this.state.info} />
          </Card>
        </Fragment>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={80} />
        </div>
      );
  }
}

export default IndividualPost;
