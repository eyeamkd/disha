import React, { Component } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import {database} from '../../firebase/firebase.utils';

let users = [];
export class UserCommunity extends Component {

  state = {
    noUsersYet: false,
    usersArrived: false,
    allUsers: null,
  }

  constructor(props){
    super(props);
    this.getCommunityList();
  }

  getCommunityList () {
    let usersData = database.collection('users')
    usersData.where('department', '==', this.props.userInfo.department).get()
      .then(snapshot => {
          if (snapshot.empty) {
            // console.log('No matching documents.');
            this.setState({noUsersYet: true, usersArrived: true})
            return;
          }  
          snapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data().title);
              let user = doc.data()
              user.id = doc.id
              users.push(user)
          });
          
          this.setState({usersArrived: true, allUsers: users})
          users = [];
          //console.log('dspaces', dspaces)
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
  }

  render() {
    if(!this.state.usersArrived) {
      return(
          <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
              }}
          >
              <CircularProgress size={80}/>
          </div>
      )
    }
    else {
      if(!this.state.noPostsYet) {
        return (
          <div className="user-community">
            <Typography variant="h6">Your Community</Typography>
            <List>
            {
              this.state.allUsers.map((user) => {
              return (
                <div key={user.id}>
                  <ListItem  alignItems="flex-start">
                    <Link to={`/id=${user.rollNumber}`}>
                      <ListItemAvatar>
                        <ProfileImage name={user.firstName[0] + " " + user.lastName[0]} scale="50" variant="circle" />
                      </ListItemAvatar>
                    </Link>
                    <Link to={`/id=${user.rollNumber}`}>
                      <ListItem button>
                        <ListItemText primary={user.firstName + " " + user.lastName} />
                      </ListItem>
                    </Link>
                  </ListItem>
                  <Divider component="li" />
                </div>
              )})
            }
            </List>
          </div>
        );
      }
      else {
        return (
          <div>
            <br/>
            <div style={{
                position: 'absolute', left: '50%',
                transform: 'translate()'
                }}
            >
                <p>No users yet!</p>
            </div>
          </div>
        )
      }
    }
  }
}

export default UserCommunity;
