import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import { Container, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

export class Dspaces extends Component {
    render() {
        return ( 
            <Container fluid>  
                <Row> 
                    <Col>
                        <Typography variant="h1">D-Space Title</Typography>
                    </Col>
                </Row> 
                <Row> 
                    <Col>  
                        <DspaceHeader/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}

export default Dspaces;
