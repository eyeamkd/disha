const INITIAL_STATE = {
    year: null
}// similar to first state value set

const yearReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_YEAR':
            return {
                ...state,
                year: action.payload
            }
        default:
            return state;
    }
}

export default yearReducer;