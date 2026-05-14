import { useReducer, type ReactNode } from "react";
import { gameReducer, initialGameState } from "../reducers/GameReducer";
import { GameStateContext, GameDispatchContext } from "./Contexts";

type Props = {
  children: ReactNode;
};

export const GameProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
