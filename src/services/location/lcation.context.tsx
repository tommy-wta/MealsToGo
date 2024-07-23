import React, { useState, createContext, ReactNode, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";
import { locations, City } from "./location.mock";
import { err } from "react-native-svg";

export const LocationContext = createContext<LocationContextData>({
  isLoading: false,
  error: null,
  location: null,
  keyword: "",
  search: () => {},
});

interface LocationContextData {
  isLoading: boolean;
  error: any;
  location: GeoLocation | null;
  keyword: string;
  search: (searchTerm: string) => void;
}
interface LocationContextProviderProps {
  children: ReactNode;
}

interface GeoLocation {
  lat: number;
  lng: number;
}

export const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [keyword, setKeyword] = useState<string>("san francisco");
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <LocationContext.Provider
      value={{
        isLoading: isLoading,
        error: error,
        location: location,
        search: () => null,
        keyword: keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
