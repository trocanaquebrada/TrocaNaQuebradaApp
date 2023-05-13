import React, { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  ProfileBackground,
  ProfileContainer,
  ProfileInput,
  ProfileButton,
} from "../components/profile.styles";

export const AddProductScreen = ({ navigation }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [infoProduct, setinfoProduct] = useState("");

  return (
    <ProfileBackground>
      <SafeArea>
        <ProfileContainer>
          <Spacer size="medium">
            <Text> Cadastrar Produto: </Text>
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Nome Produto"
              value={nameProduct}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(np) => setNameProduct(np)}
            />
          </Spacer>
          <Spacer size="small">
            <ProfileInput
              label="Descricao"
              value={infoProduct}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(info) => setinfoProduct(info)}
            />
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
