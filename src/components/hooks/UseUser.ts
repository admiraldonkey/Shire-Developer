import { useContext } from "react";
import { UserContext } from "../context/Contexts";

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserState must be used inside UserProvider");
  return context.state;
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserDispatch must be used inside UserProvider");
  return context.dispatch;
};
