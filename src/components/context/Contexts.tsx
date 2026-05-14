import { createContext, type Dispatch } from "react";
import type { UserContextType } from "./User.types";
import type { GameAction, GameState } from "../reducers/Game.types";

export const UserContext = createContext({} as UserContextType);
export const GameStateContext = createContext<GameState | null>(null);
export const GameDispatchContext = createContext<Dispatch<GameAction> | null>(
  null,
);
