import type { ApiUpgrade } from "../types/Game.types";
import { UPGRADE_API_URL } from "../constants/upgradeApi";
import { createInitialUpgrades } from "./upgradeMappers";

export async function fetchBaseUpgrades() {
  const response = await fetch(UPGRADE_API_URL);

  if (!response.ok) {
    throw new Error(`Upgrade API failed with status ${response.status}`);
  }

  const apiUpgrades: ApiUpgrade[] = await response.json();

  return createInitialUpgrades(apiUpgrades);
}
