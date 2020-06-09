import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
    Typography,
    FormControl,
    TextField,
    MenuItem,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    FormLabel,
    Button,
    CircularProgress } from "@material-ui/core";
import { Row } from "react-bootstrap"; 
import {database} from '../../firebase/firebase.utils';
import "./style.css";
import { Redirect } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const postCategories = ["Internship", "Project", "Events"];
let dspaces = [];



export class NewPost extends Component {    

constructor(props){  
    super(props);
    this.state={ 
        postTitle:'',  
        isPostTitleInValid:false,
        postDescription:'',  
        isPostDescriptionInValid:false,
        postCategory:'',  
        onDataSubmitting:false,
        isSelectedCategoryInValid:false, 
        dataSubmittedSuccessfully:false, 
        dataSubmittingError:'',
        dSpaces:[],
        dspaceListArrived: false,
        userDetails: null,
        editorHtml: '',
        theme: 'snow', 
        isAuthenticated:false
    }
    this.handleChange = this.handleChange.bind(this)
//     this.getDspaces();
//     this.getUserDetails();
} 

handleChange (html) {
    this.setState({
        postDescription:html, editorHtml: html
    })
  	// this.setState({ editorHtml: html });
}

componentDidMount(){  
    // console.log("CDM fired");
    this.getDspaces();
    this.getUserDetails();
} 

componentWillUnmount(){ 
    dspaces=[];
}

getDspaces=()=>{ 

    let dspaceData = database.collection('d-spaces')
    if(dspaces.length === 0) { 
        // console.log("in query function");
        let query = dspaceData.get()
        .then(snapshot => {
            if (snapshot.empty) {
                // console.log('No matching documents.');
                return;
            }  
            snapshot.forEach(doc => {
                // console.log(doc.id, '=>', doc.data().title);
                dspaces.push(doc.data().title)
            });
            this.setState({dspaceListArrived: true})
            // console.log('dspaces', dspaces)
        })
        .catch(err => {
            // console.log('Error getting documents', err);
        });
    }
}

isFormDataValid=()=>{ 
    // console.log("in form validation");
    if(this.state.postTitle.length<10){ 
        this.setState({isPostTitleInValid:true}); 
        return false;
    }else if(this.state.postDescription.length<100) { 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:true 
        }); 
        return false;
    }else if(this.state.postCategory.length<2){ 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:false,
            isSelectedCategoryInValid:true 
        }); 
        return false;
    }else { 
        this.setState({  
            isPostTitleInValid:false,
            isPostDescriptionInValid:false,
            isSelectedCategoryInValid:true 
        }); 
        return true;
    }
}

handleTextChange=(event)=>{  
    this.setState({
        [event.target.id]:event.target.value
    })
} 

handleCategorySelected=(event)=>{
    this.setState({
        postCategory:event.target.value
    })
} 

handleDSpaceSelected=(event)=>{
    this.setState({ 
        dSpaces:[...this.state.dSpaces,event.target.value]
    })
} 

handleSubmit=()=>{ 
    if(this.isFormDataValid()){  
        this.postData();
        this.setState({ 
            onDataSubmitting:true
        })
    } 
}  

getUserDetails = () => {
    const currentUserId = localStorage.getItem('currentUserId');
    let userData = database.collection('users').doc(currentUserId);
    let getDoc = userData.get()
    .then(doc => {
        if (!doc.exists) {
        // console.log('No such document!');
        } else { 
            
           this.setState({userDetails: doc.data(), isAuthenticated : !!doc.data().isAuthenticated })
        }
    })
    .catch(err => {
        // console.log('Error getting document', err);
    });
}


getCurrentDate = () => {
    var today = new Date();
    var date = this.doubleDigitDate(today.getFullYear())+'-'+(this.doubleDigitDate(today.getMonth()+1))+'-'+this.doubleDigitDate(today.getDate());
    var time = this.doubleDigitDate(today.getHours()) + ":" + this.doubleDigitDate(today.getMinutes()) + ":" + this.doubleDigitDate(today.getSeconds());
    var dateTime = date+' '+time;
    return dateTime;
}

doubleDigitDate = (date) => {
    date = date.toString()
    if(date < 10) {
        date = "0" + date
    }
    return date
}

