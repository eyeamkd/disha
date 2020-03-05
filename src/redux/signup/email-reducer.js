const INITIAL_STATE = {
    email: null
}// similar to first state value set

const emailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        default:
            return state;
    }
}

export default emailReducer;