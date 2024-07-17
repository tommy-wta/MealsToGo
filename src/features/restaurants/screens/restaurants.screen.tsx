import React from "react";
import { StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component"

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
` 

export const RestaurantsScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <SafeArea>
        <SearchContainer>
          <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery}/>
        </SearchContainer>
        <FlatList 
          data={[{name: "1"}, {name: "2"}]} 
          renderItem={() => <RestaurantInfoCard />}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{padding: 16}}
        />
        
          
      </SafeArea>
    )
}
    