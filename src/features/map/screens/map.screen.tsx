import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewPort } = location;

  useEffect(() => {
    console.log(viewPort.northeast);
    console.log(viewPort.southwest);

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
            ></Marker>
          );
        })}
      </Map>
    </>
  );
};
