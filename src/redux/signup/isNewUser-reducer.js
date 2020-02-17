const INITIAL_STATE = {
    isNewUser: false
}// similar to first state value set

const isNewUserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_IS_NEW_USER':
            return {
                ...state,
                isNewUser: action.payload
            }
        default:
            return state;
    }
}

export default isNewUserReducer;