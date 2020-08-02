import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
import { storageRef, database } from "../firebase/firebase.utils";
import ImageCropModal from "./ImageCropModal";
const ImageWrapper = styled.div`
  height: 200px;
  width: 250px;
  margin: 15px;
`;
const reader = new FileReader();
const inputButtonReference = React.createRef(); 

//display image on modal
//react crop operations on modal 
// display uploaded image as a profile image everywhere 
// repeat the same functionality for Dspaces 
// modify D-space search cards to display the image  

export const ImageUploadComponent = (props) => {
  const [files, setfiles] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false); 
  const [src, setSrc] = useState('');
  // const [filePath, setfilePath] = useState(null);
  // const [crop, setCrop] = useState({ aspect: 16 / 9 });
  useEffect(() => {
    if (!!files[0]) {
      reader.onload = (e) => {
        console.log(e.target.result);
        props.onImageUpload(e.target.result);
      };
      reader.readAsDataURL(files[0]);
      console.log(files);
    }
  }, [files,isImageUploaded]); 
  
  const onSelectFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        // this.setState({ src: reader.result }) 
        setSrc(reader.result)
      );
      reader.readAsDataURL(file);
    }
  }; 

  const storeImageOnFireStore=(file)=>{
    let userRollNumber = JSON.parse(localStorage.getItem('currentUserInfo')).rollNumber; 
    //dangerous if user deletes the localstorage and uploads the image 
    let userProfileImageStorageReference  = storageRef.child(`profile-images/${userRollNumber}-${file.name}`);
    userProfileImageStorageReference.put(file).then((snapshot) => {
      console.log("Uploaded Snapshot ", snapshot);  
      if(snapshot.state==='success'){
        let userDocRef = database.collection('users').doc(localStorage.getItem('currentUserId')); 
        userDocRef.update({profileImagePath : snapshot.metadata.fullPath}).then((res)=>{
            console.log("Image Uploaded Successfully!!",res); 
            setIsImageUploaded(true); 
        })
      } 
  }); 
}
  const onImageUploaded = (event) => {
    let file = event.target.files[0];   
      onSelectFile(file);
      storeImageOnFireStore(file);
      setfiles(file);
    }

  const uploadButtonClicked = () => {
    console.log("Upload Button Clicked");
    inputButtonReference.current.click();
  };
  return (   
    <div className="main-class"> 
    {  
      isImageUploaded 
      ? 
      <ImageCropModal open={isImageUploaded} file={files} src={src}/> 
      : 
      <div className="image-upload-button"> 
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className="submit"
        onClick={uploadButtonClicked}
      >
        UPLOAD
      </Button>

      <input
        type="file"
        onChange={onImageUploaded}
        style={{ display: "none" }}
        ref={inputButtonReference}
      />
    </div> 
    } 
    </div>
  );
};

export default ImageUploadComponent;
