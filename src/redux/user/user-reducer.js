const INITIAL_STATE = {
    user: null
}// similar to first state value set

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;