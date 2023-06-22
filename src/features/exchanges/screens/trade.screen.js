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
              onPress={() => navigation.navigate("ChatScreen")}
            >
              Ir para o Chat
            </TradeButton>
          </Spacer>
        </TradeContainer>
      </SafeArea>
    </TradeBackground>
  );
};
