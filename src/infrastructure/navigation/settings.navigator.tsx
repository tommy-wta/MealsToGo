import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { FavoritesScreen } from "../../features/settings/screens/favorites.screen";

const SettingsStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  SettingsBase: undefined; // if no parameters for this screen
  Favorites: undefined;
};

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="SettingsBase"
        component={SettingsScreen}
      />

      <SettingsStack.Screen
        options={{ header: () => null }}
        name="Favorites"
        component={FavoritesScreen}
      />
    </SettingsStack.Navigator>
  );
};
