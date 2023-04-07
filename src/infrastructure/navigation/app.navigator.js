import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProductsNavigator } from "./products.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { ProfileNavigator } from "./profile.navigator";

import { ProductsContextProvider } from "../../resources/products/products.context";
import { LocationContextProvider } from "../../resources/location/location.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Produtos: "md-list-sharp",
  Localizacao: "md-map",
  Perfil: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <LocationContextProvider>
    <ProductsContextProvider>
      <Tab.Navigator
        screenOptions={
          ({ createScreenOptions },
          {
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
          })
        }
      >
        <Tab.Screen name="Produtos" component={ProductsNavigator} />
        <Tab.Screen name="Localizacao" component={MapScreen} />
        <Tab.Screen name="Perfil" component={ProfileNavigator} />
      </Tab.Navigator>
    </ProductsContextProvider>
  </LocationContextProvider>
);
