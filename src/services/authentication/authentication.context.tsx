import React, { createContext, useState, ReactNode, useRef } from "react";
import { loginRequest, registerRequest } from "./authentication.service";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";

interface AuthenticationContextData {
  user: User | null;
  isLoading: boolean;
  error?: string;
  isAuthenticated: boolean;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => void;
  onLogout: () => void;
}

interface AuthenticationContextProviderProps {
  children: ReactNode;
}

export const AuthenticationContext = createContext<AuthenticationContextData>({
  user: null,
  isLoading: false,
  error: "Error",
  isAuthenticated: false,
  onLogin: () => {},
  onRegister: () => {},
  onLogout: () => {},
});

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const auth = useRef(getAuth()).current;

  auth.onAuthStateChanged((usr) => {
    if (usr) {
      console.log(`printing usr: ${usr}`);
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((user) => {
        setUser(user.user);
        setIsLoading(false);
        console.log("Login success");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.toString());
        console.log(`Error logging in: ${error.toString()}`);
      });
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match!");
      return;
    } else {
      registerRequest(auth, email, password)
        .then((user) => {
          setUser(user.user);
          setIsLoading(false);
          console.log("Login success");
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.toString());
          console.log(`Error logging in: ${error.toString()}`);
        });
    }
  };

  const onLogout = async () => {
    console.log("signing out of auth");
    try {
      await signOut(auth);
      console.log("signed out successfully");
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        error: error,
        isAuthenticated: !!user,
        onLogin: onLogin,
        onRegister: onRegister,
        onLogout: onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
