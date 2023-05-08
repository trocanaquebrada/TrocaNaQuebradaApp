import React, { useContext, useState } from "react";
import styled from "styled-components";
import { List, Avatar } from "react-native-paper";

import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  ProfileInput,
  ProfileBackground,
  ProfileContainer,
  Title,
} from "../components/profile.styles";

const ProfileItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const ProfileScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    //retornar o tamanho do icone de avatar pra 180
    <ProfileBackground>
      <SafeArea>
        <AvatarContainer>
          <Avatar.Icon size={90} icon="human" backgroundColor="#2182BD" />
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <ProfileContainer>
            <Title> Dados Pessoais </Title>
            <ProfileInput
              label="Nome Completo"
              value={name}
              onChangeText={(n) => setName(n)}
            />
            <ProfileInput
              label="CPF"
              value={cpf}
              onChangeText={(c) => setCpf(c)}
            />
            <ProfileInput
              label="Endereco"
              value={address}
              onChangeText={(ad) => setAddress(ad)}
            />
            <ProfileInput
              label="Celular"
              value={phone}
              onChangeText={(cel) => setPhone(cel)}
            />
          </ProfileContainer>

          <ProfileItem
            title="Sair"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
          <ProfileItem
          // **rating
          // **cadastro produtos
          />
        </List.Section>
      </SafeArea>
    </ProfileBackground>
  );
};
