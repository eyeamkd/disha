import React, { Component } from 'react'
import  SearchBar  from './SearchBar'
import { Container, Row, Col } from 'react-bootstrap'
import './styles.css';
import DspaceCards from './DspaceCards'; 
import { Box } from '@material-ui/core'; 
import { connect } from 'react-redux';


export class SearchPage extends Component {
    render() {
        return (
            <Container>
                <Row className="search-bar">  
                    <Col> 
                        <Box  
                            boxShadow={2}
                            >
                            <SearchBar placeholder="Search D-Spaces"/>
                        </Box>
                    </Col>
                </Row> 
                <Row className="d-space-cards-display">
                    <Col>
                        <DspaceCards searchValue={this.props.searchValue}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => { 
    console.log("State Updated!!", state);
   return {searchValue : state.dSpaceSearch.searchValue}
}

export default connect(mapStateToProps)(SearchPage);