import React, { Component } from 'react'
import DspaceHeader from './DspaceHeader'
import Button from '@material-ui/core/Button';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap'; 
import {database} from '../../firebase/firebase.utils';
import firebase from 'firebase/app'


let dSpace = {}
export class Dspace extends Component {
    
    state = {
        filterClicked: null,
        noPostsYet: false,
        filterValue: "None",
        userInfo: null,
        joined: false,
        userDataReceived: false
      };

    constructor(props){ 
        super();
        this.getUserData();
    }  

    componentDidMount(){
        dSpace = this.props.dSpace
    }
    
    getUserData = () => {
        let currentUserId = localStorage.getItem('currentUserId')
        let userData = database.collection('users').doc(currentUserId);
        var a;
        a = userData.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              this.setState({ joined: doc.data().dspaces.includes(this.props.dSpace.docId), userInfo: doc.data(), userDataReceived: true })
            }
          })
          .catch(err => {
            // console.log('Error getting document', err);
        });
    }

    handleJoinClick = () => {
        let currentUserId = localStorage.getItem('currentUserId')
        this.setState({joined: true})
        // console.log("dspace id", dSpace.id)
        let userDoc = {name: this.state.userInfo.firstName+" "+this.state.userInfo.lastName, rollNumber: this.state.userInfo.rollNumber}
        database.collection('d-spaces').doc(this.props.dSpace.docId).update({
            members: firebase.firestore.FieldValue.arrayUnion(userDoc)
          });
        database.collection('users').doc(currentUserId).update({
            dspaces: firebase.firestore.FieldValue.arrayUnion(this.props.dSpace.docId)
        });
    }
    
    handleJoinedClick = () => {
        let currentUserId = localStorage.getItem('currentUserId')
        // console.log('dSpace.members', dSpace.members)
        this.setState({joined: false})
        let userDoc = {
            name: this.state.userInfo.firstName
            +" "+
            this.state.userInfo.lastName, 
            rollNumber: this.state.userInfo.rollNumber
        }
        database.collection('d-spaces').doc(this.props.dSpace.docId).update({
            members: firebase.firestore.FieldValue.arrayRemove(userDoc)
        });
        database.collection('users').doc(currentUserId).update({
            dspaces: firebase.firestore.FieldValue.arrayRemove(this.props.dSpace.docId)
        });
    }

    componentDidMount(  ){ 
        
        
    }
    render() {
        if(this.state.userDataReceived)
        return ( 
            <Container fluid>  
                <Row> 
                    <Col md={11}>
                        <Typography variant="h1">{this.props.dSpace.title}</Typography>
                    </Col>
                    <Col md={1}>
                        {
                            !this.state.joined
                            ?
                            <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className="submit"
                            onClick={() => this.handleJoinClick()}
                            >
                                Join
                            </Button>
                            :
                            <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className="submit"
                            onClick={() => this.handleJoinedClick()}
                            >
                                Joined
                            </Button>
                        }
                    </Col>
                </Row> 
                <Row> 
                    <Col>  
                        <DspaceHeader dSpace={this.props.dSpace}/>
                    </Col>
                </Row>
            </Container>
            
        )
        else return(
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                }}
            >
                <CircularProgress size={80}/>
            </div>
        )
    }
}

export default Dspace;
