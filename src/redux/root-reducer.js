import { combineReducers } from 'redux';

import firstNameReducer from './signup/firstName-reducer';
import lastNameReducer from './signup/lastName-reducer';

export default combineReducers ({
    firstName: firstNameReducer,
    lastName: lastNameReducer,
});