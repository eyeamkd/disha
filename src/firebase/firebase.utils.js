import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./firebase.config.json";
import firebaseTestingConfig from "./firebase.testing-config.json";
import userRoles from "../utils/userRoles";

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

export const storeImageInFireStore = async (file, path) => {
  let userProfileImageStorageReference = storage.ref().child(path);
  return userProfileImageStorageReference.put(file);
};

export const getImageFromSource = async (imageSrc) => {
  let imageStorageReference = firebase.storage().ref(imageSrc);
  return imageStorageReference.getDownloadURL();
};

export async function getUserDocument(userId) {
  if (!userId) return;
  let userRef = database.collection("users").doc(userId);
  let facultyRef = database.collection("faculty").doc(userId);
  let adminRef = database.collection("admins").doc(userId);

  let userDoc = await userRef.get();
  let facultyDoc = await facultyRef.get();
  let adminDoc = await adminRef.get();
  try {
    if (userDoc.exists) return {data:userDoc.data(),role:userRoles.general};
    if (facultyDoc.exists) return {data:facultyDoc.data(), role:userRoles.faculty};
    if (adminDoc.exists) return {data:adminDoc.data(), role:userRoles.admin};
    else return {data:null,role:userRoles.signedout}
  } catch (err){
    console.log(err);
  }

  console.log("User Ref ", userRef);

  // return await userRef
  //   .get()
  //   .then((snapShot) => {
  //     console.log("Snapshot for user doc is",snapShot);
  //     if (snapShot?.exists) {
  //       let data =  snapShot.data();
  //       data.id = userId
  //       console.log("Data from snapshot", data);
  //       return data;
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("Unable to fetch UserDocument ", err);
  //   });
}

if (process.env.NODE_ENV === "development") {
  firebase.initializeApp(testingConfig);
} else {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();
