import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from './firebase.config.json';

const config = firebaseConfig;

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log(firestore.doc(`users/oAcioYwuM6We2J5YiDgB`))
    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        console.log("User auth:",userAuth);
        const createdAt = Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt,
                ...additionalData
            })
        }
        catch(error) {
            console.log("Error in creating user", error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();