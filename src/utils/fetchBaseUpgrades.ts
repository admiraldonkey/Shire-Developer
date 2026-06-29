import type { Upgrade, ApiUpgrade } from "../types/Game.types";
import { UPGRADE_API_URL } from "../constants/upgradeApi";
import { createInitialUpgrades } from "./upgradeMappers";

let cachedBaseUpgrades: Upgrade[] | null = null;
let pendingBaseUpgradesRequest: Promise<Upgrade[]> | null = null;

function cloneUpgrade(upgrade: Upgrade): Upgrade {
  return {
    ...upgrade,
    effect: {
      ...upgrade.effect,
    },
  };
}

function cloneUpgrades(upgrades: Upgrade[]): Upgrade[] {
  return upgrades.map(cloneUpgrade);
}

export async function fetchBaseUpgrades(
  forceRefresh = false,
): Promise<Upgrade[]> {
  if (!forceRefresh && cachedBaseUpgrades) {
    return cloneUpgrades(cachedBaseUpgrades);
  }

  if (!forceRefresh && pendingBaseUpgradesRequest) {
    return cloneUpgrades(await pendingBaseUpgradesRequest);
  }

  pendingBaseUpgradesRequest = fetch(UPGRADE_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Upgrade API failed with status ${response.status}`);
      }

      return response.json() as Promise<ApiUpgrade[]>;
    })
    .then((apiUpgrades) => {
      const baseUpgrades = createInitialUpgrades(apiUpgrades);
      cachedBaseUpgrades = baseUpgrades;
      return baseUpgrades;
    })
    .finally(() => {
      pendingBaseUpgradesRequest = null;
    });

  return cloneUpgrades(await pendingBaseUpgradesRequest);
}
