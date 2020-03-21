import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import {database} from '../../firebase/firebase.utils';
import firebase from 'firebase/app'
//import admin from 'firebase-admin';

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
    transform: "rotate(0deg)",
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
  const [expanded, setExpanded] = React.useState(false);
  const [likeToggle, setLikeToggle] = React.useState(props.userLikedPosts.includes(props.id));
  const [likeCount, setLikeCount] = React.useState(props.likes);
  let currentLikesCount = props.likes;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    console.log('props.userLikedPosts', props.userLikedPosts)
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
    console.log('props.id', props.id)
    // return () => {
      let setDoc = database.collection('posts').doc(props.id).update({likes: likeCount});
      console.log('currentLikesCount', likeCount)
      if(likeCount > props.likes) {
        let currentUserId = localStorage.getItem('currentUserId')
        let setDoc = database.collection('users').doc(currentUserId).update({
          likedPosts: firebase.firestore.FieldValue.arrayUnion(props.id)
        });
      }
      else if(likeCount < props.likes) {
        let currentUserId = localStorage.getItem('currentUserId')
        let setDoc = database.collection('users').doc(currentUserId).update({
          likedPosts: firebase.firestore.FieldValue.arrayRemove(props.id)
        });
      }
    // }
  });



  return (
    <Card className={classes.root}>
      <CardHeader title={props.title} subheader={props.subtitle} />
     
      <CardContent> 
      
        <Typography variant="body2" color="textSecondary" component="p">
          Click on the arrow on the bottom-right to view more details!
        </Typography>
        
        <Link to={`/id=${props.rollNumber}`}>
          <Typography variant="body2" color="primary" component="p" >
            - {props.author}  
          </Typography>
        </Link>
         
   
      </CardContent>

      <CardActions disableSpacing>
        <div className={classes.verticalLine}>
          <IconButton aria-label="add to favorites" color={likeToggle ? "primary" : ""} onClick={handleLikeClick}>
            <FavoriteIcon />
          </IconButton>
          {likeCount}
        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> 
        <Typography variant="body2" color="textPrimary" component="p" >{props.date}</Typography>
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More Info:</Typography>
          <Typography paragraph>
          {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
