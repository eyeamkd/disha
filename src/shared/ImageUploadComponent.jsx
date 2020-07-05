import React, { Component, useState, useEffect} from 'react'
import { DropzoneArea } from 'material-ui-dropzone';  
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components'
const ImageWrapper = styled.div` 
        height:200px; 
        width:250px; 
        margin:15px;
    `  
const reader = new FileReader();
const useStyles = makeStyles((theme) => createStyles({
        previewChip: {
          minWidth: 250,
          maxWidth: 250, 
          maxHeight:250,
          minHeight:250
        }
      }),
    )
export const ImageUploadComponent = (props) => {  
    const [files, setfiles] = useState([]) 
    useEffect(() => { 
        if(!!files[0]){  
            reader.onload  = (e)=>{ 
               console.log(e.target.result); 
               props.onImageUpload(e.target.result)
            } 
            reader.readAsDataURL(files[0])
            console.log(files);
            
        }
    }, [files])
    const classes = useStyles()
        return( 
            <ImageWrapper>  
                <DropzoneArea   
                filesLimit={1}
                onChange={(files)=>setfiles(files)} 
                previewChipProps={{classes: { root: classes.previewChip } }} 
                dropzoneText="Drop Image or Click here to upload" 
                acceptedFiles={['image/*']}
                />
            </ImageWrapper>
        )
}

export default ImageUploadComponent
