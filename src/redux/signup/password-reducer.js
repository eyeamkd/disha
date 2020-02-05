const INITIAL_STATE = {
    password: null
}// similar to first state value set

const passwordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
}

export default passwordReducer;