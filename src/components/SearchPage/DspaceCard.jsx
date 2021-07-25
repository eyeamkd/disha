import React, { Component } from 'react';
import { Card, CardContent, Typography, Box, CardHeader } from '@material-ui/core';  
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { borderColor } from '@material-ui/system';
import { Link } from 'react-router-dom';
import Dspace from '../Dspace';

import "./styles.css"; 
import DspaceProfileImage from '../Dspace/DspaceProfileImage/index';
import { CardFooter } from 'reactstrap';


export class DspaceCard extends Component { 
    constructor(props){ 
        super();

    }
    render() {   
        // console.log(this.props);
        return (   
                <Box  
                boxShadow={2}
                borderColor={'yellow'}
                borderRadius={16}
                style={{ 
                    margin: '0.5rem', 
                    border: '1px solid #f57f17'
                }}
                >  
                <Container style={{display:'flex', justifyContent:'center'}}>
                <DspaceProfileImage imageSrc={this.props.imageSrc}/>
                </Container>  
                    <Card  
                    variant="outlined"
                    style={{ 
                        width: '18rem',
                        height: '12rem',   
                        borderRadius:'16px'
                    }}
                    > 
                    <CardHeader title={<Typography variant="h6" align="center" style={{fontWeight:'300'}} >{this.props.title}</Typography>}/> 
                        <CardContent style={{ overflow:'scroll', height:'6rem', padding:'10px'}} >  
                            <Typography>{this.props.description}</Typography>
                        </CardContent> 
                    </Card>
                </Box>
        )
    }
}

export default DspaceCard;
