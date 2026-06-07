import { type GameAction, type GameState } from "../../types/Game.types";
import {
  getHobbitsPerClick,
  getHobbitsPerSecond,
} from "../../utils/gameCalculations";

export const initialGameState: GameState = {
  hobbits: 0,
  hobbitsPerSecond: 0,
  hobbitsPerClick: 1,
  upgrades: [],
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    // 'Recruit' button clicked. Increases hobbits value by current hobbitsPerClick (1 by default)
    case "CLICK_HOBBITS": {
      // return { ...state, hobbits: state.hobbits + state.hobbitsPerClick };
      const hobbitsPerClick = getHobbitsPerClick(state.upgrades);
      return {
        ...state,
        hobbits: state.hobbits + hobbitsPerClick,
      };
    }
    // Hobbit value increases by hobbitsPerSecond value every second (1000ms). Dispatched from useEffect interval in Counter component.
    case "TICK_HOBBITS": {
      const hobbitsPerSecond = getHobbitsPerSecond(state.upgrades);
      if (hobbitsPerSecond === 0) {
        return state;
      }
      return {
        ...state,
        hobbits: state.hobbits + hobbitsPerSecond,
      };
    }
    // Upgrades pulled from API or from local storage are used to update upgrades in game state.
    case "SET_UPGRADES":
      return {
        ...state,
        upgrades: action.payload,
      };

    // Handles logic when a user buys an upgrade (only dispatches if player has enough to cover cost)
    case "BUY_UPGRADE": {
      const upgradeToBuy = state.upgrades.find(
        (upgrade) => upgrade.id === action.payload,
      );

      if (!upgradeToBuy || state.hobbits < upgradeToBuy.costNext) {
        return state;
      }

      return {
        ...state,
        hobbits: state.hobbits - upgradeToBuy.costNext,
        upgrades: state.upgrades.map((upgrade) => {
          if (upgrade.id !== action.payload) {
            return upgrade;
          }

          return {
            ...upgrade,
            owned: upgrade.owned + 1,
            costNext: Math.ceil(upgrade.costNext * upgrade.costMultiplier),
          };
        }),
      };
    }

    // Quick way to add 10,000 hobbits to user
    case "CHEAT":
      return { ...state, hobbits: state.hobbits + 10000 };
    //
    case "LOAD_GAME":
      // Parsed data pulled from local storage is added to game state (dispatched from handleLoad onClick function in Options component)
      return action.payload;
    // Game data is reset to default game state
    case "RESET":
      return initialGameState;
    default:
      return state;
  }
};
