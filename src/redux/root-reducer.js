import { combineReducers } from 'redux';

import firstNameReducer from './signup/firstName-reducer';
import lastNameReducer from './signup/lastName-reducer';
import emailReducer from './signup/email-reducer';
import rollNumberReducer from './signup/rollNumber-reducer';
import yearReducer from './signup/year-reducer';
import sectionReducer from './signup/section-reducer';
import departmentReducer from './signup/department-reducer';
import passwordReducer from './signup/password-reducer';
import isNewUserReducer from './signup/isNewUser-reducer';
import userReducer from './user/user-reducer'; 
import dspaceSearchReducer from './dSpaceSearch/searchBar-reducer';

export default combineReducers ({
    firstName: firstNameReducer,
    lastName: lastNameReducer,
    email: emailReducer,
    rollNumber: rollNumberReducer,
    year: yearReducer,
    section: sectionReducer,
    department: departmentReducer,
    password: passwordReducer,
    isNewUser: isNewUserReducer,
    user: userReducer, 
    dSpaceSearch :dspaceSearchReducer 
});