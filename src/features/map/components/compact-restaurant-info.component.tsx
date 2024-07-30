import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { Restaurant } from "../../../services/restaurants/restaurants.context";
import WebView from "react-native-webview";

const MyText = styled.Text``;

const ContainerView = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const CompactIcon = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const isAndroid = Platform.OS === "android";

interface MapCalloutProps {
  restaurant: Restaurant;
}

interface ImageProps {
  source: {
    uri: string;
  };
}

const CompactImage: React.FC<ImageProps> = ({ source }) => {
  return isAndroid ? (
    <CompactWebview source={source} />
  ) : (
    <CompactIcon source={source} />
  );
};

export const CompactRestaurantInfo: React.FC<MapCalloutProps> = ({
  restaurant,
}) => {
  return (
    <ContainerView>
      <CompactImage source={{ uri: restaurant.photos[0] }} />
      <MyText>{restaurant.name}</MyText>
    </ContainerView>
  );
};
