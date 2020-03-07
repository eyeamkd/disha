import React from 'react' ;  
import Post from '../Post';
import './style.css';

export default class HomePage extends React.Component{
    render() {
        return(  
            <div style={{}} className="main-div"> 
                <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
                <Post title={"ReactJS Internship"} subtitle={"PROJECTS "}/>  
                <Post title={"Python Workshop soon!"} subtitle={"WORKSHOPS"}/>  
                <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
                <Post title={"IEEE hosts Inceptra"} subtitle={"EVENTS"}/>  
                <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
                <Post title={"ReactJS Internship"} subtitle={"PROJECTS "}/>  
                <Post title={"Python Workshop soon!"} subtitle={"WORKSHOPS"}/>  
                <Post title={"codeCraft 2.0 this month!"} subtitle={"EVENTS "}/>  
                <Post title={"IEEE hosts Inceptra"} subtitle={"EVENTS"}/> 
            </div>
            
        );
    }
}