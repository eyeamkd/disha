import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import "./styles.css";


export class DspaceCard extends Component { 
    constructor(props){ 
        super();

    }
    render() {   
        // console.log(this.props);
        return (   
                <Box  
                boxShadow={2}
                borderColor="primary"
                borderRadius={16}
                style={{ 
                    margin: '0.5rem',
                }}
                >  
                    <Card  
                    variant="outlined"
                    style={{ 
                        width: '18rem',
                        minHeight: '12rem',
                        border: '1px solid #f57f17'

                    }}
                    className="grow"
                    >  
                        <CardContent>  
                            <center><h4>{this.props.title}</h4></center>
                            <Typography>{this.props.description}</Typography>
                        </CardContent>
                    </Card>
                </Box>
        )
    }
}

export default DspaceCard;
