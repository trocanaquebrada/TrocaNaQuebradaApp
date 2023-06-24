import React from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  TradeBackground,
  TradeContainer,
  TradeButton,
} from "../components/trade.styles";
import { Spacer } from "../../../components/spacer/spacer.component";

export const TradeScreen = ({ navigation }) => {
  const currentUser = 32;
  const handleGoToChat = () => {
    const chat = {
      id: 3, // ID do chat desejado
      users: [
        {
          id: 32,
          phone: "+5511999882323",
        },
        {
          id: 99,
          phone: "+5532988882222",
        },
      ],
      messages: [], // Array vazio para as mensagens
    };
    navigation.navigate("ChatScreen", {
      ...chat,
      currentUser,
    });
  };
  console.log("aqui");
  return (
    <TradeBackground>
      <SafeArea>
        <TradeContainer>
          <Spacer size="large">
            <Text> Solicitacao de troca enviada </Text>
          </Spacer>
          <Spacer size="large">
            <TradeButton
              mode="contained"
              onPress={handleGoToChat} // Utilize a função handleGoToChat para navegar para a tela ChatScreen
            >
              Ir para o Chat
            </TradeButton>
          </Spacer>
        </TradeContainer>
      </SafeArea>
    </TradeBackground>
  );
};
