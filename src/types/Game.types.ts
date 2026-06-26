import type { RestorationStageId } from "./Restoration.types";

export type UpgradeCategory = "passive" | "click";
export type UpgradeEffectType = "hobbitsPerSecond" | "hobbitsPerClick";
import type {
  ChronicleEntry,
  ShireDate,
  ChronicleEntryType,
} from "./Chronicle.types";

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

// type SavedUpgradeProgress = {
//   id: number;
//   owned: number;
//   costNext: number;
// };

export type GameState = {
  saveVersion: number;
  hobbits: number;
  hobbitsPerSecond: number;
  hobbitsPerClick: number;
  chronicleEntries: ChronicleEntry[];
  nextChronicleId: number;
  currentChronicleDate: ShireDate;
  restorationPoints: number;
  stageMilestonesSeen: RestorationStageId[];
  upgrades: Upgrade[];
  // upgradeProgress: SavedUpgradeProgress[];
  isGameLoaded: boolean;
};

export type GameAction =
  | { type: "CLICK_HOBBITS" }
  | { type: "TICK_HOBBITS" }
  | { type: "SET_UPGRADES"; payload: Upgrade[] }
  | { type: "BUY_UPGRADE"; payload: number }
  | {
      type: "ADD_CHRONICLE_ENTRY";
      payload: {
        type: ChronicleEntryType;
        message: string;
        dayAdvance?: number;
      };
    }
  | {
      type: "MARK_RESTORATION_STAGE_SEEN";
      payload: RestorationStageId;
    }
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
