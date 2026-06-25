import { useEffect, useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/GameReducer";
import { GameContext } from "./Contexts";
import {
  type GameContextProviderProps,
  type GameState,
} from "../../types/Game.types";
import { useUserState } from "../hooks/UseUser";
import type { ApiUpgrade } from "../../types/Game.types";
import { createInitialUpgrades } from "../../utils/upgradeMappers";
import { hydrateSavedGame } from "../../utils/hydrateSaveGame";

const ENABLE_PASSIVE_TICKER = true;

const loadGameFromStorage = (username: string): Partial<GameState> | null => {
  console.log("loading from storage...");

  const data = localStorage.getItem(username);

  console.log("retrieved data is: ", data);

  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    return parsed.gameState || null;
  } catch (error) {
    console.error("Failed to parse saved game:", error);
    return null;
  }
};

const saveGameToStorage = (username: string, gameState: GameState) => {
  const storageObj = {
    gameState,
  };

  localStorage.setItem(username, JSON.stringify(storageObj));
};

// Readme outlines why game state & dispatch were combined into a single provider
export const GameProvider = ({ children }: GameContextProviderProps) => {
  const user = useUserState().currentUser;
  const username = user?.name;

  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    if (!ENABLE_PASSIVE_TICKER) {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: "TICK_HOBBITS" });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!username) return;

    const activeUsername = username;

    async function initialiseGame() {
      try {
        const response = await fetch(
          "https://cookie-upgrade-api.vercel.app/api/upgrades",
        );

        if (!response.ok) {
          throw new Error(`Upgrade API failed with status ${response.status}`);
        }

        const apiUpgrades: ApiUpgrade[] = await response.json();
        const baseUpgrades = createInitialUpgrades(apiUpgrades);

        const saved = loadGameFromStorage(activeUsername);

        if (saved) {
          console.log("User was pulled from storage");

          const hydratedSavedGame = hydrateSavedGame(saved, baseUpgrades);

          dispatch({ type: "LOAD_GAME", payload: hydratedSavedGame });
          saveGameToStorage(activeUsername, hydratedSavedGame);

          return;
        }

        console.log("user did not exist in storage");

        const newGameState: GameState = {
          ...initialGameState,
          upgrades: baseUpgrades,
          isGameLoaded: true,
        };

        dispatch({ type: "LOAD_GAME", payload: newGameState });
        saveGameToStorage(activeUsername, newGameState);
      } catch (error) {
        console.error("Failed to initialise game:", error);
      }
    }

    initialiseGame();
  }, [username]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
