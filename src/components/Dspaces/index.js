import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import { Container, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap'; 


let dSpace = {}
export class Dspaces extends Component {
    constructor(props){ 
        super(); 
        
    }  
    componentWillMount(){  
        if(!!this.props.location.state ){ 
            dSpace = this.props.location.state.dSpaceInfo.dSpace;
        }
    } 

    componentDidMount(  ){ 
        
        
    }
    render() {   
        console.log(this.props)
        return ( 
            <Container fluid>  
                <Row> 
                    <Col>
                        <Typography variant="h1">{dSpace.title}</Typography>
                    </Col>
                </Row> 
                <Row> 
                    <Col>  
                        <DspaceHeader dspace={dSpace}/>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}

export default Dspaces;
