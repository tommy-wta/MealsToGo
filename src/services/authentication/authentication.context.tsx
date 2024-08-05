import React, { createContext, useState, ReactNode, useRef } from "react";
import { loginRequest } from "./authentication.service";
import { getAuth, UserCredential } from "firebase/auth";

interface AuthenticationContextData {
  user: User | null;
  isLoading: boolean;
  error?: string;
  isAuthenticated: boolean;
  onLogin: (email: string, password: string) => void;
}

interface User {}

interface AuthenticationContextProviderProps {
  children: ReactNode;
}

export const AuthenticationContext = createContext<AuthenticationContextData>({
  user: {},
  isLoading: false,
  error: "Error",
  isAuthenticated: false,
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
        console.log("Login success");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.toString());
        console.log(`Error logging in: ${error.toString()}`);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        error: error,
        isAuthenticated: !!user,
        onLogin: onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
