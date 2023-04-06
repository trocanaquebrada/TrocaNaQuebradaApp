import React from "react";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen
        options={{
          header: () => null,
        }}
        name="Perfil"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
