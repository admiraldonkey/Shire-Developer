import { initialGameState } from "../components/reducers/GameReducer";
import type { GameState, Upgrade } from "../types/Game.types";
import type {
  LegacySavedGameState,
  SavedUpgradeProgress,
} from "../types/Save.types";
import { CURRENT_SAVE_VERSION } from "../constants/saveVersion";
import { INITIAL_CHRONICLE_DATE } from "./chronicleDates";

function getSavedUpgradeProgress(
  savedGame: LegacySavedGameState,
): SavedUpgradeProgress[] {
  if (savedGame.upgradeProgress) {
    return savedGame.upgradeProgress;
  }

  return (
    savedGame.upgrades
      ?.filter((upgrade) => typeof upgrade.id === "number")
      .map((upgrade) => ({
        id: upgrade.id as number,
        owned: typeof upgrade.owned === "number" ? upgrade.owned : 0,
        costNext:
          typeof upgrade.costNext === "number" ? upgrade.costNext : undefined,
      }))
      .filter(
        (upgrade): upgrade is SavedUpgradeProgress =>
          typeof upgrade.costNext === "number",
      ) ?? []
  );
}

function hydrateUpgrades(
  savedGame: LegacySavedGameState,
  baseUpgrades: Upgrade[],
): Upgrade[] {
  const progressMap = new Map(
    getSavedUpgradeProgress(savedGame).map((upgrade) => [upgrade.id, upgrade]),
  );

  return baseUpgrades.map((baseUpgrade) => {
    const progress = progressMap.get(baseUpgrade.id);

    return {
      ...baseUpgrade,
      owned: progress?.owned ?? baseUpgrade.owned,
      costNext: progress?.costNext ?? baseUpgrade.costNext,
    };
  });
}

function estimateRestorationPoints(upgrades: Upgrade[]): number {
  return upgrades.reduce((total, upgrade) => {
    let upgradeTotal = 0;
    let nextCost = upgrade.baseCost;

    for (let purchase = 0; purchase < upgrade.owned; purchase += 1) {
      upgradeTotal += Math.ceil(nextCost);
      nextCost *= upgrade.costMultiplier;
    }

    return total + upgradeTotal;
  }, 0);
}

export function hydrateSavedGame(
  savedGame: LegacySavedGameState,
  baseUpgrades: Upgrade[],
): GameState {
  const hydratedUpgrades = hydrateUpgrades(savedGame, baseUpgrades);

  return {
    ...initialGameState,

    saveVersion: CURRENT_SAVE_VERSION,

    hobbits: savedGame.hobbits ?? initialGameState.hobbits,
    restorationPoints:
      savedGame.restorationPoints ??
      estimateRestorationPoints(hydratedUpgrades),

    chronicleEntries: savedGame.chronicleEntries ?? [],
    nextChronicleId: savedGame.nextChronicleId ?? 1,
    currentChronicleDate:
      savedGame.currentChronicleDate ?? INITIAL_CHRONICLE_DATE,

    stageMilestonesSeen: savedGame.stageMilestonesSeen ?? [],

    upgrades: hydratedUpgrades,
    isGameLoaded: true,
  };
}
