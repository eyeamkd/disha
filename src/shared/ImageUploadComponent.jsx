import React, { Component, useState, Fragment } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'; 
import styled from 'styled-components'
const ImageWrapper = styled.div` 
        height:200px; 
        width:250px; 
        margin:15px;
    `
export const ImageUploadComponent = (props) => {  
    const [files, setfiles] = useState([])

        return( 
            <ImageWrapper>  
                <DropzoneArea  
                onChange={(files)=>setfiles(files)}
                />
            </ImageWrapper>
        )
}

export default ImageUploadComponent
