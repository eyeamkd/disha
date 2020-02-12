import React, { Component } from "react";
import { Avatar, Typography } from "@material-ui/core";

export class ProfileImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let scale = this.props.scale;
    return (
      <div>
        <Avatar
          variant={this.props.variant}
          sizes="width:100; height:100"
          style={Object.assign({
            width: scale,
            height: scale
          })}
        >
          <Typography>{this.props.name}</Typography>
        </Avatar>
      </div>
    );
  }
}

export default ProfileImage;
