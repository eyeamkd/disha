import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import React, { Component, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { ImageUploadComponent } from "../../shared/ImageUploadComponent";
import "./style.css";
import DspaceProfileImage from "../Dspaces/DspaceProfileImage";

// import {DropzoneArea} from 'material-ui-dropzone'

const DspaceEditModal = (props) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadImageString, setUploadImageString] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const handleChange = () => {
    console.log("Inside Handle Change");
  };

  const handleSave = () => {
    console.log("Save Clicked");
  };

  const { title, description, imageRef } = props;
  const handleImageUpload = (base64string) => {
    setUploadImageString(base64string);
    console.log("Base 64 string after uploading image ", base64string);
    setImageUploaded(true);
  };
  const onProfileImageUpdated = (updatedImageUrl) => {
    setProfileUrl(updatedImageUrl);
    console.log("Updated Image URL is ", updatedImageUrl);
  };
  return (
    <Container>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Edit D-Space
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing="3"
      >
        <Grid item>
          <FormControl>
            <InputLabel variant="outlined" className="input-label">
              D-Space Name
            </InputLabel>
            <OutlinedInput
              id="dSpaceTitle"
              value={title}
              labelWidth={60}
              required={true}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <InputLabel variant="outlined" className="input-label">
              D-Space Description
            </InputLabel>
            <OutlinedInput
              id="dSpaceDescription"
              value={description}
              labelWidth={60}
              required={true}
              multiline
            />
          </FormControl>
        </Grid>
        <Grid item>
          <DspaceProfileImage />
          <ImageUploadComponent
            onImageUpload={handleImageUpload}
            onProfileImageUpdated={onProfileImageUpdated}
            context="dspace" 
            dspaceId={props.dspaceId}
          />
        </Grid>
      </Grid>
      <Button variant="outlined" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Container>
  );
};

export default DspaceEditModal;
