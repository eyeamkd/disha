import React from 'react' ;  
import InfiniteScroll from "react-infinite-scroll-component";

import Post from '../Post';
import './style.css';

import { CircularProgress } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import postData from './postsdata.json';

export default class HomePage extends React.Component{

    state = {
        items: postData.slice(0,5),
        hasMore: true,
        index: 5,
        filterClicked: null,
        filterValue: ""
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

    handleClick = event => {
        this.setState({filterClicked: event.currentTarget});
    };
    
    handleClose = (value) => {
        this.setState({filterClicked: null, filterValue: value});
    };

    filterPosts = (element) => {
        console.log('element.subtitle', element.subtitle)
        console.log('this.state.filterValue', this.state.filterValue)
        if(this.state.filterValue === "") {
            return(<Post title={element.title} subtitle={element.subtitle} description={element.description}/>)
        }
        else {
            if(element.subtitle === this.state.filterValue) {
                return(<Post title={element.title} subtitle={element.subtitle} description={element.description}/>)
            }
            else
                return (<div></div>)
        }
    }

    render() {
        console.log(this.state.filterValue);
        return(  
            <div>
                <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                    <Box p={1} >
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <SortIcon/>Filter
                        </Button>
                    </Box>
                </Box>
                <Menu
                id="simple-menu"
                anchorEl={this.state.filterClicked}
                keepMounted
                open={Boolean(this.state.filterClicked)}
                onClose={() => this.handleClose("")}
                >
                <MenuItem onClick={() => this.handleClose("EVENTS")}>Events</MenuItem>
                <MenuItem onClick={() => this.handleClose("INTERNSHIP")}>Internship</MenuItem>
                <MenuItem onClick={() => this.handleClose("FREELANCING")}>Freelancing</MenuItem>
                <MenuItem onClick={() => this.handleClose("")}>None</MenuItem>
                </Menu>
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
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                <div style={{}} className="main-div"> 
                    {this.state.items.map(element => {
                        return this.filterPosts(element)
                    })}
                </div>
                </InfiniteScroll>
            </div>
            
            
            
        );
    }
}