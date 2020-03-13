import React, { Component } from 'react';
import { Container, Typography, FormControl, TextField, MenuItem, Button, OutlinedInput, InputLabel } from '@material-ui/core';
import { Row } from 'react-bootstrap';

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
            isSelectedCategoryInValid:false
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

    isDspaceDataValid=()=>{

    }

    handleCreateDspace=(event)=>{ 
        if(this.isDspaceDataValid()){ 

        }
    }

    render() {
        return (
            <Container>
                <Typography variant="h1">New D-Space</Typography> 
                <Row>  
                    <FormControl>  
                    <FormControl fullWidth  variant="outlined">
                        <InputLabel>D-Space Title</InputLabel>
                        <OutlinedInput
                            id="dSpaceTitle"
                            value={this.state.dSpaceTitle}
                            onChange={this.handleChange}
                            labelWidth={60}
                        />
                    </FormControl>

                        <TextField 
                            label="D-Space Description" 
                            id="dSpaceDescription" 
                            placeholder="D-Space Description"
                            variant="outlined"
                            required   
                            multiline 
                            rows="4"
                            fullWidth
                            onChange={this.handleChange} 
                            value={this.state.dSpaceDescription || " "} 
                            error={this.state.isDspaceDescriptionInValid} 
                            helperText="D-Space Description should be atleast 100 characters"
                        />  

                        <TextField
                            id="dSpaceCategory"
                            select
                            label="D-Space Category"
                            helperText="Please select D-Space category"
                            className="new-post-form-field"  
                            onChange={this.handleCategorySelected}
                            value={this.state.postCategory} 
                            error={this.state.isSelectedCategoryInValid} 
                            >   
                            {dSpaceCategories.map(option => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}  
                        </TextField>  
                        
                        {/* Chip Component */ }

                    </FormControl>
                </Row> 
                <Button variant="outlined" color="primary" onClick={this.handleCreateDspace}>
                        Create D-Space
                </Button>
            </Container>
        )
    }
}

export default NewDspaceForm
