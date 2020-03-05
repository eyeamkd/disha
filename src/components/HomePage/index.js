import React from 'react' ;  
import Post from '../Post';
import './style.css';

export default class HomePage extends React.Component{
    render() {
        return(  
            <div style={{}} className="main-div"> 
                <Post/>  
                <Post/>  
                <Post/>  
                <Post/>  
                <Post/> 
                <Post/>  
                <Post/>  
                <Post/>   
                <Post/> 
            </div>
            
        );
    }
}