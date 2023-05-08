import React, { useState, createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

<<<<<<< HEAD
import {
  createUserDocumentFromAuth,
  googleProvider,
} from "../../utils/firebase/firebase.utils";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
=======
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
>>>>>>> cf8c967fea2c2b3ee5627eb1cc9f7d11a9f503e5

export const AuthenticationContext = createContext();

export const db = getFirestore();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = async (displayName, email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Erro: Senhas nao batem");
      return;
    }
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        // console.log(u.user.uid);
        setUser(u);
        setIsLoading(false);
        try {
          const createdAt = new Date();

          console.log(u)
          setDoc(doc(db, "users", u.user.uid), {
            displayName,
            email,
            createdAt,
            //    ...additionalInformation,
          });
        } catch (error) {
          console.log("erro ao criar o usuario", error.message);
        }

      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
    // console.log(auth, email, password, { displayName });
    await createUserDocumentFromAuth(auth, email, password, { displayName });
  };

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
