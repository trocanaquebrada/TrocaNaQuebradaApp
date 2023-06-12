import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components";
import { ProductInfoCard } from "../components/product-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductsContext } from "../../../resources/products/products.context";
import { Search } from "../components/search.component";
import { collection, getDocs } from "firebase/firestore";
import { Spacer } from "../../../components/spacer/spacer.component";
import { db } from "../../../utils/firebase/firebase.utils";
import { productsRequest } from "../../../resources/products/products.resource";

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

console.log("productScrean");
export const ProductsScreen = ({ navigation }) => {
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
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <ProductInfoCard product={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
