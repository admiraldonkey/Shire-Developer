import { useReducer } from "react";
import { UserContext } from "./Contexts";
import { userReducer, initialUserState } from "../reducers/UserReducer";
import { type UserContextProviderProps } from "../../types/User.types";

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Consider adding theme to user context (and save to local storage)
