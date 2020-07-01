import React, { Component, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

export const ImageUploadComponent = (props) => {  
    const [files, setfiles] = useState([])

        return(
            <DropzoneArea 
                onChange={(files)=>setfiles(files)}
            />
        )
}

export default ImageUploadComponent
