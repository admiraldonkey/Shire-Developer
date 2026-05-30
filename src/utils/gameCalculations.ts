import type { Upgrade } from "../types/Game.types";

export function getHobbitsPerClick(upgrades: Upgrade[]): number {
  return upgrades.reduce((total, upgrade) => {
    if (upgrade.effect.type !== "hobbitsPerClick") {
      return total;
    }

    return total + upgrade.effect.value * upgrade.owned;
  }, 1);
}

export function getHobbitsPerSecond(upgrades: Upgrade[]): number {
  return upgrades.reduce((total, upgrade) => {
    if (upgrade.effect.type !== "hobbitsPerSecond") {
      return total;
    }

    return total + upgrade.effect.value * upgrade.owned;
  }, 0);
}

export function getTotalOwnedUpgrades(upgrades: Upgrade[]): number {
  return upgrades.reduce((total, upgrade) => total + upgrade.owned, 0);
}
