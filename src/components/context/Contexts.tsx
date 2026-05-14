import { createContext } from "react";
import type { UserContextType } from "../types/User.types";
import type { GameContextType } from "../types/Game.types";

// export const UserContext = createContext({} as UserContextType);
export const UserContext = createContext<UserContextType | null>(null);
export const GameContext = createContext<GameContextType | null>(null);
// export const GameStateContext = createContext<GameState | null>(null);
// export const GameDispatchContext = createContext<Dispatch<GameAction> | null>(
//   null,
// );
