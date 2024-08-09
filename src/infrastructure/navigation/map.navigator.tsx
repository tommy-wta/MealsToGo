import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MapScreen } from "../../features/map/screens/map.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import { RestaurantInfoTranslated } from "../../features/restaurants/components/restaurant-info-card.component";

const MapStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MapBase: undefined; // if no parameters for this screen
  "Restaurant Detail": { restaurant: RestaurantInfoTranslated }; // replace 'Restaurant' with the type of your restaurant object
};

export const MapNavigator = () => {
  return (
    <MapStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <MapStack.Screen
        options={{ headerTitle: "Map" }}
        name="MapBase"
        component={MapScreen}
      />
      <MapStack.Screen
        name="Restaurant Detail"
        component={RestaurantDetailScreen}
      />
    </MapStack.Navigator>
  );
};
