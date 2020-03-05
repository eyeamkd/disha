const INITIAL_STATE = {
    department: null
}// similar to first state value set

const departmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_DEPARTMENT':
            return {
                ...state,
                department: action.payload
            }
        default:
            return state;
    }
}

export default departmentReducer;