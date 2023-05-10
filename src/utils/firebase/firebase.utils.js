import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
<<<<<<< HEAD
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
=======
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  onAuthStateChanged,
} from "firebase/firestore";
>>>>>>> cf8c967fea2c2b3ee5627eb1cc9f7d11a9f503e5

const firebaseConfig = {
  apiKey: "AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o",
  authDomain: "trocanaquebrada-f3b2b.firebaseapp.com",
  projectId: "trocanaquebrada-f3b2b",
  storageBucket: "trocanaquebrada-f3b2b.appspot.com",
  messagingSenderId: "311100487456",
  appId: "1:311100487456:web:99b1e599dd4649f6848945",
};

export const firebaseApp = initializeApp(firebaseConfig);

if (!firebaseApp.length) {
  initializeApp(firebaseConfig);
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();

export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, googleProvider);
};

//googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

//web: 311100487456-263h58v5vsic35g0ps6juiupi3etm604.apps.googleusercontent.com

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
<<<<<<< HEAD
  /*   if (!userAuth) {
      return;
    } */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userAuth = user.uid;
    }
  });


=======
  if (!userAuth) {
    return;
  }
  /* onAuthStateChanged(auth, (user) => {
    if (user) {
      userAuth = user.uid;
    }
  }); */

  const userDocRef = doc(db, "users", userAuth.uid);
>>>>>>> cf8c967fea2c2b3ee5627eb1cc9f7d11a9f503e5
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

<<<<<<< HEAD
=======
    try {
      await addDoc(collection(userDocRef), {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("erro ao criar o usuario", error.message);
    }
>>>>>>> cf8c967fea2c2b3ee5627eb1cc9f7d11a9f503e5
  }
  return userDocRef;
};

/*
try {
  const docRef = addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
*/
