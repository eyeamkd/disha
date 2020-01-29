const INITIAL_STATE = {
    firstName: null
}// similar to first state value set

const firstNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: action.payload
            }
        default:
            return state;
    }
}

export default firstNameReducer;