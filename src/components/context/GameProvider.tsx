import { useEffect, useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/GameReducer";
import { GameContext } from "./Contexts";
import {
  type GameContextProviderProps,
  type GameState,
} from "../../types/Game.types";
import { useUserState } from "../hooks/UseUser";
import type { User } from "../../types/User.types";
import type { ApiUpgrade } from "../../types/Game.types";
import { createInitialUpgrades } from "../../utils/upgradeMappers";

const loadGameFromStorage = (username: string): GameState | null => {
  console.log("loading from storage...");
  const data = localStorage.getItem(username);
  console.log("retrieved data is: ", data);
  if (!data) return null;
  const parsed = JSON.parse(data);
  return parsed.gameState || null;
};

const saveGameToStorage = (
  username: string,
  gameState: GameState,
  // userData: Record<string, unknown>,
  userData: User,
) => {
  const storageObj = {
    ...userData,
    gameState,
  };
  localStorage.setItem(username, JSON.stringify(storageObj));
};

// Readme outlines why game state & dispatch were combined into a single provider
export const GameProvider = ({ children }: GameContextProviderProps) => {
  const user = useUserState().currentUser;
  // console.log("user in GameProvider is: ", user);
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // Set to true to enable hobbits per second - disabled while building & testing
  const ENABLE_PASSIVE_TICKER = true;

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
  }, [ENABLE_PASSIVE_TICKER]);

  useEffect(() => {
    if (!user) return;

    const saved = loadGameFromStorage(user.name);
    if (saved) {
      console.log("User was pulled from storage");
      dispatch({ type: "LOAD_GAME", payload: saved });
    } else {
      console.log("user did not exist in storage");
      async function fetchUpgrades() {
        const response = await fetch(
          "https://cookie-upgrade-api.vercel.app/api/upgrades",
        );
        const apiUpgrades: ApiUpgrade[] = await response.json();

        const upgrades = createInitialUpgrades(apiUpgrades);

        console.log("upgrades in useEffect are:", upgrades);
        dispatch({ type: "SET_UPGRADES", payload: upgrades });

        saveGameToStorage(user!.name, { ...initialGameState, upgrades }, user!);
      }
      fetchUpgrades();
    }
  }, [user]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
