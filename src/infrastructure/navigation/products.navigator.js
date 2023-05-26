import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ProductsScreen } from "../../features/products/screens/products.screen";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";

const ProductStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerMode: "none",
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ProductStack.Screen name="ProductsPage" component={ProductsScreen} />
      <ProductStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
    </ProductStack.Navigator>
  );
};
