const INITIAL_STATE = {
    section: null
}// similar to first state value set

const sectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SECTION':
            return {
                ...state,
                section: action.payload
            }
        default:
            return state;
    }
}

export default sectionReducer;