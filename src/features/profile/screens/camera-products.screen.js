import React, { useRef, useState, useEffect, useContext } from "react";
import { Camera, requestCameraPermissionsAsync } from "expo-camera";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import { storage } from "../../../utils/firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { ProfileButton } from "../components/profile.styles";
import { Image, View, Platform } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;
export const CameraProductsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [field, setField] = useState(null);
  const [imageSelect, setImageSelect] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //useEfect
  const snap = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setField(result.assets[0].base64);
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };
  const selectImage = () => {
    if (image) {
      setImageSelect(image);
    } else {
      setImageSelect(field);
    }
  };
  console.log(imageSelect);

  /*   const db = getFirestore();
  const auth = getAuth();
  const onSaveImageProduct = async () => {
    const userRef = auth.currentUser.uid;
    try {
      const docRef = await getDoc(doc(db, "users", userRef));
      const photoUri = await AsyncStorage.getItem(`${docRef}-photo`);
      setPhoto(photoUri);

      const productData = {
        userRef,
        nameProduct,
        infoProduct,
        value,
        ...getLocUser,
        createdAt,
      };

      if (productData.nameProduct === "" || productData.infoProduct === "") {
        console.log("Por favor, preencha todos os campos do produto");
      } else {
        await addDoc(collection(db, "Product"), productData);
        await createUserDocumentFromAuth(productData);
        console.log("produto criado com sucesso");
        setProductData(productData);
      }

      setProductData();
    } catch (e) {
      setIsLoading(false);
      setError(e.toString("Erro ao criar o produto"));
    }
  }; */
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text> Mostre o que vc quer trocar </Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ flex: 0.5, width: 250, height: 250 }}
        />
      )}
      {field && (
        <Image
          source={{ uri: field }}
          style={{ flex: 0.5, width: 250, height: 250 }}
        />
      )}

      <Spacer size="large">
        <ProfileButton
          icon="camera"
          mode="contained"
          title="Pick an image from camera roll"
          onPress={pickImage}
        >
          Selecionar da Galeria
        </ProfileButton>
      </Spacer>

      <Spacer size="large">
        <ProfileButton
          title="tirar foto"
          onPress={snap}
          icon="camera"
          mode="contained"
        >
          Tirar Foto
        </ProfileButton>
      </Spacer>
    </View>
  );
};
