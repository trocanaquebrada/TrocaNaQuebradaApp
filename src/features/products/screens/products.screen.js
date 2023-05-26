import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components";
import { ProductInfoCard } from "../components/product-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProductsContext } from "../../../resources/products/products.context";
import { Search } from "../components/search.component";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Spacer } from "../../../components/spacer/spacer.component";

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

export const ProductsScreen = ({ navigation }) => {
  const { isLoading } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const productSearch = async () => {
      const productCollectionRef = collection(db, "Product");
      const productsCollection = await getDocs(productCollectionRef);
      const productsData = productsCollection.docs.map((doc) => {
        const { nameProduct, lat, lng, userRef, id } = doc.data();
        return {
          name: nameProduct || "",
          latitude: lat || "",
          longitude: lng || "",
          ref: userRef || "",
          id: doc.id || "",
        };
      });
      setProducts(productsData);
    };
    productSearch();
  }, []);

  //pegar o produtos de todos os usuarios  salvo e trazer pra ca
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
