import React, { useRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  ProfileBackground,
  ProfileContainer,
  ProfileButton,
} from "../components/profile.styles";

import { getFirestore, doc, getDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const ProfileItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const ProfileScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  const getProfilePicture = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const userRef = auth.currentUser.uid;
    const docRef = await getDoc(doc(db, "users", userRef));

    const photoUri = await AsyncStorage.getItem(`${docRef.uid}-photo`);
    setPhoto(photoUri);
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const auth = getAuth();
      const userRef = auth.currentUser.uid;
      const docRef = await getDoc(doc(db, "users", userRef));
      const userData = docRef.data();
      setUserDoc(userData);
      getProfilePicture(user);
    };
    fetchData();
  }, [user]);

  return (
    <ProfileBackground>
      <SafeArea>
        <Spacer size="extralarge">
          <AvatarContainer>
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              {!photo && (
                <Avatar.Icon
                  size={180}
                  icon="human"
                  backgroundColor="#2182BD"
                />
              )}
              {photo && (
                <Avatar.Image
                  size={180}
                  source={{ uri: photo }}
                  backgroundColor="#2182BD"
                />
              )}
            </TouchableOpacity>
            <Spacer position="top" size="large">
              <Text variant="label">{userDoc?.email}</Text>
            </Spacer>
          </AvatarContainer>
        </Spacer>

        <List.Section>
          <ProfileContainer>
            <Spacer size="medium">
              <Text>Olá, {userDoc?.displayName}! Vai trocar o que hoje? </Text>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("AddProductScreen")}
              >
                Cadastrar o que vc quer trocar
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("Localizacao")}
              >
                Buscar algo pra trocar no Mapa
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("ProductsPage")}
              >
                Buscar algo pra trocar na Lista
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("ChatsScreen")}
              >
                Minhas Conversas
              </ProfileButton>
            </Spacer>
          </ProfileContainer>

          <ProfileItem
            title="Sair da Conta"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
          <ProfileItem
          // **rating
          />
        </List.Section>
      </SafeArea>
    </ProfileBackground>
  );
};
