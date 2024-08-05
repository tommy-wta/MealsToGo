import React from "react";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
} from "../components/account.styles";

export const LoginScreen = () => {
  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer></AccountContainer>
      </AccountCover>
    </AccountBackground>
  );
};
