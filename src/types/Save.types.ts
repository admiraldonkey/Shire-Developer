import type { ChronicleEntry, ShireDate } from "./Chronicle.types";
import type { RestorationStageId } from "./Restoration.types";
import type { GameState, Upgrade } from "./Game.types";

export type SavedUpgradeProgress = {
  id: number;
  owned: number;
  costNext: number;
};

export type SavedGameState = {
  saveVersion: number;

  hobbits: number;
  restorationPoints: number;

  chronicleEntries: ChronicleEntry[];
  nextChronicleId: number;
  currentChronicleDate: ShireDate;

  stageMilestonesSeen: RestorationStageId[];

  upgradeProgress: SavedUpgradeProgress[];
};

export type LegacySavedGameState = Partial<GameState> & {
  upgradeProgress?: SavedUpgradeProgress[];
  upgrades?: Partial<Upgrade>[];
};
