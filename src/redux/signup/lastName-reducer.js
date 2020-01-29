const INITIAL_STATE = {
    lastName: null
}// similar to first state value set

const lastNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: action.payload
            }
        default:
            return state;
    }
}

export default lastNameReducer;