import React, { Component } from 'react';
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
    FormHelperText} from '@material-ui/core';
import { Row } from 'react-bootstrap';  
import AddIcon from '@material-ui/icons/Add'; 
import {database} from '../../firebase/firebase.utils';
import './style.css';
import { Redirect } from 'react-router-dom';

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

export class NewDspaceForm extends Component {   

constructor(props){ 
        super(props); 
        this.state={ 
            dSpaceTitle:'', 
            dSpaceDescription:'', 
            dSpaceCategory:[],
            dSpaceTags:[],
            isDspaceTitleInValid:false, 
            isDspaceDescriptionInValid:false,
            isSelectedCategoryInValid:false, 
            currentTag:'', 
            onDspaceAdding:false, 
            dSpaceCreatedSuccessfully:false, 
            dSpaceAddingError:'', 
        }
} 
    
isDspaceDataValid = () => {  
        if(this.state.dSpaceTitle.length<2){ 
            this.setState({isDspaceTitleInValid:true}); 
            return false;
        }else if(this.state.dSpaceDescription.length<100) { 
            this.setState({  
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:true 
            }); 
            return false;
        }else if(this.state.dSpaceCategory.length<2){ 
            this.setState({  
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:false,
                isSelectedCategoryInValid:true 
            }); 
            return false;
        }else { 
            this.setState({  
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:false,
                isSelectedCategoryInValid:true 
            }); 
            return true;
        }
}

handleChange = (event) => {
        this.setState({
            [event.target.id]:event.target.value
        })
}  

handleCategorySelected = (event) => {
        this.setState({
            dSpaceCategory:event.target.value
        })
}  

onAddTagClicked = () => {
    if(this.state.currentTag.length > 0)
        this.setState({ 
            dSpaceTags:[...this.state.dSpaceTags,this.state.currentTag],
            currentTag:''
        })
}

handleCreateDspace = (event) => { 
        if(this.isDspaceDataValid()){ 
            this.addDspace(); 
            this.setState({ 
                onDspaceAdding:true
            })
        }
} 

addDspace = () => {  
    const newDspaceData = { 
        title:this.state.dSpaceTitle,
        description:this.state.dSpaceDescription, 
        Category:this.state.dSpaceCategory, 
        tags:this.state.dSpaceTags
    }
    database.collection('d-spaces').add(newDspaceData)
    .then((docRef)=>{this.setState({dSpaceCreatedSuccessfully:true})}) 
    .catch(err=>{this.setState({ 
        dSpaceAddingError:'Oof! there was an error! Please try posting after some time', 
        onDspaceAdding:false
    })})
}

    render() { 
        if(this.state.dSpaceCreatedSuccessfully){ 
            return(<Redirect to="/post-submitted"/>);
        }else{  
            return (
                <Container>
                    <Typography variant="h1">New D-Space</Typography> 
                    <Row className="new-dspace-form">  
                        <FormControl style={{margin:10}} >   
                            <InputLabel variant="outlined" className="input-label" > 
                                DSpace Name 
                            </InputLabel>
                                <OutlinedInput
                                    id="dSpaceTitle" 
                                    key={this.state.dSpaceTitle} 
                                    value={this.state.dSpaceTitle}
                                    onChange={this.handleChange}
                                    labelWidth={60} 
                                    error={this.state.isDspaceTitleInValid} 
                                />   
                                    required={true}
                                /> 
                                {this.state.isDspaceTitleInValid&&  
                                    <FormHelperText error={true}>Title should be of minimum 4 characters</FormHelperText>   
                                } 
                        </FormControl> 
    
                        <FormControl style={{margin:10}}>  
                        <InputLabel variant="outlined" className="input-label" > 
                                D-Space Description
                            </InputLabel>
                                <OutlinedInput
                                    id="dSpaceDescription" 
                                    key={this.state.dSpaceDescription} 
                                    value={this.state.dSpaceDescription}
                                    onChange={this.handleChange}
                                    labelWidth={60} 
                                    multiline 
                                    rows="5"
                                />   
                        </FormControl> 
    
                        <div className="checkbox-section">  
                            <FormLabel>Select Your D-Space Category</FormLabel> 
                                <FormGroup>
                                    {dSpaceCategories.map(dspaceCategory => ( 
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
                            </FormGroup> 
                        </div>   
    
                        <div className="dspace-tags-div">
                        <FormControl style={{margin:10}}>
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
                                            <AddIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                        </FormControl>  
                        <div className="tags">
                            { 
                                this.state.dSpaceTags.map(eachTag=>( 
                                    <Chip 
                                        variant="outlined"  
                                        color="primary"  
                                        label={eachTag} 
                                        size="small" 
                                        className="tag"
                                    />
                                ))
                            } 
                        </div>
                        </div> 
                    </Row>  
                    {  this.state.onDspaceAdding 
                        ? 
                    <CircularProgress color="primary" />  
                        : 
                    <Button variant="outlined" color="primary" onClick={this.handleCreateDspace}>
                            Create D-Space
                    </Button>
                    }  

                    <Typography color="error">{this.state.dSpaceAddingError}</Typography> 

                </Container>
            )
        }
        
    }
}

export default NewDspaceForm
