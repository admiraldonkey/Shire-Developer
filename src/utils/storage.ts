import type { GameState } from "../types/Game.types";
import type { User } from "../types/User.types";
import type { LegacySavedGameState } from "../types/Save.types";
import { createSavedGameState } from "./createSavedGameState";

type StoredUserRecord = Partial<User> & {
  gameState?: LegacySavedGameState;
};

export function getStoredUserRecord(username: string): StoredUserRecord {
  try {
    return JSON.parse(
      localStorage.getItem(username) ?? "{}",
    ) as StoredUserRecord;
  } catch {
    return {};
  }
}

export function getStoredGameState(
  username: string,
): LegacySavedGameState | null {
  const storedRecord = getStoredUserRecord(username);

  return storedRecord.gameState ?? null;
}

export function getNormalisedStoredUser(username: string): User {
  const storedRecord = getStoredUserRecord(username);

  return {
    name:
      typeof storedRecord.name === "string" &&
      storedRecord.name.trim().length > 0
        ? storedRecord.name
        : username,
  };
}

export function saveUserToStorage(username: string, user: User) {
  const existingStorage = getStoredUserRecord(username);

  localStorage.setItem(
    username,
    JSON.stringify({
      ...existingStorage,
      ...user,
      name: user.name,
    }),
  );
}

export function saveGameToStorage(username: string, gameState: GameState) {
  const existingStorage = getStoredUserRecord(username);
  const savedGameState = createSavedGameState(gameState);

  localStorage.setItem(
    username,
    JSON.stringify({
      ...existingStorage,
      name:
        typeof existingStorage.name === "string" &&
        existingStorage.name.trim().length > 0
          ? existingStorage.name
          : username,
      gameState: savedGameState,
    }),
  );
}
