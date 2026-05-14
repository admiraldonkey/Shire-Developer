import { useState } from "react";
import { UserContext } from "./Contexts";
import { type User, type UserContextProviderProps } from "./User.types";

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Consider adding theme to user context (and save to local storage)
