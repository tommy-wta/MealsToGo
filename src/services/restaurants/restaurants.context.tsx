import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  ReactNode,
  useContext,
} from "react";

import { restaurantsRequest, restaurantTransform } from "./restaurants.service";
import { LocationContext } from "../location/location.context";

interface ViewPort {
  northeast: GeoLocation;
  southwest: GeoLocation;
}

interface GeoLocation {
  lat: number;
  lng: number;
}

interface RestaurantGeometry {
  location: GeoLocation;
  viewport: ViewPort;
}

export interface Restaurant {
  name: string;
  rating?: number; // Rating is now optional
  vicinity: string;
  opening_hours?: { open_now: boolean };
  business_status?: string;
  photos: string[];
  geometry: RestaurantGeometry;
}

interface RestaurantContextData {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: any; // you should replace 'any' with the type of your error
}

interface RestaurantsContextProviderProps {
  children: ReactNode;
}

export const RestaurantsContext = createContext<RestaurantContextData>({
  restaurants: [],
  isLoading: false,
  error: null,
});

export const RestaurantsContextProvider = ({
  children,
}: RestaurantsContextProviderProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (inputLocation: string) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(inputLocation)
        .then(restaurantTransform)
        .then((result) => {
          setIsLoading(false);
          setRestaurants(result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      console.log(`location: ${location}`);
      const locationString = `${location?.lat},${location?.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants, // This should be an array of restaurant objects
        isLoading: isLoading,
        error: error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
