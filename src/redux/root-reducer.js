import { combineReducers } from 'redux';

import firstNameReducer from './signup/firstName-reducer';

export default combineReducers ({
    firstName: firstNameReducer
});