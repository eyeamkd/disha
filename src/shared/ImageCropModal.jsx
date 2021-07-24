import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Typography } from "@material-ui/core";
import { storage, database,storeImageInFireStore } from "../firebase/firebase.utils";
import { getImageStoragePath} from "../utils/Functions";
import { FIREBASE_STORAGE_FOLDERNAMES } from "../shared/constants";

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
  const [open, setOpen] = useState(true);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({
    unit: "px",
    height: "50",
    width: "50",
    aspect: 1,
  });
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
    let blob = dataURItoBlob(src);
    let file = new File([blob], props.file.name, { type: "image/jpeg" });
    storeImageOnFireStore(file);
    setOpen(false);
  };

  const onCropCancelledClicked = () => {
    handleClose();
    props.cancel();
  };

  const dataURItoBlob = () => {
    let dataURI = croppedImageUrl;
    debugger;
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  const storeImageOnFireStore = (file) => {
   // deleteProfileImageIfPresent(); commenting because of a bug 
    if (props.context === "user") {
      let userRollNumber = JSON.parse(localStorage.getItem("currentUserInfo"))
        .rollNumber;
      //dangerous if user deletes the localstorage and uploads the image
      let imagePath = getImageStoragePath(
        FIREBASE_STORAGE_FOLDERNAMES.profileImage,
        userRollNumber,
        file.name
      ); //check for blank file
      storeImageInFireStore(file, imagePath).then((snapshot) => {
        console.log("Uploaded Snapshot ", snapshot); 
        props.onProfileImageUpdated(snapshot.metadata.fullPath);
      });
    } else if (props.context === "dspace") {
      let dspaceId = props.dspaceId;
      //dangerous if user deletes the localstorage and uploads the image
      let imagePath = getImageStoragePath(
        FIREBASE_STORAGE_FOLDERNAMES.dSpaceProfileImage,
        dspaceId,
        file.name
      );
      storeImageOnFireStore(file, imagePath).then((snapshot) => {
        console.log("Uploaded Snapshot ", snapshot);
        if (snapshot.state === "success") {
          let dspaceDocRef = database.collection("d-spaces").doc(dspaceId);
          dspaceDocRef
            .update({ profileImagePath: snapshot.metadata.fullPath })
            .then((res) => {
              console.log("Image Uploaded Successfully!!", res);
              props.onProfileImageUpdated(snapshot.metadata.fullPath);
            });
        }
      });
    }
  };

  const deleteProfileImageIfPresent = () => {
    //need to update the userInfo whenever update is called in the code
    let userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    if (!!(userInfo.profileImagePath.length>1)) {
      let deleteRef = storage.ref(userInfo.profileImagePath);
      return deleteRef
        .delete()
        .then(() => {
          return true;
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const body = (
    <div
      style={modalStyle}
      className={`${classes.paper} crop-image-modal-style `} 
    >
      <Typography variant="h3" id="simple-modal-title">Crop Image</Typography>
      <ReactCrop
        src={props.src}
        crop={crop}
        ruleOfThirds
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
        maxHeight="300"
        maxWidth="300"
      />
      {croppedImageUrl && (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
          <Button variant="contained" color="secondary" onClick={uploadCroppedImage}>Set as Profile Image</Button>
          <Button variant="contained" color="secondary" onClick={onCropCancelledClicked}>Cancel</Button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description" 
      style={{marginTop:'10vh',marginLeft:'41%', marginRight:'30%'}}
       
      >
        {body}
      </Modal>
    </div>
  );
}
