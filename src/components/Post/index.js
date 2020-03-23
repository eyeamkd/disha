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
import SharePost from '../SharePost';


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
  const [share, setShare] = React.useState(false);
  const [likeToggle, setLikeToggle] = React.useState(props.userLikedPosts.includes(props.id));
  const [likeCount, setLikeCount] = React.useState(props.likes);
  let currentLikesCount = props.likes;
  const handleShareClick = () => {
    setShare(!share);
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

  const getWebsiteUrl = () => {
    var websiteUrl = window.location.href;
    websiteUrl = websiteUrl.split("/")[2]
    websiteUrl += "/post=" + props.postUrl
    return websiteUrl;
  }

  return (
    <Card className={classes.root}>
      <Link to={`/post=${props.postUrl}`}>

        <CardHeader title={props.title} subheader={props.subtitle} />
      
        <CardContent> 
        
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          
          <Link to={`/id=${props.rollNumber}`}>
            <Typography variant="body2" color="primary" component="p" >
              - {props.author}  
            </Typography>
          </Link>
          
    
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
        <Typography variant="body2" color="textPrimary" component="p" className={classes.expand}>{props.date}</Typography>
      </CardActions>
      <Collapse in={share} timeout="auto" unmountOnExit>
          <CardContent>
            <SharePost url={getWebsiteUrl()}/>
          </CardContent>
      </Collapse>
    </Card>

  );
}
