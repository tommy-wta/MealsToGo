import * as React from 'react';
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';

import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {
  const [oswaldFontLoaded] = useOswald({Oswald_400Regular})
  const [latoFontLoaded] = useLato({Lato_400Regular})

  if (!oswaldFontLoaded || !latoFontLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
      <RestaurantsScreen />
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
