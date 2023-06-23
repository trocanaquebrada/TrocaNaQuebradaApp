import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ProductsScreen } from "../../features/products/screens/products.screen";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";
import { TradeScreen } from "../../features/exchanges/screens/trade.screen";
import { ChatsScreen } from "../../features/chat/screens/chats.screen";
import { ChatScreen } from "../../features/chat/screens/chat.screen";
import { CameraProductsScreen } from "../../features/profile/screens/camera-products.screen";

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
      <ProductStack.Screen
        name="CameraProductsScreen"
        component={CameraProductsScreen}
      />
      <ProductStack.Screen name="TradeScreen" component={TradeScreen} />
      <ProductStack.Screen name="ChatsScreen" component={ChatsScreen} />
      <ProductStack.Screen name="ChatScreen" component={ChatScreen} />
    </ProductStack.Navigator>
  );
};
