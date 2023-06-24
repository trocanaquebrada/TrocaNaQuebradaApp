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
import { storage } from "../../../utils/firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onSnapshot, onSnapshotsInSync } from "firebase/firestore";

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
  const [imgURL, setImgURL] = useState("");
  const [progress, setProgress] = useState(0);
  const cameraRef = useRef();

  const getProfilePicture = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const userRef = auth.currentUser.uid;
    const docRef = await getDoc(doc(db, "users", userRef));
    //const photo = await cameraRef.current.takePictureAsync();
    /*const storageRef = ref(storage, `imagesPerfil/${photo.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      (onSnapshotsInSync) => {
        const progress = Math.round(
          (onSnapshotsInSync.bytesTransferred / onSnapshotsInSync.totalBytes) *
            100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
        });
      }
    );*/
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
            <Spacer position="top" size="extralarge">
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
                Cadastrar Produto/Serviço
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("Localizacao")}
              >
                Buscar Produto/Serviço no Mapa
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("ProductsPage")}
              >
                Buscar Produto/Serviço na Lista
              </ProfileButton>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("ChatsScreen")}
              >
                Meus Chats
              </ProfileButton>
            </Spacer>
          </ProfileContainer>

          <ProfileItem
            title="Sair"
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
