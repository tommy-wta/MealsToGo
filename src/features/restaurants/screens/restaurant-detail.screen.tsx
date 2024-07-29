import React, { useState } from "react";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./restaurants.screen";
import { List } from "react-native-paper";
import { ScrollView } from "react-native";

// Define your route and params here
type RestaurantDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "Restaurant Detail"
>;

export const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
}) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(true);
  const [lunchExpanded, setLunchExpanded] = useState(true);
  const [dinnerExpanded, setDinnerExpanded] = useState(true);
  const [drinksExpanded, setDrinksExpanded] = useState(true);

  const { restaurant } = route.params;
  console.log(`route: ${route.name} ${route.key} ${route.path}`);
  console.log(`Detail: ${restaurant}`);
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="First Breakfast item" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="First Lunch item" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="First Dinner item" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="First Drinks item" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
