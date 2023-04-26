import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

//web:
//311100487456-263h58v5vsic35g0ps6juiupi3etm604.apps.googleusercontent.com

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
