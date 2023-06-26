import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import * as ImagePicker from "expo-image-picker";
import { ProfileButton } from "../components/profile.styles";
import { Image, View } from "react-native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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
      setField(result.base64);
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
      setImage(result.base64);
    }
  };

  const onSaveImageProduct = async () => {
    if (!image) {
      setImageSelect(field);
    } else {
      setImageSelect(image);
    }

    const photoUri = imageSelect;

    navigation.navigate("AddProductScreen", { selectedImage: photoUri });
  };
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
          source={{ uri: "data:image/jpeg;base64," + image }}
          style={{ flex: 0.5, width: 200, height: 200 }}
        />
      )}
      {field && (
        <Image
          source={{ uri: "data:image/jpeg;base64," + field }}
          style={{ flex: 0.5, width: 200, height: 200 }}
        />
      )}
      <ProfileButton
        icon="camera"
        mode="contained"
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
      <ProfileButton
        title="tirar foto"
        onPress={snap}
        icon="camera"
        mode="contained"
      />
      <ProfileButton
        icon="camera"
        mode="contained"
        title="Pick an image from camera roll"
        onPress={() => onSaveImageProduct}
      />
    </View>
  );
};
