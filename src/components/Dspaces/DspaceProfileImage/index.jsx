import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';  
import {getImageFromSource} from '../../../firebase/firebase.utils';


const DspaceProfileImage = (props) => {  
    const [url, seturl] = useState(''); 
    useEffect(() => { 
        getImageSrc();
    }, [])
    const getImageSrc=()=>{  
        if(!!props.imageSrc)
        getImageFromSource(props.imageSrc).then(url=>{seturl(url)});
      }
    return (   
        <> 
        {   
            !!props.imageSrc? 
            ( <img src={url} alt="profile pic" />) 
            :  
<Avatar variant="circle" style={{margin:'10px'}}  ></Avatar>
        }
        </>
    );
} 

export default DspaceProfileImage;