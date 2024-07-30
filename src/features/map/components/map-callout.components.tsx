import React from "react";
import { Restaurant } from "../../../services/restaurants/restaurants.context";

import { CompactRestaurantInfo } from "./compact-restaurant-info.component";

interface MapCalloutProps {
  restaurant: Restaurant;
}

export const MapCallout: React.FC<MapCalloutProps> = ({ restaurant }) => {
  return <CompactRestaurantInfo restaurant={restaurant} />;
};
