import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./firebase.config.json";

const config = firebaseConfig;

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

export const getImageFromSource = async (imageSrc) => {
  let imageStorageReference = firebase.storage().ref(imageSrc);
  return imageStorageReference.getDownloadURL();
};

export async function getUserDocument(userId) {
  const documentReference = database.collection("users").doc(userId);

  return documentReference
    .get()
    .then((userDocument) => {
      if (userDocument.exists) {
        return userDocument.data();
      }
    })
    .catch((err) => {
      console.log("Unable to fetch UserDocument ", err);
    });
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();
