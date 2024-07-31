import React, { FC } from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import openIcon from "../../../../assets/openIcon";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Address,
  RatingRow,
  RowSection,
  OpenStatus,
  TemporarilyCloseText,
  Icon,
} from "./restaurant-info-card.styles";
import { FavoriteIconButton } from "../../../components/favorites/favorite.component";

interface Restaurant {
  name?: string;
  icon?: string;
  photos?: string[];
  address?: string;
  isOpenNow?: boolean;
  ratings?: number;
  isClosedTemporarily?: boolean;
  placeId?: string;
}

interface RestaurantInfoProps {
  restaurant?: Restaurant;
}

export const RestaurantInfoCard: FC<RestaurantInfoProps> = ({
  restaurant = {},
}) => {
  const {
    name = "Example Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    ratings = 4,
    isClosedTemporarily = true,
    placeId = "some-id",
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(ratings)));

  return (
    <RestaurantCard elevation={5}>
      <FavoriteIconButton />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <RowSection>
          <RatingRow>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </RatingRow>
          <OpenStatus>
            {isClosedTemporarily && (
              <TemporarilyCloseText>CLOSED TEMPORARILY</TemporarilyCloseText>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={openIcon} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </OpenStatus>
        </RowSection>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
