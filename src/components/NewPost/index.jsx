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
    Button,
    CircularProgress
} from "@material-ui/core";
import { Row } from "react-bootstrap"; 
import {database} from '../../firebase/firebase.utils';
import "./style.css";
import { Redirect } from "react-router-dom";

const postCategories = ["Internship", "Project", "Announcement"];

const dspaces = ["d-space1","d-space2","d-space3"];

export class NewPost extends Component {    

constructor(props){  
    super(props);
    this.state={ 
        postTitle:'',  
        isPostTitleInValid:false,
        postDescription:'',  
        isPostDescriptionInValid:false,
        postCategory:'',  
        onDataSubmitting:false,
        isSelectedCategoryInValid:false, 
        dataSubmittedSuccessfully:false, 
        dataSubmittingError:'',
        dSpaces:[]
    }
}

isFormDataValid=()=>{ 
    console.log("in form validation");
    if(this.state.postTitle.length<10){ 
        this.setState({isPostTitleInValid:true}); 
        return false;
    }else if(this.state.postDescription.length<100) { 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:true 
        }); 
        return false;
    }else if(this.state.postCategory.length<2){ 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:false,
            isSelectedCategoryInValid:true 
        }); 
        return false;
    }else { 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:false,
            isSelectedCategoryInValid:true 
        }); 
        return true;
    }
}

handleChange=(event)=>{  
    this.setState({
        [event.target.id]:event.target.value
    })
} 

handleCategorySelected=(event)=>{
    this.setState({
        postCategory:event.target.value
    })
} 

handleDSpaceSelected=(event)=>{
    this.setState({ 
        dSpaces:[...this.state.dSpaces,event.target.value]
    })
} 

handleSubmit=()=>{ 
    if(this.isFormDataValid()){  
        this.postData();
        this.setState({ 
            onDataSubmitting:true
        })
    } 
}  

postData = () => { 
    const newPostData = { 
        title:this.state.postTitle, 
        description:this.state.postDescription, 
        category:this.state.postCategory, 
        dSpaces:this.state.dSpaces
    }
    database.collection('posts').add(newPostData)
    .then((docRef)=>{this.setState({dataSubmittedSuccessfully:true})}) 
    .catch(err=>{this.setState({ 
        dataSubmittingError:'Oof there was an error! Please try posting after some time',
        onDataSubmitting:false
    })})
}

    render() {  
        console.log(this.state); 
        if(this.state.dataSubmittedSuccessfully){  
            return(<Redirect to="/post-submitted"/>);
        }else{ 
            return ( 
                <Container> 
                    <Typography variant="h1">New Post</Typography>
                    <Row className="form-div"> 
                        <FormControl > 
                                <TextField
                                label="Post Title"
                                id="postTitle"
                                placeholder="Post Title"
                                variant="outlined"
                                required 
                                onChange={this.handleChange} 
                                value={this.state.postTitle || " "} 
                                error={this.state.isPostTitleInValid} 
                                helperText="Post Title should be minium 10 characters"
                                /> 
        
                                <TextField
                                label="Description"
                                id="postDescription"
                                placeholder="Description"
                                variant="outlined"
                                required
                                multiline
                                rows="10"
                                onChange={this.handleChange} 
                                value={this.state.postDescription || " "} 
                                error={this.state.isPostDescriptionInValid} 
                                helperText="Post Description should be minium 100 characters"
                                /> 
        
                                <TextField
                                id="postCategory"
                                select
                                label="Category"
                                helperText="Please select post category"
                                className="new-post-form-field"  
                                onChange={this.handleCategorySelected}
                                value={this.state.postCategory} 
                                error={this.state.isSelectedCategoryInValid} 
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
                                                        onChange={this.handleDSpaceSelected}
                                                    />
                                                } 
                                                label={dspaceName}
                                            />
                                        ))} 
                                    </FormGroup> 
                                </div>  
        
                        </FormControl> 
                    </Row>   
                    {this.state.onDataSubmitting 
                    ? 
                    <CircularProgress color="primary" />  
                    :
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button> 
                    } 
                    
                        <Typography color="error">{this.state.dataSubmittingError}</Typography>
                    
                </Container>
                );
        }
        
    }
}

export default NewPost;
