import React, { createContext, ReactNode, useState } from "react";
import { Restaurant } from "../../features/restaurants/components/restaurant-info-card.component";

interface FavoritesContextData {
  favorites: Restaurant[];
  addToFavorites: (restaurant: Restaurant) => void;
  removeFromFavorites: (restaurant: Restaurant) => void;
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
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  const add = (restaurant: Restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

  const remove = (restaurant: Restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
