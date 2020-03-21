import React, { Component } from 'react'
import { TextField } from '@material-ui/core';

export class SearchBar extends Component {
    render() {
        return (
            <div>
                <TextField  
                    id="outlined-basic" 
                    placeholder="Search D-Spaces"
                    variant="outlined" 
                    fullWidth
                    />
            </div>
        )
    }
}

export default SearchBar;
