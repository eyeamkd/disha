import React, { Component } from 'react'
import DspaceCard from './DspaceCard'
import { Container, CircularProgress } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import './styles.css'; 
import {database} from '../../firebase/firebase.utils';

const dSpacesReference  =  database.collection('d-spaces'); 

export class DspaceCards extends Component {  
    constructor(props){  
        super(props);
        this.state={ 
        dSpaces:[], 
        render:false
        }  
        this.getAllDspaces();
    }   
    async getAllDspaces(){ 
        const dSpaces = await dSpacesReference.get(); 
        dSpaces.docs.map(document => this.setState({ 
                dSpaces:[...this.state.dSpaces, document.data()]
            }));
    }
    
    render() {   
        if(this.state.dSpaces.length===0){ 
            return( 
                <CircularProgress color="secondary"/>
            )
        } 
            else{ 
                return (
                    <Container>   
                        <Row className="d-space-cards-display-row"> 
                            {  
                                this.state.dSpaces.map(dSpace => {  
                                    return( 
                                        <div className="d-space-card">  
                                            <DspaceCard  
                                                className="d-space-card" 
                                                title = { dSpace.title }
                                            /> 
                                        </div> 
                                    );
                                })
                            }
                        </Row>
                    </Container>
                )
            }
        }
    } 

export default DspaceCards;
