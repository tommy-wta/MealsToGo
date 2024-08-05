import React from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/account.styles";
import { AccountScreenProps } from "../../../infrastructure/navigation/account.navigator";
import { Spacer } from "../../../components/spacer/spacer.component";

export const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
