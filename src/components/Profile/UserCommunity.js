import React, { Component } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import ProfileImage from "./ProfileImage";

export class UserCommunity extends Component {
  render() {
    return (
      <div className="user-community">
        <Typography variant="h6">Meet Your Community</Typography>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ProfileImage name="S S" scale="50" variant="circle" />
            </ListItemAvatar>
            <ListItemText primary="Sanath Swaroop" />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ProfileImage name="R J" scale="50" variant="circle" />
            </ListItemAvatar>
            <ListItemText primary="Raj Kaushal" />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ProfileImage name="K M" scale="50" variant="circle" />
            </ListItemAvatar>
            <ListItemText primary="Kashyap M" />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ProfileImage name="J M" scale="50" variant="circle" />
            </ListItemAvatar>
            <ListItemText primary="jhansi Mekala" />
          </ListItem> 

          <Divider variant="inset" component="li" /> 
        
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ProfileImage name="A G" scale="50" variant="circle" />
            </ListItemAvatar>
            <ListItemText primary="Akhila Gunnala" />
          </ListItem>  

          <Divider variant="inset" component="li" /> 

        </List>
      </div>
    );
  }
}

export default UserCommunity;
