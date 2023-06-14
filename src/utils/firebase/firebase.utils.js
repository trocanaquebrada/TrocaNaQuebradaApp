import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o",
  authDomain: "trocanaquebrada-f3b2b.firebaseapp.com",
  projectId: "trocanaquebrada-f3b2b",
  storageBucket: "trocanaquebrada-f3b2b.appspot.com",
  messagingSenderId: "311100487456",
  appId: "1:311100487456:web:99b1e599dd4649f6848945",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage();
if (!firebaseApp.length) {
  initializeApp(firebaseConfig);
}

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

/* export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
}); */

const auth = getAuth();

/* export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, googleProvider);
}; */

//googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

//web: 311100487456-263h58v5vsic35g0ps6juiupi3etm604.apps.googleusercontent.com

export const db = getFirestore();

/* export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  /*   if (!userAuth) {
      return;
    }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userAuth = user.uid;
    }
  });
}; */
