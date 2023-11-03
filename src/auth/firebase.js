import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4YY4UDVkJJH-0qtC0xAVhhPLV5jHAa9I",
  authDomain: "movie-site-cf2df.firebaseapp.com",
  projectId: "movie-site-cf2df",
  storageBucket: "movie-site-cf2df.appspot.com",
  messagingSenderId: "395097110669",
  appId: "1:395097110669:web:fcdfe07108d2fbf0450ac4",
  measurementId: "G-TP6NLBYE1G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email, password, displayName, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
  } catch (err) {
    alert(err);
  }
};


export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate(-1);
  } catch (err) {
    alert("Wrong username or password");
  }
};

export const logOut = () => {
  signOut(auth);
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      setCurrentUser(false);
    }
  });
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
    })
    .catch((error) => {});
};

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {})
    .catch((err) => {});
};
export const db = getFirestore();
