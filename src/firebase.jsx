import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged ,GoogleAuthProvider,signInWithRedirect,signOut,GithubAuthProvider,signInWithPopup,TwitterAuthProvider,signInWithEmailAndPassword} from "firebase/auth";
import { useState, } from "react";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set,onDisconnect } from "firebase/database";

import { addDoc, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBj8k0ALyt-zbZS50USdaHvd2k3fKCj7Vw",
  authDomain: "clients-6ce31.firebaseapp.com",
  projectId: "clients-6ce31",
  storageBucket: "clients-6ce31.appspot.com",
  messagingSenderId: "139528251106",
  appId: "1:139528251106:web:bbbde2b96901180a14e0bb",
  measurementId: "G-LD7HQYG9EE"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
// export const database = getDatabase(app);
// export const dbRef = ref(getDatabase());

export const Logouta = ()=>{
    signOut(auth).then(() => {
    console.log('done')
  }).catch((error) => {
  });

}

export const Signinwithemail = (email,password)=>{
  return new Promise((resolve,reject)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      resolve(user)
      // console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      reject(errorMessage)
    });
  })
}
