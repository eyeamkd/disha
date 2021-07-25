import React, {createContext} from 'react'; 
import { getUserDocument } from '../../firebase/firebase.utils';

export const UserContext = createContext({}); 

export const getUserContext = async (userId) => { 
    const userDoc = await getUserDocument(userId);
    console.log("User Context", userDoc); 
    return userDoc;
}