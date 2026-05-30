import type { ApiUpgrade, Upgrade } from "../types/Game.types";
import {
  passiveUpgradeDefinitions,
  clickPowerUpgrades,
} from "../data/upgradeDefinitions";

export function createPassiveUpgradesFromApi(
  apiUpgrades: ApiUpgrade[],
): Upgrade[] {
  return apiUpgrades.map((apiUpgrade) => {
    const definition = passiveUpgradeDefinitions[apiUpgrade.id];

    return {
      id: apiUpgrade.id,
      name: definition?.name ?? apiUpgrade.name,
      description:
        definition?.description ??
        "A useful improvement for the restoration of the Shire.",
      baseCost: apiUpgrade.cost,
      costNext: apiUpgrade.cost,
      costMultiplier: 1.15,
      owned: 0,
      category: "passive",
      effect: {
        type: "hobbitsPerSecond",
        value: apiUpgrade.increase,
      },
    };
  });
}

export function createInitialUpgrades(apiUpgrades: ApiUpgrade[]): Upgrade[] {
  const passiveUpgrades = createPassiveUpgradesFromApi(apiUpgrades);

  return [...passiveUpgrades, ...clickPowerUpgrades];
}
