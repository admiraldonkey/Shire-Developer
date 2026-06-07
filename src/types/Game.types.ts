export type UpgradeCategory = "passive" | "click";
export type UpgradeEffectType = "hobbitsPerSecond" | "hobbitsPerClick";

export type ApiUpgrade = {
  id: number;
  name: string;
  cost: number;
  increase: number;
};

export type Upgrade = {
  id: number;
  name: string;
  description: string;
  baseCost: number;
  costNext: number;
  costMultiplier: number;
  owned: number;
  category: UpgradeCategory;
  effect: {
    type: UpgradeEffectType;
    value: number;
  };
};

export type GameState = {
  hobbits: number;
  hobbitsPerSecond: number;
  hobbitsPerClick: number;
  upgrades: Upgrade[];
};

export type GameAction =
  | { type: "CLICK_HOBBITS" }
  | { type: "TICK_HOBBITS" }
  | { type: "SET_UPGRADES"; payload: Upgrade[] }
  | { type: "BUY_UPGRADE"; payload: number }
  | { type: "CHEAT" }
  | { type: "LOAD_GAME"; payload: GameState }
  | { type: "RESET" };

export type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};

export type GameContextProviderProps = {
  children: React.ReactNode;
};
