import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { RestaurantInfoTranslated } from "../../features/restaurants/components/restaurant-info-card.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

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
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState<RestaurantInfoTranslated[]>([]);

  const saveFavorites = async (
    value: RestaurantInfoTranslated[],
    uid: string
  ) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {
      // saving error
      console.log("error saving", e);
    }
  };

  const loadFavorites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
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
    if (user) {
      loadFavorites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavorites(favorites, user.uid);
    }
  }, [favorites, user]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
