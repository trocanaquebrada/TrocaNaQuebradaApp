import React, { useEffect } from "react";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account.styles";

import {
  getRedirectResult,
  createUserDocumentFromAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

import { auth } from "../../../utils/firebase/firebase.utils";

import { Spacer } from "../../../components/spacer/spacer.component";

export const AccountScreen = ({ navigation }) => {
  useEffect(() => {
    async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef, "1");
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup();
    await createUserDocumentFromAuth(auth, user);
  };

  return (
    <AccountBackground>
      <Title>Troca na Quebrada</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Entrar
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastrar
          </AuthButton>
        </Spacer>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={signInWithGoogle}
          >
            Entrar com o Google
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
