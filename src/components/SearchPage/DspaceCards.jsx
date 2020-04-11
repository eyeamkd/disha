import React, { Component, Fragment } from 'react'
import DspaceCard from './DspaceCard'
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import './styles.css'; 
import {database} from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';

const dSpacesReference  =  database.collection('d-spaces'); 

let Dspaces = [];  

let DspacesConstant = [];

const updateDspaceArray=(value,prevDspacesArray)=>{ 
    if(value===""){ 
        return DspacesConstant;
    }
    else { 
    return prevDspacesArray.filter(dSpace => dSpace.title.toLowerCase().includes(value.toLowerCase())); 
    }
}

export class DspaceCards extends Component {  
    constructor(props){  
        super(props);
        this.state={ 
        dSpaces:[],  
        isDspacePresent:true, 
        display:[],
        render:false,
        dSpacesLoaded : false,
        }  
    } 

    componentWillMount(){  
        this.storeDspaces();
    } 
    
    componentWillUnmount(){ 
        Dspaces=[]; 
        DspacesConstant=[];
    }
    
    componentDidUpdate(prevProps){  
        if(prevProps.searchValue===""){
            Dspaces = DspacesConstant;
        }
        if(prevProps.searchValue !== this.props.searchValue){
            Dspaces = updateDspaceArray(this.props.searchValue,Dspaces);  
            if(Dspaces.length===0){ 
                this.noDspacesFound();
            }else { 
                this.DspacesFound();
            }
        } 
    }     

    noDspacesFound(){ 
        this.setState({ 
            isDspacePresent:false
        })
    } 

    DspacesFound(){ 
        this.setState({ 
            isDspacePresent:true
        })
    }

    async storeDspaces(){ 
        const dSpaces = await dSpacesReference.get(); 
        dSpaces.docs.map(document => ( 
            Dspaces.push(document.data())
        )) ;  
        DspacesConstant = Dspaces;
        this.setState({ dSpacesLoaded : true });
        
    } 

    
    render() {    
        if(!this.state.dSpacesLoaded){ 
            return(  
                <Container>  
                    <Row>   
                    <Col md={{ span: 6, offset: 3 }}>  
                        <CircularProgress color="secondary"/>
                    </Col>
                    </Row>
                </Container> 
            )
        } 
            else{   
                    
                    return (
                        <Container>   
                            <Row className="d-space-cards-display-row"> 
                                {  this.state.isDspacePresent  
                                    ?
                                    Dspaces.map(dSpace => {  
                                        return(  
                                            <Link to={{ 
                                                pathname:'/d-spaces', 
                                                state:{ dSpaceInfo : {dSpace} }
                                            }}>
                                            <DspaceCard  
                                                    className="d-space-card" 
                                                    title = { dSpace.title } 
                                                    description = { dSpace.description } 
                                                    key={dSpace.title}
                                            />
                                            </Link> 
                                        );
                                    }) 
                                    :  
                                    <Fragment>
                                        <center><Typography variant="h4">Oof, no DSpace found!</Typography></center> 
                                        <br/>
                                        <center><Typography variant="h6">How about creating one?</Typography></center>
                                    </Fragment>
                                    
                                    
                                }
                            </Row>
                        </Container>
                    )
                }
            }
        }

export default DspaceCards;

