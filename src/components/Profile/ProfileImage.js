import React, { Component } from 'react'
import { Avatar } from '@material-ui/core'
import classes from '*.module.css';

export class ProfileImage extends Component {
    render() {
        return (
            <div>
                <Avatar  
                    variant ="square" 
                    sizes =" "   
                    className = {class}
                    > 
                    KD 
                </Avatar>
            </div>
        )
    }
}

export default ProfileImage;
