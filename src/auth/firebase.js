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
  apiKey: "AIzaSyAE3qPuNkbHy19I5511y010pxp-ApFl0Fs",
  authDomain: "movie-project-7e2a6.firebaseapp.com",
  projectId: "movie-project-7e2a6",
  storageBucket: "movie-project-7e2a6.appspot.com",
  messagingSenderId: "1067867559705",
  appId: "1:1067867559705:web:b3111fb20bb53f13d65788",
  measurementId: "G-N5K9VQ89EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (
  email,
  password,
  displayName,
  displayEmail,
  navigate
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: displayName,
      displayEmail: displayEmail,
    });
    navigate("/");
    toastSuccessNotify("Registered successfully!");
  } catch (err) {}
};

export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
  } catch (err) {}
};

export const logOut = () => {
  signOut(auth);
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {});
};

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
    })
    .catch((err) => {});
};
export const db = getFirestore(app);
