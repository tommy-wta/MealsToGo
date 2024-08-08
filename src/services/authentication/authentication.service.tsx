import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const loginRequest = (auth: Auth, email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerRequeast = (
  auth: Auth,
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
