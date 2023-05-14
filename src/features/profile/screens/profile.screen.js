import React, { useContext, useEffect, useState } from "react";
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

const ProfileItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const ProfileScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };
  useEffect(() => {
    getProfilePicture(user);
  }, [user]);

  return (
    <ProfileBackground>
      <SafeArea>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo && (
              <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
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
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <ProfileContainer>
            <Spacer size="medium">
              <Text> Ola {user.displayName} </Text>
            </Spacer>
            <Spacer size="medium">
              <ProfileButton
                mode="contained"
                onPress={() => navigation.navigate("AddProductScreen")}
              >
                Cadastrar Produto/Servico
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
