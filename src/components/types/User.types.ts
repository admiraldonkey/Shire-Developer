import type React from "react";

export type User = {
  name: string;
  theme: "light" | "dark";
};

export type UserState = {
  currentUser: User | null;
};

export type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_THEME"; payload: "light" | "dark" };

export type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

export type UserContextProviderProps = {
  children: React.ReactNode;
};
