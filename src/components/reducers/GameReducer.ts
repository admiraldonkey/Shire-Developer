import { type GameAction, type GameState } from "./Game.types";

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
    default:
      return state;
  }
};
