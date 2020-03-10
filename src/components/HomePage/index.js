import React from 'react' ;  
import InfiniteScroll from "react-infinite-scroll-component";

import Post from '../Post';
import './style.css';

import { CircularProgress } from "@material-ui/core";


import postData from './postsdata.json';

export default class HomePage extends React.Component{

    state = {
        items: postData.slice(0,5),
        hasMore: true,
        index: 5,
    };

    fetchMoreData = () => {
        if (postData.length === this.state.items.length) {
          this.setState({ hasMore: false });
          return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(postData.slice(this.state.index, this.state.index+5)),
            index: this.state.index + 5
          });
        }, 500);
    };

    render() {
        console.log(postData);
        return(  
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<div style={{
                    position: 'absolute', left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                >
                <CircularProgress size={20}/>
                </div>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
            <div style={{}} className="main-div"> 
                {this.state.items.map(element => {
                    return(<Post title={element.title} subtitle={element.subtitle} description={element.description}/>)
                })}
            </div>
            </InfiniteScroll>
            
            
        );
    }
}