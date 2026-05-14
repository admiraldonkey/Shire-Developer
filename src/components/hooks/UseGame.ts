import { useContext } from "react";
import { GameContext } from "../context/Contexts";

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameState must be used inside GameProvider");
  }
  return context.state;
};

export const useGameDispatch = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameDispatch must be used inside GameProvider");
  }
  return context.dispatch;
};
