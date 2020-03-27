import React, { Component, Fragment } from 'react'
import DspaceCard from './DspaceCard'
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { Row } from 'react-bootstrap';

import './styles.css'; 
import {database} from '../../firebase/firebase.utils';

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
                <CircularProgress color="secondary"/>
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
                                            <div className="d-space-card">  
                                                <DspaceCard  
                                                    className="d-space-card" 
                                                    title = { dSpace.title } 
                                                    key={dSpace.title}
                                                /> 
                                            </div> 
                                        );
                                    }) 
                                    :  
                                    <Fragment>
                                        <Typography variant="h4">Oof Dspace not present</Typography> 
                                        <Typography variant="h6">how about creating now one?</Typography>
                                    </Fragment>
                                    
                                    
                                }
                            </Row>
                        </Container>
                    )
                }
            }
        }

export default DspaceCards;

