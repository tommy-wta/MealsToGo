import React, { FC } from "react";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import openIcon from "../../../../assets/openIcon";
import { View, Image } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";

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

const RatingRow =  styled.View`
    flex-direction: row;
    padding-top: ${(props) => props.theme.space[2]};
    padding-bottom: ${(props) => props.theme.space[2]};
`

const OpenStatus = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

const RowSection = styled.View`
    flex-direction: row;
    align-items: center;
`

const TemporarilyCloseText = styled.Text`
    color: red;
    variant: label;
`
  
interface Restaurant {
    name?: string;
    icon?: string;
    photos?: string[];
    address?: string;
    isOpenNow?: boolean;
    ratings?: number;
    isClosedTemporarily?: boolean;
}

interface RestaurantInfoProps {
    restaurant?: Restaurant;
}

export const RestaurantInfoCard: FC<RestaurantInfoProps> = ({ restaurant = {} }) => {
    const {
        name = "Example Restaurant",
        icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        photos = ["https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",],
        address = "100 some random street",
        isOpenNow = true,
        ratings = 4,
        isClosedTemporarily = true
    } = restaurant;

    const ratingArray = Array.from(new Array(Math.floor(ratings)))

    return(
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{uri: photos[0]}}/>
            <Info>
                <Title>{name}</Title>
                <RowSection>
                    <RatingRow>
                        {ratingArray.map((_, i) => (
                            <SvgXml key={i} xml={star} width={20} height={20}/> 
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
                            <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
                        </Spacer>
                    </OpenStatus>
                </RowSection>
                <Address>{address}</Address>
            </Info>
        </RestaurantCard>
    )
}
