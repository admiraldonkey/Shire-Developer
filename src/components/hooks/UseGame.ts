import { useContext } from "react";
import { GameDispatchContext, GameStateContext } from "../context/Contexts";

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used inside GameProvider");
  }
  return context;
};

export const useGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (!context) {
    throw new Error("useGameDispatch must be used inside GameProvider");
  }
  return context;
};
