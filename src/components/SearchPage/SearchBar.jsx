import React,{useState} from 'react';
import { TextField } from '@material-ui/core'; 
import { connect } from 'react-redux'; 

import {onSearchValueEntered} from '../../redux/dSpaceSearch/searchBar-action';

function SearchBar(props){    
    // console.log(props);
    return( 
        <div>
            <TextField  
                id="outlined-basic" 
                placeholder={props.placeholder}
                variant="outlined" 
                fullWidth 
                onChange={event => props.onSearchValueEntered(event.target.value)}   
                value={props.searchValue}
                />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({ 
    onSearchValueEntered : value => dispatch(onSearchValueEntered(value))
}) 

const mapStateToProps = state => ({
    searchValue : state.dSpaceSearch.searchValue
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
