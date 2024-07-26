import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { theme } from "../../../infrastructure/theme";
import { Search } from "../components/search.component";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Restaurant } from "../../../services/restaurants/restaurants.context";
import { StackScreenProps } from "@react-navigation/stack";

const Loading = styled(ActivityIndicator)``;

export type RootStackParamList = {
  Restaurants: undefined; // if no parameters for this screen
  "Restaurant Detail": { restaurant: Restaurant }; // replace 'Restaurant' with the type of your restaurant object
};

type RestaurantsScreenProps = StackScreenProps<
  RootStackParamList,
  "Restaurants"
>;

export const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  console.log(error);
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
      <Search />
      <FlatList
        data={restaurants}
        renderItem={({ item }) => {
          console.log(`Item: ${item.name}`);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Restaurant Detail", { restaurant: item })
              }
            >
              <RestaurantInfoCard restaurant={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
