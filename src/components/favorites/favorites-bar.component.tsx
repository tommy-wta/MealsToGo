import React from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Restaurant } from "../../services/restaurants/restaurants.context";
import { CompactRestaurantInfo } from "../../features/map/components/compact-restaurant-info.component";
import { Spacer } from "../spacer/spacer.component";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../features/restaurants/screens/restaurants.screen";
import { Text } from "../typography/text.component";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const FavoritesWrapper = styled.View`
  padding: 10px;
`;

interface FavoritesBarProps {
  favorites: Restaurant[];
  goToDetail: NavigationProp["navigate"];
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  favorites,
  goToDetail,
}) => {
  if (!favorites.length) {
    return null;
  }
  return (
    <FavoritesWrapper>
      <Spacer>
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer position="left" size="medium" key={key}>
              <TouchableOpacity
                onPress={() =>
                  goToDetail("Restaurant Detail", {
                    restaurant: restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoritesWrapper>
  );
};
