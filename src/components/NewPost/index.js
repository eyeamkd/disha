import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Typography, FormControl, TextField, MenuItem } from '@material-ui/core';
import { Row } from 'react-bootstrap'; 

const postCategories = [
    "Internship",
    "Project",
    "Announcement"
] 

const dspaces = [ ] 


export class NewPost extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Typography>New Post</Typography>
                </Row> 
                <Row>
                    <FormControl>
                        <TextField  
                            label="New Post"  
                            id="new-post"
                            placeholder="Post Title" 
                            variant = "outlined"
                            required 
                        /> 
                        <TextField  
                            label="Description"  
                            id="post-description"
                            placeholder="Description" 
                            variant = "outlined"
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
                    </FormControl>
                </Row>
            </Container>
        )
    }
}

export default NewPost
