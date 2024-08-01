import React, { createContext, ReactNode, useState, useEffect } from "react";
import { RestaurantInfoTranslated } from "../../features/restaurants/components/restaurant-info-card.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesContextData {
  favorites: RestaurantInfoTranslated[];
  addToFavorites: (restaurant: RestaurantInfoTranslated) => void;
  removeFromFavorites: (restaurant: RestaurantInfoTranslated) => void;
}

interface FavoritesContextProviderProps {
  children: ReactNode;
}

export const FavoritesContext = createContext<FavoritesContextData>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProviderProps) => {
  const [favorites, setFavorites] = useState<RestaurantInfoTranslated[]>([]);

  const saveFavorites = async (value: RestaurantInfoTranslated[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      // saving error
      console.log("error saving", e);
    }
  };

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favorites");
      if (value !== null) {
        // value previously stored
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log("error loading", e);
    }
  };

  const add = (restaurant: RestaurantInfoTranslated) => {
    setFavorites([...favorites, restaurant]);
  };

  const remove = (restaurant: RestaurantInfoTranslated) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
