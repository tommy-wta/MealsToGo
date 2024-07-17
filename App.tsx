import * as React from 'react';
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeArea  } from './src/components/utility/safe-area.component';
import { Ionicons } from '@expo/vector-icons'

import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

const HomeScreen = () => {
  return (
    <>
      <SafeArea>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      </SafeArea>
    </>
  );
}

const SettingsScreen = () => {
  return (
    <>
      <SafeArea>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      </SafeArea>
    </>
  );
}

const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          } else if (route.name === 'Restaurants') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color}/>
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [oswaldFontLoaded] = useOswald({Oswald_400Regular})
  const [latoFontLoaded] = useLato({Lato_400Regular})

  if (!oswaldFontLoaded || !latoFontLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      </ThemeProvider>
      
      < ExpoStatusBar style='auto'/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    padding: 16,
  }
});
