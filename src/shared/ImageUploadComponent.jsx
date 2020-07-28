import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
const ImageWrapper = styled.div`
  height: 200px;
  width: 250px;
  margin: 15px;
`;
const reader = new FileReader();
const inputButtonReference = React.createRef();
export const ImageUploadComponent = (props) => {
  const [files, setfiles] = useState([]);
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
  }, [files]);

  const onImageUploaded = (event) => {
    setfiles(event.target.files[0]);
  };
  

  const uploadButtonClicked = () => {
    console.log("Upload Button Clicked");
    inputButtonReference.current.click();
  };
  return (
    <div>
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
  );
};

export default ImageUploadComponent;
