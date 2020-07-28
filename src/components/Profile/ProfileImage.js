import React, { Component } from "react";
import { Avatar, Typography } from "@material-ui/core";

export class ProfileImage extends Component {
  constructor(props) {
    super(props); 
    this.state={ 

    }
  }
  render() {
    let scale = this.props.scale;
    return (
      <div>
        <Avatar
          variant={this.props.variant}
          sizes="width:100; height:100" 
          onMouseEnter={()=>{console.log("Mouse Entereed")}}
          style={Object.assign({ 
            width: scale,
            height: scale
          })}
        > 
        { 
          !!this.props.image 
          ? 
          <img src={this.props.imagesrc} alt="profile pic" />
          : 
          <Typography>{this.props.name}</Typography>
        }
          
        </Avatar>
      </div>
    );
  }
}

export default ProfileImage;
