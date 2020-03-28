import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import { Container, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

let dspace = {}
export class Dspaces extends Component {
    constructor(props){ 
        super(); 
        
    }  
    componentWillMount(props){  
        if(props)
        dspace = props.dSpaceObject;
    }
    render() { 
        return ( 
            <Container fluid>  
                <Row> 
                    <Col>
                        <Typography variant="h1">Python</Typography>
                    </Col>
                </Row> 
                <Row> 
                    <Col>  
                        <DspaceHeader dspace={dspace}/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}

export default Dspaces;
