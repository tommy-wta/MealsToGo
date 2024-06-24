import React, { FC } from "react";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

const Title = styled.Text`
    font-family: ${(props) => props.theme.themeFonts.heading};
    font-size: ${(props) => props.theme.themeFontSizes.body};
    color: ${(props) => props.theme.themeColors.ui.primary};
`;

const RestaurantCard = styled(Card)`
    backgroundColor: ${(props) => props.theme.themeColors.background.primary};
`

const RestaurantCardCover = styled(Card.Cover)`
    font-family: ${(props) => props.theme.themeFonts.body};
    padding: ${(props) => props.theme.space[3]};
    backgroundColor: ${(props) => props.theme.themeColors.background.primary};
`

const Info =  styled.View`
    padding: ${(props) => props.theme.space[3]};
`

const Address = styled.Text`
    font-family: ${(props) => props.theme.themeFonts.body};
    font-size: ${(props) => props.theme.themeFontSizes.caption};
    color: ${(props) => props.theme.themeColors.ui.secondary};
`
  
interface Restaurant {
    name?: string;
    icon?: string;
    photos?: string[];
    address?: string;
    openingHours?: boolean;
    ratings?: number;
    isClosedTemporarily?: boolean;
}

interface RestaurantInfoProps {
    restaurant?: Restaurant;
}

export const RestaurantInfoCard: FC<RestaurantInfoProps> = ({ restaurant = {} }) => {
    const {
        name = "Example Restaurant",
        icon,
        photos = ["https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",],
        address = "100 some random street",
        openingHours = true,
        ratings = 4,
        isClosedTemporarily
    } = restaurant;

    return(
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{uri: photos[0]}}/>
            <Info>
                <Title>{name}</Title>
                <Address>{address}</Address>
            </Info>
        </RestaurantCard>
    )
}
