import React from "react";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { CameraScreen } from "../../features/profile/screens/camera.screen";
import { AddProductScreen } from "../../features/profile/screens/addproduct.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerMode: "none",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen name="PerfilPage" component={ProfileScreen} />
      <ProfileStack.Screen name="Camera" component={CameraScreen} />
      <ProfileStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
      />
    </ProfileStack.Navigator>
  );
};
