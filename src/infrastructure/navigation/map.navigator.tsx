import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MapScreen } from "../../features/map/screens/map.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import { Restaurant } from "../../services/restaurants/restaurants.context";

const MapStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Map: undefined; // if no parameters for this screen
  "Restaurant Detail": { restaurant: Restaurant }; // replace 'Restaurant' with the type of your restaurant object
};

export const MapNavigator = () => {
  return (
    <MapStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen
        name="Restaurant Detail"
        component={RestaurantDetailScreen}
      />
    </MapStack.Navigator>
  );
};
