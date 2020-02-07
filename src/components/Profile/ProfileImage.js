import React, { Component } from 'react'
import { Avatar } from '@material-ui/core'

export class ProfileImage extends Component {
    render() {
        return (
            <div>
                <Avatar  
                    variant ="square" 
                    sizes =" "  
                    > 
                    KD 
                </Avatar>
            </div>
        )
    }
}

export default ProfileImage
