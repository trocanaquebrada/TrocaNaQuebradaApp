import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components";
import { ProductInfoCard } from "../components/product-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductsContext } from "../../../resources/products/products.context";
import { Search } from "../components/search.component";

const ProductList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ProductsScreen = () => {
  const { isLoading, products } = useContext(ProductsContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.blue300} />
        </LoadingContainer>
      )}

      <Search />

      <ProductList
        data={products}
        renderItem={({ item }) => <ProductInfoCard product={item} />}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
