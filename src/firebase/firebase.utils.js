import firebase from 'firebase/app'; 
import 'firebase/firestore';  



const configurationObject =  {
    apiKey: "AIzaSyBmr3NSe3sRk2Zb2OWOhwqGi_pMo49GDF4",
    authDomain: "disha-82395.firebaseapp.com",
    databaseURL: "https://disha-82395.firebaseio.com",
    projectId: "disha-82395",
    storageBucket: "disha-82395.appspot.com",
    messagingSenderId: "161359131723",
    appId: "1:161359131723:web:d84bdafbe0fed111ce09ce",
    measurementId: "G-SDLP3D41WJ"
  };

firebase.initializeApp(configurationObject); 
const firestore = firebase.firestore(); 

export const  sampleFunction= async () => {  
const user =  await firestore.collection('users').doc('oAcioYwuM6We2J5YiDgB'); 
const userData = user.get(); 
console.log((await userData).data());     
}