import { initialGameState } from "../components/reducers/GameReducer";
import type { GameState } from "../types/Game.types";
import { fetchBaseUpgrades } from "./fetchBaseUpgrades";
import { hydrateSavedGame } from "./hydrateSavedGame";
import { getStoredGameState } from "./storage";

type InitialiseGameResult = {
  gameState: GameState;
  wasLoadedFromStorage: boolean;
};

export async function loadHydratedGameFromStorage(username: string) {
  const savedGameState = getStoredGameState(username);

  if (!savedGameState) {
    return null;
  }

  const baseUpgrades = await fetchBaseUpgrades();

  return hydrateSavedGame(savedGameState, baseUpgrades);
}

export async function initialiseGameForUser(
  username: string,
): Promise<InitialiseGameResult> {
  const baseUpgrades = await fetchBaseUpgrades();
  const savedGameState = getStoredGameState(username);

  if (savedGameState) {
    return {
      gameState: hydrateSavedGame(savedGameState, baseUpgrades),
      wasLoadedFromStorage: true,
    };
  }

  return {
    gameState: {
      ...initialGameState,
      upgrades: baseUpgrades,
      isGameLoaded: true,
    },
    wasLoadedFromStorage: false,
  };
}
