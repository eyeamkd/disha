import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
import { storage, database } from "../firebase/firebase.utils";
import ImageCropModal from "./ImageCropModal";
const ImageWrapper = styled.div`
  height: 200px;
  width: 250px;
  margin: 15px;
`;
const reader = new FileReader();
const inputButtonReference = React.createRef();

//  repeat the same functionality for Dspaces
//  modify D-space search cards to display the image

export const ImageUploadComponent = (props) => {
  const [files, setfiles] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!!files[0]) {
      reader.onload = (e) => {
        console.log(e.target.result);
        props.onImageUpload(e.target.result);
      };
      reader.readAsDataURL(files[0]);
      console.log(files);
    }
  }, [files, isImageUploaded, props]);

  const onSelectFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        // this.setState({ src: reader.result })
        setSrc(reader.result)
      );
      reader.readAsDataURL(file);
      setIsImageUploaded(true);
    }
  };

  const onImageCropCancelClicked = () => {
    setIsImageUploaded(false);
    setSrc("");
    setfiles([]);
  };

  const onImageUploaded = (event) => {
    let file = event.target.files[0];
    onSelectFile(file);
    // storeImageOnFireStore(file);
    setfiles(file);
  };

  const uploadButtonClicked = () => {
    console.log("Upload Button Clicked");
    inputButtonReference.current.click();
  }; 

  const deleteProfileImage = () => {
    console.log("Delete Button Clicked");   
    debugger;
    let imageReference = storage.ref(props.image); 
    imageReference.delete().then( ()=> {
      console.log("Image deleted succesfully");  
        props.onProfileImageUpdated("");
    }) 
    .catch((err)=>console.log("Error ", err));

  }
  return (
    <div className="main-class">
      {isImageUploaded && (
        <ImageCropModal
          cancel={onImageCropCancelClicked}
          file={files}
          src={src}
          onProfileImageUpdated={props.onProfileImageUpdated}
          context={props.context}
          dspaceId={!!props.dspaceId ? props.dspaceId : ""}
        />
      )}
      <div className="image-upload-button">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="submit"
          onClick={uploadButtonClicked}
          style={props.buttonStyle ? props.buttonStyle : {}}
        >
          UPLOAD
        </Button>
        {!!props.image ? (
          <Button type="submit" variant="contained" color="secondary" onClick={deleteProfileImage}>
            DELETE
          </Button>
        ) : (
          <></>
        )}

        <input
          type="file"
          onChange={onImageUploaded}
          style={{ display: "none" }}
          ref={inputButtonReference}
        />
      </div>
    </div>
  );
};

export default ImageUploadComponent;
