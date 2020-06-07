const INITIAL_STATE = {
    commentsState: null
}// similar to first state value set

const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COMMENTS':
            return {
                ...state,
                commentsState: action.payload
            }
        default:
            return state;
    }
}

export default commentsReducer ;