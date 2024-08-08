import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MyTabs } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MyTabs /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
