import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const RestaurantCard = styled(Card)`
    backgroundColor: ${(props) => props.theme.themeColors.background.primary};
`

export const RestaurantCardCover = styled(Card.Cover)`
    font-family: ${(props) => props.theme.themeFonts.body};
    padding: ${(props) => props.theme.space[3]};
    backgroundColor: ${(props) => props.theme.themeColors.background.primary};
`

export const Info =  styled.View`
    padding: ${(props) => props.theme.space[3]};
`

export const Address = styled.Text`
    font-family: ${(props) => props.theme.themeFonts.body};
    font-size: ${(props) => props.theme.themeFontSizes.caption};
    color: ${(props) => props.theme.themeColors.ui.secondary};
`

export const RatingRow =  styled.View`
    flex-direction: row;
    padding-top: ${(props) => props.theme.space[2]};
    padding-bottom: ${(props) => props.theme.space[2]};
`

export const OpenStatus = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

export const RowSection = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TemporarilyCloseText = styled.Text`
    color: red;
    variant: label;
`
  
export const Icon = styled.Image`
    width: 15px;
    height: 15px;
` 