import React from "react";

import { ProductInfoCard } from "../components/product-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";

export const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  return (
    <SafeArea>
      <ProductInfoCard product={product} />
    </SafeArea>
  );
};
