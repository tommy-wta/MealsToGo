import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/infrastructure/navigation";
import { getApps, initializeApp } from "firebase/app";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFsFV2gDyFMDHSU7ND3lzZ6ZxYxDtMEik",
  authDomain: "mealstogo-672b1.firebaseapp.com",
  projectId: "mealstogo-672b1",
  storageBucket: "mealstogo-672b1.appspot.com",
  messagingSenderId: "493984229103",
  appId: "1:493984229103:web:7b8b37861816251ccc5d1a",
};

if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldFontLoaded] = useOswald({ Oswald_400Regular });
  const [latoFontLoaded] = useLato({ Lato_400Regular });

  if (!oswaldFontLoaded || !latoFontLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    padding: 16,
  },
});
