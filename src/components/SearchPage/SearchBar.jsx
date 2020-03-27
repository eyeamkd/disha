import React, { Component } from 'react'
import { TextField } from '@material-ui/core'; 
import { connect } from 'react-redux';

export class SearchBar extends Component { 
    constructor(props){
        super(); 
        this.state={ 
            value:''
        }
    }
    render() {
        return (
            <div>
                <TextField  
                    id="outlined-basic" 
                    placeholder="Search D-Spaces"
                    variant="outlined" 
                    fullWidth 
                    onChange={event =>  this.setState({value: event.target.value})} 
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    searchValue : state.value
})

export default connect()(SearchBar);
