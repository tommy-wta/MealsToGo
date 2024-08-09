import React, { useContext } from "react";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../infrastructure/navigation/settings.navigator";
import { List } from "react-native-paper";
import { CompactImage } from "../../map/components/compact-restaurant-info.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

type FavoritesScreenProps = StackScreenProps<RootStackParamList, "Favorites">;

export const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
  const { favorites } = useContext(FavoritesContext);
  return !favorites.length ? (
    <SafeArea style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>No Favorites Found</Text>
    </SafeArea>
  ) : (
    <List.Section>
      {favorites.map((restaurant) => {
        const restaurantName = restaurant.name;
        const restaurantIcon = restaurant.photos[0];
        return (
          <List.Item
            title={restaurantName}
            left={(props) => (
              <CompactImage source={{ uri: restaurantIcon }} isMap={false} />
            )}
          />
        );
      })}
    </List.Section>
  );
};
