import React, { Component } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export class DspaceCard extends Component { 
    constructor(props){ 
        super();

    }
    render() {  
        console.log("rendering");
        return ( 
            <Card  
                variant="outlined"
                >  
                <CardContent>  
                    <Typography>{this.props.title}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default DspaceCard;
