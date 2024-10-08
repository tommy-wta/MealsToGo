import React, { useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { theme } from "../../../infrastructure/theme";
import { Search } from "../components/search.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { RestaurantInfoTranslated } from "../components/restaurant-info-card.component";
import { FadeInView } from "../../../components/animations/fade.animation";

const Loading = styled(ActivityIndicator)``;

export type RootStackParamList = {
  RestaurantsBase: undefined;
  "Restaurant Detail": { restaurant: RestaurantInfoTranslated };
};

export type RestaurantsScreenProps = StackScreenProps<
  RootStackParamList,
  "RestaurantsBase"
>;

export const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
}) => {
  const { favorites } = useContext(FavoritesContext);
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Loading
            size={50}
            animating={true}
            color={theme.themeColors.ui.loading}
          />
        </View>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} goToDetail={navigation.navigate} />
      )}
      <FlatList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Restaurant Detail", { restaurant: item })
              }
            >
              <FadeInView>
                <RestaurantInfoCard restaurant={item} />
              </FadeInView>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