addPostUrl = () => {
    let titleArray = this.state.postTitle.split(" ")
    if(titleArray.length > 3)
      titleArray = titleArray.slice(0,3)
    let postUrl = titleArray.join("-")
    let dateTime = this.getCurrentDate()
    let timeCode = this.getTimeCode(dateTime)
    postUrl += "-" + timeCode
    return postUrl
}

getTimeCode = (dateTime) => {
    let timeCode = [];
    for(var i=2;i<dateTime.length;i++)
      if(dateTime[i] !== ":" && dateTime[i] !== " " && dateTime[i] !== "-")
        timeCode.push(dateTime[i])
    timeCode = timeCode.join("")
    return timeCode;
  }

postData = () => { 
    const postUrl = this.addPostUrl()
    const name = this.state.userDetails.firstName + " " + this.state.userDetails.lastName
    // console.log('name', this.state.userDetails.rollNumber)
    // console.log('rollNumber', rollNumber)
    const newPostData = { 
        title:this.state.postTitle, 
        description:this.state.postDescription, 
        category:this.state.postCategory, 
        dSpaces:this.state.dSpaces, 
        timeStamp: this.getCurrentDate(),
        author:name,
        postUrl:postUrl,
        authorRollNumber:this.state.userDetails.rollNumber,
        likes:0
        
    }
    database.collection('posts').add(newPostData)
    .then((docRef)=>{this.setState({dataSubmittedSuccessfully:true})}) 
    .catch(err=>{this.setState({ 
        dataSubmittingError:'Oof! there was an error! Please try posting after some time',
        onDataSubmitting:false
    })})
}

    render() {  
        // console.log(this.state);
        if(this.state.dataSubmittedSuccessfully){  
            return(<Redirect to="/post-submitted"/>);
        }
        else if(this.state.dspaceListArrived === false) {
            return(
                <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                    }}
                >
                    <CircularProgress size={80}/>
                </div>
            )
        }
        else{ 
            return (  
                <Container className={this.state.isAuthenticated? '' : 'display-inactive'}> 
                    <Typography variant="h1">New Post</Typography>
                    <Row className="form-div"> 
                        <FormControl > 
                                <TextField
                                label="Post Title"
                                id="postTitle"
                                placeholder="Post Title"
                                variant="outlined"
                                required 
                                onChange={this.handleTextChange} 
                                value={this.state.postTitle || ""} 
                                error={this.state.isPostTitleInValid} 
                                helperText="Post Title should be minimum 10 characters"
                                /> 

                                <div className="app">
                                    <ReactQuill 
                                        theme={this.state.theme}
                                        onChange={this.handleChange}
                                        value={this.state.editorHtml}
                                        modules={NewPost.modules}
                                        formats={NewPost.formats}
                                        bounds={'.app'}
                                        placeholder="Description here"
                                    />
                                    <FormHelperText error={false}>Post Description should be minimum 100 characters</FormHelperText> 
                                </div>
                                
        
                                <TextField
                                id="postCategory"
                                select
                                label="Category"
                                helperText="Please select post category"
                                className="new-post-form-field"  
                                onChange={this.handleCategorySelected}
                                value={this.state.postCategory} 
                                error={this.state.isSelectedCategoryInValid} 
                                >  
                                {postCategories.map(option => (
                                    <MenuItem key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                ))} 
                                </TextField>  
                                {
                                    
                                    
                                }
                                <div className="checkbox-section">  
                                <FormLabel>Select D-Spaces in which you want this post to appear</FormLabel> 
                                <div className="dspace-list">  
                                    <FormGroup>
                                        {dspaces.map(dspaceName => ( 
                                            <FormControlLabel 
                                                control={ 
                                                    <Checkbox 
                                                        value={dspaceName}  
                                                        onChange={this.handleDSpaceSelected}
                                                    />
                                                } 
                                                label={dspaceName}
                                            />
                                        ))} 
                                    </FormGroup> 
                                </div>  
                                </div>  
        
                        </FormControl> 
                    </Row>   
                    {this.state.onDataSubmitting 
                    ? 
                    <CircularProgress color="primary" />  
                    :
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button> 
                    } 
                    
                        <Typography color="error">{this.state.dataSubmittingError}</Typography>
                    
                </Container>
                );
        }
        
    }
}

NewPost.modules = {
    toolbar: [
      [],
      [],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  NewPost.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

export default NewPost;
