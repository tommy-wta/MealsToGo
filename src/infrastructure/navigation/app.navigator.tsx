import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsNavigator } from "./restaurant.navigator";
import { MapNavigator } from "./map.navigator";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

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
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
