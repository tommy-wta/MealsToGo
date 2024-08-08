import { Ionicons } from "@expo/vector-icons";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";
import { RestaurantsNavigator } from "./restaurant.navigator";
import { MapNavigator } from "./map.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <>
      <SafeArea>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Settings!</Text>
          <Button title={"Logout"} onPress={() => onLogout()} />
        </View>
      </SafeArea>
    </>
  );
};

export const MyTabs = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = "";
                if (route.name === "Map") {
                  iconName = focused ? "map" : "map-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "cog" : "cog-outline";
                } else if (route.name === "Restaurants") {
                  iconName = focused ? "restaurant" : "restaurant-outline";
                }
                return (
                  <Ionicons name={iconName as any} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapNavigator} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
