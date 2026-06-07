import type React from "react";

export type User = {
  name: string;
};

export type UserState = {
  currentUser: User | null;
};

export type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "DELETE" };

export type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

export type UserContextProviderProps = {
  children: React.ReactNode;
};
