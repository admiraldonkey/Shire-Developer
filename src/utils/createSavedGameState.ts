import type { GameState } from "../types/Game.types";
import type { SavedGameState } from "../types/Save.types";
import { CURRENT_SAVE_VERSION } from "../constants/saveVersion";

export function createSavedGameState(gameState: GameState): SavedGameState {
  return {
    saveVersion: CURRENT_SAVE_VERSION,

    hobbits: gameState.hobbits,
    restorationPoints: gameState.restorationPoints,

    chronicleEntries: gameState.chronicleEntries,
    nextChronicleId: gameState.nextChronicleId,
    currentChronicleDate: gameState.currentChronicleDate,

    stageMilestonesSeen: gameState.stageMilestonesSeen,

    upgradeProgress: gameState.upgrades.map((upgrade) => ({
      id: upgrade.id,
      owned: upgrade.owned,
      costNext: upgrade.costNext,
    })),
  };
}
