import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { StackScreenProps } from "@react-navigation/stack";

const Stack = createStackNavigator<AccountRootStackParamList>();

export type AccountRootStackParamList = {
  AccountScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type AccountScreenProps = StackScreenProps<
  AccountRootStackParamList,
  "AccountScreen"
>;

export type LoginScreenProps = StackScreenProps<
  AccountRootStackParamList,
  "LoginScreen"
>;

export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
