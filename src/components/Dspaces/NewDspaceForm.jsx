import React, { Component } from "react";
import {
  Container,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Input,
  InputAdornment,
  IconButton,
  Chip,
  CircularProgress,
  FormHelperText,
  ThemeProvider,
  Modal,
  Card,
  CardContent,
  Dialog,
  DialogTitle, Divider
} from "@material-ui/core";
import { Row } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../firebase/firebase.utils";
import "./style.css";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DspaceProfileImage from "./DspaceProfileImage";
import ImageUploadComponent from "../../shared/ImageUploadComponent";

const dSpaceCategories = [
  "Tech",
  "Enterainment",
  "College Life",
  "Career Advice",
  "MS",
  "MBA",
  "MTech",
  "Engineering",
];

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

const styles = (theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export class NewDspaceForm extends Component {
  classes;
  constructor(props) {
    super(props);
    this.state = {
      dSpaceTitle: "",
      dSpaceDescription: "",
      dSpaceCategory: [],
      dSpaceTags: [],
      isDspaceTitleInValid: false,
      isDspaceDescriptionInValid: false,
      isSelectedCategoryInValid: false,
      currentTag: "",
      onDspaceAdding: false,
      dSpaceCreatedSuccessfully: false,
      dSpaceAddingError: "",
      isAuthenticated: !!localStorage.getItem("currentUserInfo")
        .isAuthenticated,
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  isDspaceDataValid = () => {
    if (this.state.dSpaceTitle.length < 2) {
      this.setState({ isDspaceTitleInValid: true });
      return false;
    } else if (this.state.dSpaceDescription.length < 100) {
      this.setState({
        isDspaceTitleInValid: false,
        isDspaceDescriptionInValid: true,
      });
      return false;
    } else if (this.state.dSpaceCategory.length < 1) {
      this.setState({
        isDspaceTitleInValid: false,
        isDspaceDescriptionInValid: false,
        isSelectedCategoryInValid: true,
      });
      return false;
    } else {
      this.setState({
        isDspaceTitleInValid: false,
        isDspaceDescriptionInValid: false,
        isSelectedCategoryInValid: false,
      });
      return true;
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  getUserDetails = () => {
    const currentUserId = localStorage.getItem("currentUserId");
    let userData = database.collection("users").doc(currentUserId);
    let getDoc = userData
      .get()
      .then((doc) => {
        if (!doc.exists) {
          // console.log('No such document!');
        } else {
          this.setState({
            userDetails: doc.data(),
            isAuthenticated: !!doc.data().isAuthenticated,
          });
        }
      })
      .catch((err) => {
        // console.log('Error getting document', err);
      });
  };

  handleDspaceDescriptionChange = (event) => {
    if (event.target.value.length < 100) {
      this.setState({
        dSpaceDescription: event.target.value,
        isDspaceDescriptionInValid: true,
      });
    } else {
      this.setState({
        dSpaceDescription: event.target.value,
        isDspaceDescriptionInValid: false,
      });
    }
  };

  handleCategorySelected = (event) => {
    this.setState({
      dSpaceCategory: event.target.value,
    });
  };

  onAddTagClicked = () => {
    if (this.state.currentTag.length > 0)
      this.setState({
        dSpaceTags: [...this.state.dSpaceTags, this.state.currentTag],
        currentTag: "",
      });
  };

  handleCreateDspace = (event) => {
    if (this.isDspaceDataValid()) {
      this.addDspace();
      this.setState({
        onDspaceAdding: true,
      });
    }
  };

  handleModalClose = () => {
    console.log("Modal closed");
  };

  addDspace = () => {
    const newDspaceData = {
      title: this.state.dSpaceTitle,
      description: this.state.dSpaceDescription,
      Category: this.state.dSpaceCategory,
      tags: this.state.dSpaceTags,
      members: [],
      posts: [],
    };
    database
      .collection("d-spaces")
      .add(newDspaceData)
      .then((docRef) => {
        this.setState({ dSpaceCreatedSuccessfully: true });
      })
      .catch((err) => {
        this.setState({
          dSpaceAddingError:
            "Oof! there was an error! Please try posting after some time",
          onDspaceAdding: false,
        });
      });
  };

  render() {
    if (this.state.dSpaceCreatedSuccessfully) {
      return (
        <Redirect
          to={{
            pathname: "/data-updated",
            state: { message: "D-Space Created Successfully!" },
          }}
        />
      );
    } else {
      return (
        <Container
          className={this.state.isAuthenticated ? "" : "display-inactive"}
        >
          <Typography variant="h1">New D-Space</Typography>
          <Row className="new-dspace-form">
            <FormControl style={{ margin: 10 }}>
              <InputLabel variant="outlined" className="input-label">
                D-Space Name
              </InputLabel>
              <OutlinedInput
                id="dSpaceTitle"
                value={this.state.dSpaceTitle}
                onChange={this.handleChange}
                labelWidth={60}
                error={this.state.isDspaceTitleInValid}
                required={true}
              />
              {this.state.isDspaceTitleInValid && (
                <FormHelperText error={true}>
                  Title should be of minimum 4 characters
                </FormHelperText>
              )}
            </FormControl>

            <FormControl style={{ margin: 10 }}>
              <InputLabel variant="outlined" className="input-label">
                D-Space Description
              </InputLabel>
              <OutlinedInput
                id="dSpaceDescription"
                value={this.state.dSpaceDescription}
                onChange={this.handleDspaceDescriptionChange}
                labelWidth={60}
                multiline
                rows="5"
              />
              {this.state.isDspaceDescriptionInValid && (
                <FormHelperText error={true}>
                  Description should be minimum 100 characters
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="uploadIcon">
              <FormLabel className="uploadIcon--heading">
                Upload D-Space Icon
              </FormLabel>

              <DspaceProfileImage />
              <ImageUploadComponent  context="dspace" buttonStyle={{margin:'15px'}} id="uploadIcon--button" />
            </FormControl> 

            <Divider/>

            <div className="checkbox-section">
              <FormLabel>Select Your D-Space Category</FormLabel>
              <FormGroup>
                {dSpaceCategories.map((dspaceCategory) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={dspaceCategory}
                        onChange={this.handleCategorySelected}
                      />
                    }
                    label={dspaceCategory}
                  />
                ))}
                {this.state.isSelectedCategoryInValid && (
                  <FormHelperText error={true}>
                    Select atleast one category
                  </FormHelperText>
                )}
              </FormGroup>
            </div>

            <div className="dspace-tags-div">
              <FormControl style={{ margin: 10 }}>
                <InputLabel>Enter Tags that describe your D-Space </InputLabel>
                <Input
                  id="currentTag"
                  value={this.state.currentTag}
                  onChange={this.handleChange}
                  fullWidth="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Add D-Space Tag"
                        onClick={this.onAddTagClicked}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className="tags">
                {this.state.dSpaceTags.map((eachTag) => (
                  <Chip
                    variant="outlined"
                    color="primary"
                    label={eachTag}
                    size="small"
                    className="tag"
                  />
                ))}
              </div>
            </div>
          </Row>
          {this.state.onDspaceAdding ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleCreateDspace}
            >
              Create D-Space
            </Button>
          )}

          <Typography color="error">{this.state.dSpaceAddingError}</Typography>
          <Dialog
            open={!this.state.isAuthenticated}
            onClose={this.handleModalClose}
            fullScreen={false}
          >
            <DialogTitle>Account Approval Pending</DialogTitle>
            <Card className="modal-card">
              <CardContent>
                <Typography>
                  Your Account is yet to be approved by the Admin
                </Typography>
                <Typography variant="caption">
                  For more information regarding your account contact
                  admin@disha.website
                </Typography>
              </CardContent>
            </Card>
          </Dialog>
        </Container>
      );
    }
  }
}

NewDspaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewDspaceForm);
