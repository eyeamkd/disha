const INITIAL_STATE = { 
    searchValue : ''
}

const searchBarReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){ 
        case 'SET_SEARCH_VALUE': 
            return{ 
                ...state, 
                searchValue:action.payload
            } 
        default : 
            return state;
    }
}; 

export default searchBarReducer;