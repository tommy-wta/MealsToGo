import React, { useContext } from "react";
import styled from "styled-components/native";
import { FavoritesContext } from "../../services/favorites/favorites.context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

export const FavoriteIconButton = () => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  return (
    <FavoriteButton>
      <AntDesign name="hearto" size={24} />
    </FavoriteButton>
  );
};
