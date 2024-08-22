// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkt6INwYocXC3-LctyRcRjMkD7nkRySo8",
    authDomain: "xhipment-assignment-4cb4b.firebaseapp.com",
    projectId: "xhipment-assignment-4cb4b",
    storageBucket: "xhipment-assignment-4cb4b.appspot.com",
    messagingSenderId: "747629654428",
    appId: "1:747629654428:web:366aa5dda1767040765859",
    measurementId: "G-YD4Y3GBCZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

const logOut = () => {
    return signOut(auth);
};

export { auth, signInWithGoogle, logOut };