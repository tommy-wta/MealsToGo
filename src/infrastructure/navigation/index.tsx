import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MyTabs } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return isAuthenticated ? <MyTabs /> : <AccountNavigator />;
};
