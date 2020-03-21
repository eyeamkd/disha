import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import { Container, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

export class Dspaces extends Component {
    render() {
<<<<<<< HEAD
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
            
=======
        return (
            <div>
                <h1>D-Space Header</h1>
            </div>
>>>>>>> 7c5262b54ba71e4b699146397c6549ca817e3cbe
        )
    }
}

export default Dspaces;
