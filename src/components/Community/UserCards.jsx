import React, { Component, Fragment } from 'react'
import DspaceCard from '../SearchPage/DspaceCard';
import { Container, CircularProgress, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import '../SearchPage/styles.css'; 
import {database} from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const usersReference = database.collection('users');

let Users = []; 

let UsersConstant = [];

const updateUsersArray=(value,prevUsersArray)=>{  
    console.log("Update Array being fired");
    if(value===""){ 
        return UsersConstant;
    }
    else { 
    return prevUsersArray.filter(users => users.firstName.toLowerCase().includes(value.toLowerCase()) ); 
    }
}

export class UserCards extends Component {  
    constructor(props){  
        super(props);
        this.state={ 
        users:[], 
        isUserPresent:true,
        display:[],
        render:false, 
        usersLoaded:false,
        }  
    } 

    componentWillMount(){  
        this.storeUsers();
    } 
    
    componentWillUnmount(){ 
        Users=[]; 
        UsersConstant=[];
    }
    
    componentDidUpdate(prevProps){   
        console.log("pREV",prevProps);
        if(prevProps.searchValue===""){ 
            Users = UsersConstant;
        } 
        if(prevProps.searchValue!==this.props.searchValue){ 
            Users = updateUsersArray(this.props.searchValue,Users); 
            if(Users.length === 0){ 
                this.noUsersFound();
            }else { 
                this.UserFound();
            }
        }
    }     

    noUsersFound(){ 
        this.setState({ 
            isUserPresent:false
        })
    }

    UserFound(){ 
        this.setState({ 
            isUserPresent:true
        })
    }

    async storeUsers(){ 
        const users = await usersReference.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }  
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data().title); 
                    let userData = doc.data()
                    userData.id = doc.id
                    Users.push(userData)
            });
            //console.log('dspaces', dspaces)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });  
        UsersConstant = Users;
        this.setState({ usersLoaded : true });
    }
    
    render() {    
        if(!this.state.usersLoaded){ 
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
            else{  console.log(this.props);
                    return (
                        <Container>   
                            <Row className="d-space-cards-display-row"> 
                                {  this.state.isUserPresent  
                                    ?
                                    Users.map(User => {   
                                        let linkPath  = `/id=${User.rollNumber}`
                                        return(  
                                            <Link to={linkPath}>
                                            <UserCard  
                                                    className="d-space-card" 
                                                    title = { User.firstName +" "+ User.lastName } 
                                                    // description = { dSpace.description } 
                                                    key={User.firstName}
                                            />
                                            </Link> 
                                        );
                                    }) 
                                    :  
                                    <Fragment>
                                        <center><Typography variant="h4">Oof,User not found!</Typography></center> 
                                        <br/>
                                        <center><Typography variant="h6">if you have your friends contact, ask him to register on DISHA</Typography></center>
                                    </Fragment>
                                    
                                    
                                }
                            </Row>
                        </Container>
                    )
                }
            }
}

export default UserCards;

