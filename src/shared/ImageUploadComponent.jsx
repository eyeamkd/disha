import React, { Component, useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
const ImageWrapper = styled.div`
  height: 200px;
  width: 250px;
  margin: 15px;
`;
const reader = new FileReader();
const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 250,
      maxWidth: 250,
      maxHeight: 250,
      minHeight: 250,
    },
  })
);
export const ImageUploadComponent = (props) => {
  const [files, setfiles] = useState([]); 
  const [filePath, setfilePath] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  useEffect(() => {
    if (!!files[0]) {
      reader.onload = (e) => {
        console.log(e.target.result);
        props.onImageUpload(e.target.result);
      };
      reader.readAsDataURL(files[0]);
      console.log(files); 
      setfilePath(files[0].path);
    }
  }, [files]);
  const classes = useStyles(); 
  return (
    <div>
      <ImageWrapper>
        <DropzoneArea
          filesLimit={1}
          onChange={(files) => setfiles(files)}
          previewChipProps={{ classes: { root: classes.previewChip } }}
          dropzoneText="Drop Image or Click here to upload"
          acceptedFiles={["image/*"]}
        />
      </ImageWrapper>
      {/* {filePath && ( */}
        <ReactCrop
          src={filePath}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded()}
          onComplete={onCropComplete()}
          onChange={onCropChange()}
        />
      {/* )} */}
    </div>
  );
}; 

const onImageLoaded=()=>{ 
    console.log("Image loaded");
    
}  
const onCropComplete=()=>{
    console.log("Crop Complete");
} 
const onCropChange=()=>{
    console.log("Crop Change");
} 

export default ImageUploadComponent;
