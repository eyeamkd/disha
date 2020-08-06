import React, { Component } from "react";
import { Avatar, Typography } from "@material-ui/core"; 
import {storage} from '../../firebase/firebase.utils'

export class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      url:''
    }; 
    if(!!props.image) 
      this.getImageSrc();
  } 
  getImageSrc=()=>{ 
    let imageStorageReference = storage.ref(this.props.imageSrc);
    imageStorageReference.getDownloadURL().then(url=>{this.setState({url:url})})
  }
  render() {
    let scale = this.props.scale; 

    return (
      <div>
        <Avatar
          variant={this.props.variant}
          sizes="width:100; height:100"
          onMouseEnter={() => {
            console.log("Mouse Entereed");
          }}
          style={Object.assign({
            width: scale,
            height: scale,
          })}
        >
          {!!this.props.image ? (
            <img src={this.state.url} alt="profile pic" />
          ) : (
            <Typography>{this.props.name}</Typography>
          )}
        </Avatar>
      </div>
    );
  }
}

export default ProfileImage;
