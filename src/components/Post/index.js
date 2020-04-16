import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Col, Row } from "react-bootstrap";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
//import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
//import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import {database} from '../../firebase/firebase.utils';
import firebase from 'firebase/app'
import SharePost from '../SharePost';
import DialogBox from '../DialogBox';


//import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./style.css";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    margin: 15
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function Post(props) {
  const classes = useStyles();
  const [share, setShare] = React.useState(false);
  const [likeToggle, setLikeToggle] = React.useState(props.userLiked);
  const [likeCount, setLikeCount] = React.useState(props.post.likes < 0 ? props.post.likes - (props.post.likes - 1) : props.post.likes);
  const [open, setOpen] = React.useState(false);
  let currentLikesCount = props.post.likes;


  const handleShareClick = () => {
    setShare(!share);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handlePostDelete = () => {
    console.log("post deleted")
    props.removePost(props.post);
    setOpen(false);
  };

  const handleLikeClick = () => {
    setLikeToggle(!likeToggle);
    if(!likeToggle) {
      currentLikesCount = likeCount+1;
      setLikeCount(currentLikesCount);
    }
    else {
      currentLikesCount = likeCount-1;
      setLikeCount(currentLikesCount)
    }
  };


  useEffect(() => {
    setLikeCount(likeCount);
    // return () => {
      let setDoc = database.collection('posts').doc(props.post.id).update({likes: likeCount});
      if(likeCount > props.post.likes) {
        let currentUserId = localStorage.getItem('currentUserId')
        let setDoc = database.collection('users').doc(currentUserId).update({
          likedPosts: firebase.firestore.FieldValue.arrayUnion(props.post.id)
        });
      }
      else if(likeCount < props.post.likes) {
        let currentUserId = localStorage.getItem('currentUserId')
        let setDoc = database.collection('users').doc(currentUserId).update({
          likedPosts: firebase.firestore.FieldValue.arrayRemove(props.post.id)
        });
      }
    // }
  });

  const getWebsiteUrl = () => {
    var websiteUrl = window.location.href;
    websiteUrl = websiteUrl.split("/")[2]
    websiteUrl += "/post=" + props.post.postUrl
    return websiteUrl;
  }

  return (
    <Card className={classes.root}>
      <Link to={`/post=${props.post.postUrl}`}>

        <CardHeader title={props.post.title} subheader={props.post.category} />
      
        <CardContent> 
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.description}
        </Typography>
        
        <Col md={4}>
          <Link to={`/id=${props.post.authorRollNumber}`}>
            <Typography variant="body2" color="primary" component="p" className="authorWidth">
              - {props.post.author}  
            </Typography>
          </Link>
        </Col>
          
    
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        <div className={classes.verticalLine}>
          {
            localStorage.getItem('currentUserId') ? 
            <div>
              <IconButton aria-label="add to favorites" color={likeToggle ? "primary" : ""} onClick={handleLikeClick}>
                <FavoriteIcon />
              </IconButton>
              {likeCount}
            </div>
            : <div></div>
          }
          
        </div>
        <IconButton 
          aria-label="share"
          onClick={handleShareClick}
          aria-expanded={share}
        >
          <ShareIcon />
        </IconButton> 
        <Typography variant="body2" color="textPrimary" component="p">{props.post.date}</Typography>
        {props.postedByUser ?
          <IconButton 
            aria-label="share"
            onClick={handleClickOpen}
            aria-expanded={share}
            className={classes.expand}
          >
            <DeleteIcon />
          </IconButton> 
          :
          <div></div>
        }
        <DialogBox open={open} handleDialogClose={handleDialogClose} handlePostDelete={handlePostDelete}/>
        </CardActions>
      <Collapse in={share} timeout="auto" unmountOnExit>
          <CardContent>
            <SharePost url={getWebsiteUrl()}/>
          </CardContent>
      </Collapse>
    </Card>

  );
}
