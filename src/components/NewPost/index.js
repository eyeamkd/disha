import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
    Typography,
    FormControl,
    TextField,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormLabel,
    Button
} from "@material-ui/core";
import { Row } from "react-bootstrap";
import "./style.css";

const postCategories = ["Internship", "Project", "Announcement"];

const dspaces = ["d-space1","d-space2","d-space3"];

export class NewPost extends Component {
    render() {
        return (
        <Container>
            <Typography variant="h1">New Post</Typography>
            <Row className="form-div">
                <FormControl > 
                        <TextField
                        label="New Post"
                        id="new-post"
                        placeholder="Post Title"
                        variant="outlined"
                        required
                        /> 

                        <TextField
                        label="Description"
                        id="post-description"
                        placeholder="Description"
                        variant="outlined"
                        required
                        multiline
                        rows="10"
                        
                        /> 

                        <TextField
                        id="select-category"
                        select
                        label="Category"
                        helperText="Please select post category"
                        className="new-post-form-field"
                        > 
                        {postCategories.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))} 
                        </TextField>  
                        
                        <div className="checkbox-section">  
                            <FormLabel>Select D-Spaces in which you want this post to appear</FormLabel> 
                            <FormGroup>
                                {dspaces.map(dspaceName => ( 
                                    <FormControlLabel 
                                        control={ 
                                            <Checkbox 
                                                value={dspaceName} 
                                            />
                                        } 
                                        label={dspaceName}
                                    />
                                ))} 
                            </FormGroup> 
                        </div>
                </FormControl>
            </Row>  

            <Button variant="outlined" color="primary" href="#">
                Submit
            </Button>
        </Container>
        );
    }
}

export default NewPost;
