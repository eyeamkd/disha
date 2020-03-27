import React, { Component } from 'react'
import  { SearchBar } from './SearchBar'
import { Container, Row, Col } from 'react-bootstrap'
import './styles.css';
import DspaceCards from './DspaceCards'; 
import { Box } from '@material-ui/core';

export class SearchPage extends Component {
    render() {
        return (
            <Container>
                <Row className="search-bar">  
                    <Col> 
                        <Box  
                            boxShadow={2}
                            >
                            <SearchBar/>
                        </Box>
                    </Col>
                </Row> 

                <Row className="d-space-cards-display">
                    <Col>
                        <DspaceCards/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchPage;
