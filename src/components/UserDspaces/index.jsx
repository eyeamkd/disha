import React, { Component } from 'react'; 
import {database} from './../../firebase/firebase.utils';
import { Container, Col } from 'reactstrap';
import { Typography, CircularProgress, List, ListItem, ListItemText, Divider, ListItemIcon } from '@material-ui/core'; 
import {Group} from '@material-ui/icons';
import { Row } from 'react-bootstrap'; 
import './style.css';

const userId  =  localStorage.getItem("currentUserId");

export class UserDspaces extends Component { 
    constructor(props){ 
        super(props); 
        this.state={ 
            dspaces:[], 
            dSpaceIds:[]
        }
    }  
    async loadUserDspaceIds(){ 
        let  userRefDoc =  database.collection("users").doc(userId); 
        let dSpacesIds= []; 
        let userDoc =  await userRefDoc.get()
                                    .then(doc=>{ 
                                        if(!doc.exists){ 
                                            console.log("Invalid User Document"); 
                                        }else { 
                                            console.log(doc.data().dspaces); 
                                            this.setState({dSpaceIds:doc.data().dspaces})
                                        }
                                    }) 
    }   
    loadUserDspaces=()=>{  
        this.state.dSpaceIds.map(id=>{ 
            let dspaceDocRef = database.collection("d-spaces").doc(id); 
            let dSpaceInfo = dspaceDocRef.get( )
                                            .then(doc=>{ 
                                                if(!doc.exists){ 
                                                    console.log("NO Dspace found with that ID"); 
                                                }else{
                                                    this.setState({ 
                                                        dspaces:[...this.state.dspaces, doc.data()]
                                                    })
                                                }
                                            })
        })
    }
    componentDidMount(){
        this.loadUserDspaceIds()
            .then(()=>this.loadUserDspaces())
    }  
    render() {  
        console.log(this.state);
            if(this.state.dspaces.length===0){ 
                return( 
                    <Container> 
                        <Typography variant="h1">Your D-spaces</Typography> 
                        <Row style={{margin:'50px'}}>
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <CircularProgress />
                            </Col>
                        </Row>
                    </Container>
                )
            }else{ 
                return( 
                    <Container> 
                        <Typography variant="h1">Your D-spaces</Typography> 
                        <Row >
                            <Col className="user-dspaces">
                                <List >
                                    { 
                                        this.state.dspaces.map(dspace=>  
                                            <div>  
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Group color="primary"/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={dspace.title}/> 
                                                </ListItem>  
                                                <Divider/>
                                            </div>
                                        )
                                    }
                                </List>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        
    }
}

export default UserDspaces;
