import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { RestaurantInfoTranslated } from "../../restaurants/components/restaurant-info-card.component";

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
  restaurant: RestaurantInfoTranslated;
  isMap: boolean;
}

interface ImageProps {
  source: {
    uri: string;
  };
  isMap: boolean;
}

export const CompactImage: React.FC<ImageProps> = ({ source, isMap }) => {
  return isAndroid ? (
    <CompactWebview source={source} />
  ) : (
    <CompactIcon source={source} />
  );
};

export const CompactRestaurantInfo: React.FC<MapCalloutProps> = ({
  restaurant,
  isMap,
}) => {
  return (
    <ContainerView>
      <CompactImage source={{ uri: restaurant.photos[0] }} isMap={isMap} />
      <MyText>{restaurant.name}</MyText>
    </ContainerView>
  );
};
