/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from "react";
import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import { List } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const ProfileScreen = ({ navigation }) => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <List.Section>
        <List.Item
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ padding: 16 }}
          title="Sair"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
        <List.Item
        //nome
        //foto
        //cpf
        //endereco
        //celular
        // **rating
        // **cadastro produtos
        />
      </List.Section>
    </SafeArea>
  );
};
