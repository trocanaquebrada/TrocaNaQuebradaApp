import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { Ionicons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";

import { ProductsNavigator } from "./products.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { ProfileNavigator } from "./profile.navigator";

import { ProductsContextProvider } from "../../resources/products/products.context";
import { LocationContextProvider } from "../../resources/location/location.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Produtos: ["md-list", 24, "black"],
  Localizacao: "md-map",
  Perfil: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: colors.ui.primary,
    tabBarInactiveTintColor: colors.ui.secondary,
  };
};

export const AppNavigator = () => (
  <LocationContextProvider>
    <ProductsContextProvider>
      <Tab.Navigator
        screenOptions={{
          headerMode: "none",
          headerShown: false,
          BottomTabNavigationOptions: createScreenOptions,
        }}
      >
        <Tab.Screen
          name="Produtos"
          component={ProductsNavigator}
          options={{
            tabBarIcon: () => (
              <Ionicons name="list" color={colors.bg.secondary} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Localizacao"
          component={MapScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons name="map" color={colors.bg.secondary} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileNavigator}
          options={{
            tabBarIcon: () => (
              <Ionicons name="body" color={colors.bg.secondary} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </ProductsContextProvider>
  </LocationContextProvider>
);
