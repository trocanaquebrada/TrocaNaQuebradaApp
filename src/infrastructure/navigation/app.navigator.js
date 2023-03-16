import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

import { SafeArea } from "../../components/utility/safe-area.component";

import { ProductsNavigator } from "./products.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Produtos: "md-list-sharp",
  Servicos: "list-circle",
  Mapa: "md-map",
  Configuracoes: "md-settings",
};

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <NavigationContainer>
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
      <Tab.Screen name="Configuracoes" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>
);
