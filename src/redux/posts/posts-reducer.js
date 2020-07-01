const INITIAL_STATE = {
    posts: null
}// similar to first state value set

const postsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

export default postsReducer;