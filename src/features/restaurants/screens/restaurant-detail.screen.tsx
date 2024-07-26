import React from "react";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RouteProp } from "@react-navigation/native";
import { Restaurant } from "../../../services/restaurants/restaurants.context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./restaurants.screen";

// Define your route and params here
type RestaurantDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "Restaurant Detail"
>;

export const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
}) => {
  const { restaurant } = route.params;
  console.log(`route: ${route.name} ${route.key} ${route.path}`);
  console.log(`Detail: ${restaurant}`);
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
    </SafeArea>
  );
};
