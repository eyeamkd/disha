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
            isDspaceTagsInValid:false, 
            onDspaceAdding:false, 
            currentTag: "",
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
        }else if(this.state.dSpaceCategory.length<1){ 
            this.setState({  
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:false,
                isSelectedCategoryInValid:true 
            }); 
            return false;
        }else if(this.state.dSpaceTags.length<2){ 
            console.log("tags true");
            this.setState({  
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:false,
                isSelectedCategoryInValid:false,
                isDspaceTagsInValid:true
            }); 
            return false;
        }else { 
            this.setState({ 
                isDspaceTitleInValid:false,
                isDspaceDescriptionInValid:false,
                isSelectedCategoryInValid:false,
                isDspaceTagsInValid:false
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
           dSpaceCategory:[...this.state.dSpaceCategory,event.target.value]
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
        tags:this.state.dSpaceTags, 
        userId: localStorage.getItem('currentUserId')
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
            return(<Redirect to="/d-space-submitted"/>);
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
                                    onChange={this.handleChange} 
                                    value={this.state.dSpaceTitle}
                                    labelWidth={60} 
                                    error={this.state.isDspaceTitleInValid} 
                                    required={true}
                                /> 
                                {this.state.isDspaceTitleInValid&&  
                                    <FormHelperText error={true}>Title Should be of Minimum 4 Chacters</FormHelperText>   
                                } 
                        </FormControl> 
    
                        <FormControl style={{margin:10}}>  
                        <InputLabel variant="outlined" className="input-label" > 
                                D-Space Description
                            </InputLabel>
                                <OutlinedInput
                                    id="dSpaceDescription" 
                                    value={this.state.dSpaceDescription}
                                    onChange={this.handleChange}
                                    labelWidth={60} 
                                    multiline 
                                    rows="5"
                                /> 
                                {this.state.isDspaceDescriptionInValid&&  
                                    <FormHelperText error={true}>Description Should be of Minimum 100 Characters</FormHelperText>   
                                }    
                        </FormControl> 
    
                        <div className="checkbox-section">  
                            <FormLabel>Select Your D-Space Category</FormLabel> 
                                <FormGroup>
                                    {dSpaceCategories.map(category => ( 
                                        <FormControlLabel 
                                            control={ 
                                                <Checkbox 
                                                    value={category}  
                                                    onChange={this.handleCategorySelected}
                                                />
                                                    } 
                                                    label={category}
                                                />
                                ))} 
                                {this.state.isSelectedCategoryInValid&&  
                                    <FormHelperText error={true}>Please Select at least one category</FormHelperText>   
                                }  
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
                                    onKeyUp={(event)=>{ 
                                        if(event.key==="Enter"){ 
                                            this.onAddTagClicked();
                                        }
                                    }} 
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
                                {this.state.isDspaceTagsInValid&&  
                                    <FormHelperText error={true}>tags help people to discover your D-space please enter atleast two</FormHelperText>   
                                }  
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
