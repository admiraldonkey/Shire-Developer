import { type GameAction, type GameState } from "../types/Game.types";

export const initialGameState: GameState = {
  hobbits: 0,
  hobbitsPerSecond: 0,
  clickPower: 1,
  upgrades: [],
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case "SET_UPGRADES":
      return {
        ...state,
        upgrades: action.payload,
      };
    default:
      return state;
  }
};
