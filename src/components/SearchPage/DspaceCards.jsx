import React, { Component } from 'react'
import DspaceCard from './DspaceCard'
import { Container, CircularProgress } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import './styles.css'; 
import {database} from '../../firebase/firebase.utils';

const dSpacesReference  =  database.collection('d-spaces'); 
let dSpacesInfo = [];

export class DspaceCards extends Component {  
    constructor(props){  
        super(props);
        this.state={ 
        dSpaces:[], 
        render:false
        } 
    }  
    async componentDidMount(){  
        const dSpaces =  await dSpacesReference.get(); 
        // dSpaces.docs.map(document => this.setState({ 
        //     dSpaces:[...this.state.dSpaces, document.data()]
        // })); 
        dSpaces.docs.map(document => dSpacesInfo.push(document.data()))
        .then(
            this.setState({ 
                render:true
            })
        )
        
    }
    render() {   
        console.log(this.state.dSpaces) 
        if(!this.state.render){ 
            return( 
                <CircularProgress color="secondary" />
            )
        } else { 
            return (
                <Container>   
                    <Row className="d-space-cards-display-row"> 
                {  
                    dSpacesInfo.forEach(dSpace => {  
                        return( 
                            <div className="d-space-card">  
                                <DspaceCard  
                                    className="d-space-card" 
                                    title = { dSpace.title }
                                    /> 
                            </div> 
                        )
                    })
                }
                    </Row>
                </Container>
            )
        }
        
    }
}

export default DspaceCards;
