import React, { useRef, useState, useContext } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  ProfileBackground,
  ProfileContainer,
  ProfileInput,
  ProfileButton,
} from "../components/profile.styles";
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { ActivityIndicator, MD2Colors, Avatar } from "react-native-paper";
import { AuthButton } from "../../account/components/account.styles";
import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import { createUserDocumentFromAuth, getAuth } from "firebase/auth";
import { TouchableOpacity } from "react-native";
import { CameraProductsScreen } from "./camera-products.screen";

const ProductContainer = styled.View`
  align-items: center;
`;
export const AddProductScreen = ({ route, navigation }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [nameProduct, setNameProduct] = useState("");
  const [infoProduct, setInfoProduct] = useState("");
  const { isLoading } = useContext(AuthenticationContext);
  const [setIsLoading] = useState(false);
  const [setProductData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { selectedImage } = route.params || {};

  const db = getFirestore();
  const auth = getAuth();
  const onSaveProduct = async () => {
    const userRef = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userRef));
    const getLocUser = {
      address: userDoc.data().address,
      lat: userDoc.data().lat,
      lng: userDoc.data().lng,
    };
    console.log("selectedImage");
    //da a opção de troca, add a camera salva a foto
    try {
      const docRef = await getDoc(doc(db, "users", userRef));

      const createdAt = new Date();
      const productData = {
        photo: selectedImage,
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
  };
  //ao clicar em cadastrar poderia ir para a pagina de produtos cadastrados, e la ficava uma lista com todos os produtos cadastrados,
  //para subscrever o produto no banco de dados await setDoc(collection(db, "Product"), productData); *nao lembro se é assim mesmo, mas usa o setDoc*
  //ai da pra colocar a funcionalidade dessa outra pag para editar os produtos, e mostrar como se fosse uma lista igual a pag de produtos que tem no inicio
  return (
    <ProfileBackground>
      <SafeArea>
        <Spacer size="extralarge">
          <ProductContainer>
            <TouchableOpacity
              onPress={() => navigation.navigate("CameraProductsScreen")}
            >
              {!selectedImage && (
                <Avatar.Icon
                  size={180}
                  icon="folder"
                  backgroundColor="#2182BD"
                />
              )}
              {selectedImage && (
                <Avatar.Image
                  size={180}
                  source={{ uri: "data:image/jpeg;base64," + selectedImage }}
                  backgroundColor="#2182BD"
                />
              )}
            </TouchableOpacity>
          </ProductContainer>
        </Spacer>

        <ProfileContainer>
          <Spacer size="medium">
            <Text> O que vc quer compartilhar? </Text>
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Nome"
              value={nameProduct}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(np) => setNameProduct(np)}
            />
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Fale mais sobre..."
              value={infoProduct}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(info) => setInfoProduct(info)}
            />
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Aceita troca? Pelo o que?"
              value={value}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(val) => setValue(val)}
            />
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Aceita dinheiro? Quanto?"
              value={value}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(val) => setValue(val)}
            />
          </Spacer>
          <Spacer size="medium">
            {!isLoading ? (
              <AuthButton
                icon="email"
                mode="contained"
                onPress={() => onSaveProduct()}
              >
                Cadastrar
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.blue300} />
            )}
          </Spacer>
          <Spacer>
            <ProfileButton mode="contained" onPress={() => navigation.goBack()}>
              Voltar
            </ProfileButton>
          </Spacer>
        </ProfileContainer>
      </SafeArea>
    </ProfileBackground>
  );
};
