import React, { Component } from 'react'; 
import SearchBar from '../SearchPage/SearchBar';
import { Typography, Box } from '@material-ui/core';
import { Row, Col, Container } from 'reactstrap'; 
import '../SearchPage/styles.css';
import { connect } from 'react-redux';
import DspaceCards from '../SearchPage/DspaceCards';
import UserCards from './UserCards';
import Filter from './Filter';
export class Community extends Component {
    state = {
        filterValues: [],
    }

    setFilterValues = (filterValues) => {
        // this.setState({filterValues: filterValues});
        console.log(filterValues);
        this.changeFilter(filterValues);
    }

    changeFilter = (filterValues) => {
        this.setState({filterValues: filterValues});
    }

    render() {
        return ( 
            <Container> 
                <Typography variant="h1" style={{margin:'30px'}}>Your Community</Typography>
                <Row className="search-bar">  
                    <Col md={10}> 
                        <Box  
                            boxShadow={2}
                            >
                            <SearchBar placeholder="Search Your Community"/>
                        </Box>
                    </Col>
                    <Col md={2}>
                    <Filter setFilterValues={this.setFilterValues}/>
                    </Col>
                </Row> 
                <Row className="d-space-cards-display">
                    <Col>
                        <UserCards searchValue={this.props.searchValue} filterValues={this.state.filterValues}/>
                    </Col>
                </Row> 
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    searchValue : state.dSpaceSearch.searchValue //can act also as user search
})

export default connect(mapStateToProps)(Community);
