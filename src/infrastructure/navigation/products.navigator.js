import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { ProductsScreen } from "../../features/products/screens/products.screen";

const ProductStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStack.Navigator headerMode="none">
      <ProductStack.Screen name="Produtos" component={ProductsScreen} />
    </ProductStack.Navigator>
  );
};
