import React, { createContext, useState, ReactNode, useRef } from "react";
import { loginRequest } from "./authentication.service";
import { getAuth, UserCredential } from "firebase/auth";

interface AuthenticationContextData {
  user: User | null;
  isLoading: boolean;
  error?: Error;
  onLogin: () => void;
}

interface User {}

interface AuthenticationContextProviderProps {
  children: ReactNode;
}

export const AuthenticationContext = createContext<AuthenticationContextData>({
  user: {},
  isLoading: false,
  error: Error("Error"),
  onLogin: () => {},
});

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserCredential | null>(null);
  const [error, setError] = useState(undefined);
  const auth = useRef(getAuth()).current;

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.toString());
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        error: error,
        onLogin: () => {},
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
