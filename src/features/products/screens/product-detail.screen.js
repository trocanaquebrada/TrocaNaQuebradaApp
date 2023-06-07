import React from "react";

import { ProductInfoCard } from "../components/product-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductButton } from "../components/product-info-card.styles";

export const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <SafeArea>
      <ProductInfoCard product={product} />
      <Spacer size="medium">
        <ProductButton
          mode="contained"
          onPress={() => navigation.navigate("TradeScreen")}
        >
          Quero Trocar
        </ProductButton>
      </Spacer>
    </SafeArea>
  );
};
