import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { MapCallout } from "../components/map-callout.components";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../infrastructure/navigation/map.navigator";

type MapScreenProps = StackScreenProps<RootStackParamList, "MapBase">;

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewPort } = location;

  useEffect(() => {
    const northEastLat = viewPort.northeast.lat;
    const southWestLat = viewPort.southwest.lat;

    setLatDelta(northEastLat - southWestLat);
  }, [location, viewPort]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("Restaurant Detail", {
                    restaurant: restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};
