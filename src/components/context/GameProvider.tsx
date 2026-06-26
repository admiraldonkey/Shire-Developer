import { useEffect, useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/GameReducer";
import { GameContext } from "./Contexts";
import { type GameContextProviderProps } from "../../types/Game.types";
import { useUserState } from "../hooks/UseUser";
import { initialiseGameForUser } from "../../utils/gameInitialisation";
import { saveGameToStorage } from "../../utils/storage";
import { devLog } from "../../utils/devLog";

const ENABLE_PASSIVE_TICKER = true;

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

    let isCancelled = false;
    const activeUsername = username;

    async function initialiseGame() {
      try {
        const { gameState, wasLoadedFromStorage } =
          await initialiseGameForUser(activeUsername);

        if (isCancelled) {
          return;
        }

        devLog(
          wasLoadedFromStorage
            ? "User was pulled from storage"
            : "User did not exist in storage",
        );

        dispatch({ type: "LOAD_GAME", payload: gameState });

        // This also rewrites older/full saves into the compact upgradeProgress format.
        saveGameToStorage(activeUsername, gameState);
      } catch (error) {
        console.error("Failed to initialise game:", error);
      }
    }

    initialiseGame();

    return () => {
      isCancelled = true;
    };
  }, [username]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
