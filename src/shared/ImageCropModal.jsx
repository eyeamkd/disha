import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@material-ui/core"; 
import { storageRef, database } from "../firebase/firebase.utils";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ImageCropModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [imageRef, setImageRef] = useState("");
  const [file, setFile] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    // this.setState({ crop });
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        props.file.name
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      resolve(canvas.toDataURL("image/jpeg"));
    });
  };

  const uploadCroppedImage = () => {
    fetch(src)
      .then((res) => res.blob)
      .then((blob) => {
        const file = new File([blob], props.file.name, { type: "image/png" });
        setFile(file);
        storeImageOnFireStore(file);
      });
  };

  const storeImageOnFireStore = (file) => {
    let userRollNumber = JSON.parse(localStorage.getItem("currentUserInfo"))
      .rollNumber;
    //dangerous if user deletes the localstorage and uploads the image
    let userProfileImageStorageReference = storageRef.child(
      `profile-images/${userRollNumber}-${file.name}`
    );
    userProfileImageStorageReference.put(file).then((snapshot) => {
      console.log("Uploaded Snapshot ", snapshot);
      if (snapshot.state === "success") {
        let userDocRef = database
          .collection("users")
          .doc(localStorage.getItem("currentUserId"));
        userDocRef
          .update({ profileImagePath: snapshot.metadata.fullPath })
          .then((res) => {
            console.log("Image Uploaded Successfully!!", res);
          });
      }
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Crop Image</h2>
      <p id="simple-modal-description">Resize image to Crop</p>
      <ReactCrop
        src={props.src}
        crop={crop}
        ruleOfThirds
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
      />
      {croppedImageUrl && (
        <div>
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
          <Button onClick={uploadCroppedImage}>Set as Profile Image</Button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
