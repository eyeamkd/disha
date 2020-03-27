import React, { Component } from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';  
import { BrowserRouter as Router, Route } from "react-router-dom";
import { borderColor } from '@material-ui/system';
import { Link } from 'react-router-dom';
import Dspaces from '../Dspaces';

export class DspaceCard extends Component { 
    constructor(props){ 
        super();

    }
    render() {   
        console.log(this.props);
        return (   
                <Box  
                    boxShadow={2}
                    border={1} 
                    borderColor="primary"
                    borderRadius={16}
                    >  
                    <Card  
                    variant="outlined"
                    >  
                        <CardContent>  
                            <Typography>{this.props.title}</Typography>
                        </CardContent>
                    </Card>
                </Box>
        )
    }
}

export default DspaceCard;
