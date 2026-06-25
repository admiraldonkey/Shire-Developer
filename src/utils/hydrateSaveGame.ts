import { initialGameState } from "../components/reducers/GameReducer";
import type { GameState, Upgrade } from "../types/Game.types";
import { INITIAL_CHRONICLE_DATE } from "./chronicleDates";
import { CURRENT_SAVE_VERSION } from "../constants/saveVersion";

type PartialSavedGameState = Partial<GameState> & {
  upgrades?: Partial<Upgrade>[];
};

function hydrateUpgrades(
  savedUpgrades: Partial<Upgrade>[] | undefined,
  baseUpgrades: Upgrade[],
): Upgrade[] {
  const savedUpgradeMap = new Map(
    savedUpgrades
      ?.filter((upgrade) => typeof upgrade.id === "number")
      .map((upgrade) => [upgrade.id, upgrade]) ?? [],
  );

  return baseUpgrades.map((baseUpgrade) => {
    const savedUpgrade = savedUpgradeMap.get(baseUpgrade.id);

    return {
      ...baseUpgrade,
      owned:
        typeof savedUpgrade?.owned === "number"
          ? savedUpgrade.owned
          : baseUpgrade.owned,
      costNext:
        typeof savedUpgrade?.costNext === "number"
          ? savedUpgrade.costNext
          : baseUpgrade.costNext,
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
  savedGame: PartialSavedGameState,
  baseUpgrades: Upgrade[],
): GameState {
  const hydratedUpgrades = hydrateUpgrades(savedGame.upgrades, baseUpgrades);

  return {
    ...initialGameState,
    ...savedGame,
    saveVersion: CURRENT_SAVE_VERSION,
    upgrades: hydratedUpgrades,
    chronicleEntries: savedGame.chronicleEntries ?? [],
    nextChronicleId: savedGame.nextChronicleId ?? 1,
    currentChronicleDate:
      savedGame.currentChronicleDate ?? INITIAL_CHRONICLE_DATE,
    restorationPoints:
      savedGame.restorationPoints ??
      estimateRestorationPoints(hydratedUpgrades),
    isGameLoaded: true,
  };
}
