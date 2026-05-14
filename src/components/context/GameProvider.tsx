import { useEffect, useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/GameReducer";
import { GameContext } from "./Contexts";
import {
  type GameContextProviderProps,
  type GameState,
  type Upgrade,
} from "../types/Game.types";
import { useUserState } from "../hooks/UseUser";
import type { User } from "../types/User.types";

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
  console.log("user in GameProvider is: ", user);
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

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
        let upgrades = await response.json();

        const newUpgradeNames = [
          "Hobbit Hole",
          "Peace and Quiet",
          "Good Tilled Earth",
          "Pint of Ale",
          "Old Toby",
          "Bakery",
          "Gandalf's Fireworks",
          "Brewery",
          "Inn",
          "111th Birthday Party",
        ];

        upgrades = upgrades.map((u: Upgrade) => ({
          ...u,
          name: newUpgradeNames[u.id - 1],
          type: "auto",
          costNext: u.cost,
          owned: 0,
        }));

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
