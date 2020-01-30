const INITIAL_STATE = {
    verificationState: false
}// similar to first state value set

const verificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'VERIFICATION':
            return {
                ...state,
                verifcationState: action.payload
            }
        default:
            return state;
    }
}

export default verificationReducer ;