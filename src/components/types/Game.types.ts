// 2 upgrade types, 1 to upgrade click power (recruits per click) and another for automatic recruiting
export type Upgrade = {
  id: number;
  name: string;
  type: "auto" | "click";
  cost: number;
  costNext: number;
  increase: number;
  owned: number;
};

export type GameState = {
  hobbits: number;
  hobbitsPerSecond: number;
  clickPower: number;
  upgrades: Upgrade[];
};

export type GameAction =
  | { type: "CLICK_HOBBIT" }
  | { type: "BUY_UPGRADE"; payload: number }
  | { type: "SET_UPGRADES"; payload: Upgrade[] }
  | { type: "LOAD_GAME"; payload: GameState }
  | { type: "SAVE_GAME"; payload: GameState }
  | { type: "TICK" };

export type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};

export type GameContextProviderProps = {
  children: React.ReactNode;
};
