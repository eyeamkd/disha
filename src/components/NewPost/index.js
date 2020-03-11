import React, { Component } from "react";
import { Container, FormGroup,  } from "react-bootstrap";
import {
    Typography,
    FormControl,
    TextField,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button
} from "@material-ui/core";
import { Row } from "react-bootstrap";

const postCategories = ["Internship", "Project", "Announcement"];

const dspaces = ["DSpace-1", "DSpace-2", "DSpace-3"];

export class NewPost extends Component {
    render() {
        return (
        <Container>
            <Row>
            <Typography variant="h1"> 
                New Post 
            </Typography>
            </Row>
            <Row>
            <FormControl>
                <TextField
                label="Post Title"
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
                >
                {postCategories.map(option => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </TextField>
                <FormGroup>
                {dspaces.map(dspace => (
                    <FormControlLabel
                    label={dspace}
                    control={<Checkbox value={dspace}>{dspace}</Checkbox>}
                    />
                ))}
                </FormGroup>
            </FormControl>
            </Row>  
            <Button  
                variant="outlined" 
                color="primary"
            >  
                Submit Post
            </Button>
        </Container>
        );
    }
}

export default NewPost;
