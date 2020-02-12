const INITIAL_STATE = {
    rollNumber: null
}// similar to first state value set

const rollNumberReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_ROLL_NUMBER':
            return {
                ...state,
                rollNumber: action.payload
            }
        default:
            return state;
    }
}

export default rollNumberReducer;