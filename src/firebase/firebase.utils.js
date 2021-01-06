import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./firebase.config.json";
import firebaseTestingConfig from "./firebase.testing-config.json";

const config = firebaseConfig;
const testingConfig = firebaseTestingConfig;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = database.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error in creating user", error.message);
    }
  }
  return userRef;
}; 

export const storeImageInFireStore = async (file,path) => {
  let userProfileImageStorageReference = storage.ref().child(path);
  return  userProfileImageStorageReference.put(file)
}

export const getImageFromSource = async (imageSrc) => {
  let imageStorageReference = firebase.storage().ref(imageSrc);
  return imageStorageReference.getDownloadURL();
};

export async function getUserDocument(userAuth) {
  if (!userAuth) return;
  const userRef = database.collection("users").doc(userAuth.uid);

  return await userRef
    .get()
    .then((snapShot) => {
      if (snapShot.exists) {
        return snapShot;
      }
    })
    .catch((err) => {
      console.log("Unable to fetch UserDocument ", err);
    });
}

if (process.env.NODE_ENV === "development") {
  firebase.initializeApp(testingConfig);
} else {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();
