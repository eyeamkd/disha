import { Avatar } from '@material-ui/core';
import React from 'react'; 

const DspaceProfileImage = (props) => {
    return (   
        <> 
        {   
            !!this.props.image? 
            ( <img src={this.state.url} alt="profile pic" />) 
            :  
<Avatar variant="circle" style={{margin:'10px'}}  ></Avatar>
        

        }
        </>
    );
} 

export default DspaceProfileImage;