import { combineReducers } from 'redux';

import firstNameReducer from './signup/firstName-reducer';
import lastNameReducer from './signup/lastName-reducer';
import emailReducer from './signup/email-reducer';
import rollNumberReducer from './signup/rollNumber-reducer';
import yearReducer from './signup/year-reducer';

export default combineReducers ({
    firstName: firstNameReducer,
    lastName: lastNameReducer,
    email: emailReducer,
    rollNumber: rollNumberReducer,
    year: yearReducer
});