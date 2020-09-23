import { Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import React, {Component} from 'react'; 
import AddIcon from '@material-ui/icons/Add';  
import './style.css';

// import {DropzoneArea} from 'material-ui-dropzone'
 
const DspaceEditModal = (props) => { 
  const handleChange=()=>{
      console.log("Inside Handle Change");
  }  

  const handleSave = () =>{
    console.log("Save Clicked");
  }

  const {title, description, imageRef } = props;
  return( 
   <Container>
     <Typography variant="h6" style={{textAlign:'center'}}>Edit D-Space</Typography> 
     <Grid container direction="column" justify="center" alignItems="center" spacing="3">  
     <Grid item>
     <FormControl>  
     <InputLabel variant="outlined" className="input-label" > 
                                D-Space Name 
                            </InputLabel>
                                <OutlinedInput
                                    id="dSpaceTitle" 
                                    value={title}
                                    labelWidth={60} 
                                    required={true}
                                />   
      </FormControl> 
     </Grid>  

     <Grid item>
      <FormControl> 
      <InputLabel variant="outlined" className="input-label" > 
                                D-Space Description 
                            </InputLabel>
                                <OutlinedInput
                                    id="dSpaceDescription" 
                                    value={description}
                                    labelWidth={60} 
                                    required={true} 
                                    multiline
                                />  
                              
     </FormControl> 
     </Grid> 
     </Grid> 
     <Button variant="outlined" color="primary" onClick={handleSave}>
                            Save 
                    </Button>
   </Container>
  ); 
}
 
export default DspaceEditModal;