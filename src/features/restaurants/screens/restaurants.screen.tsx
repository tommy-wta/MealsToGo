import React from "react";
import { StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top:${StatusBar.currentHeight}px`};
`

const RestaurantListContainer = styled.View`
    flex: 1;
    padding: ${(props) => props.theme.space[3]};
    backgroundColor: ${(props) => props.theme.themeColors.ui.error};
`

export const RestaurantsScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <SafeArea>
        <SearchContainer>
          <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery}/>
        </SearchContainer>
        <RestaurantListContainer>
          <RestaurantInfoCard />
        </RestaurantListContainer>
      </SafeArea>
    )
}
    