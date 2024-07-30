import React, { useState, createContext, ReactNode, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";
import { locations, City } from "./location.mock";
import { err } from "react-native-svg";

const mapInfo: MapInfo = {
  lat: 41.88758823029149,
  lng: -87.6194830697085,
  viewPort: {
    northeast: {
      lat: 41.88758823029149,
      lng: -87.6194830697085,
    },
    southwest: {
      lat: 41.88489026970849,
      lng: -87.6221810302915,
    },
  },
};

export const LocationContext = createContext<LocationContextData>({
  isLoading: false,
  error: null,
  location: mapInfo,
  keyword: "",
  search: () => {},
});

interface LocationContextData {
  isLoading: boolean;
  error: any;
  location: MapInfo;
  keyword: string;
  search: (searchTerm: string) => void;
}
interface LocationContextProviderProps {
  children: ReactNode;
}

interface ViewPort {
  northeast: GeoLocation;
  southwest: GeoLocation;
}

interface GeoLocation {
  lat: number;
  lng: number;
}

interface MapInfo {
  lat: number;
  lng: number;
  viewPort: ViewPort;
}

export const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [keyword, setKeyword] = useState<string>("san francisco");
  const [location, setLocation] = useState<MapInfo>(mapInfo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading: isLoading,
        error: error,
        location: location,
        search: onSearch,
        keyword: keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
