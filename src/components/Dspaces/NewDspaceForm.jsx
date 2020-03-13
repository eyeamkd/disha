import React, { Component } from 'react';
import { Container, Typography, FormControl, Button, OutlinedInput, InputLabel, Checkbox, FormControlLabel, FormLabel, FormGroup, Input, InputAdornment, IconButton, Chip } from '@material-ui/core';
import { Row } from 'react-bootstrap';  
import AddIcon from '@material-ui/icons/Add';
import './style.css';

const dSpaceCategories = [ 
                            "Tech",  
                            "Enterainment", 
                            "College Life",  
                            "Carrer Advice", 
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
            dSpaceCategory:'',
            dSpaceTags:[],
            isDspaceTitleInValid:false, 
            isDspaceDescriptionInValid:false,
            isSelectedCategoryInValid:false, 
            currentTag:''
        }
    }  

    handleChange=(event)=>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }  

    handleCategorySelected=(event)=>{
        this.setState({
            dSpaceCategory:event.target.value
        })
    }  

    onAddTagClicked=()=>{
        this.setState({ 
            dSpaceTags:[...this.state.dSpaceTags,this.state.currentTag],
            currentTag:''
        })
    }

    handleCreateDspace=(event)=>{ 
        if(this.isDspaceDataValid()){ 

        }
    }

    render() {
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
                            />   
                    </FormControl> 

                    <FormControl style={{margin:10}}>  
                    <InputLabel variant="outlined" className="input-label" > 
                            D-Space Description
                        </InputLabel>
                            <OutlinedInput
                                id="dSpaceTitle" 
                                key={this.state.dSpaceTitle} 
                                value={this.state.dSpaceTitle}
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
                <Button variant="outlined" color="primary" onClick={this.handleCreateDspace}>
                        Create D-Space
                </Button>
            </Container>
        )
    }
}

export default NewDspaceForm
