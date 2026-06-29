import { type GameAction, type GameState } from "../../types/Game.types";
import {
  getHobbitsPerClick,
  getHobbitsPerSecond,
} from "../../utils/gameCalculations";
import {
  addDaysToShireDate,
  INITIAL_CHRONICLE_DATE,
} from "../../utils/chronicleDates";
import { CURRENT_SAVE_VERSION } from "../../constants/saveVersion";

export const initialGameState: GameState = {
  saveVersion: CURRENT_SAVE_VERSION,
  hobbits: 0,
  hobbitsPerSecond: 0,
  hobbitsPerClick: 1,
  chronicleEntries: [],
  nextChronicleId: 1,
  currentChronicleDate: INITIAL_CHRONICLE_DATE,
  restorationPoints: 0,
  stageMilestonesSeen: [],
  upgrades: [],
  isGameLoaded: false,
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

      if (!upgradeToBuy) {
        return state;
      }

      const cost = Math.ceil(upgradeToBuy.costNext);

      if (state.hobbits < cost) {
        return state;
      }

      return {
        ...state,
        hobbits: state.hobbits - cost,
        restorationPoints: state.restorationPoints + cost,
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
    // Add a new entry to the chronicle panel/ticker. Restricted to 12 most recent
    case "ADD_CHRONICLE_ENTRY": {
      const entryDate = addDaysToShireDate(
        state.currentChronicleDate,
        action.payload.dayAdvance ?? 0,
      );

      const newEntry = {
        id: state.nextChronicleId,
        type: action.payload.type,
        message: action.payload.message,
        date: entryDate,
      };

      return {
        ...state,
        currentChronicleDate: entryDate,
        chronicleEntries: [newEntry, ...state.chronicleEntries].slice(0, 12),
        nextChronicleId: state.nextChronicleId + 1,
      };
    }
    // Track restoration stages achieved for reporting milestones
    case "MARK_RESTORATION_STAGE_SEEN": {
      if (state.stageMilestonesSeen.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        stageMilestonesSeen: [...state.stageMilestonesSeen, action.payload],
      };
    }

    // Parsed data pulled from local storage is added to game state (dispatched from handleLoad onClick function in Options component)
    case "LOAD_GAME":
      return {
        ...initialGameState,
        ...action.payload,
        isGameLoaded: true,
        chronicleEntries: action.payload.chronicleEntries ?? [],
        nextChronicleId: action.payload.nextChronicleId ?? 1,
        currentChronicleDate:
          action.payload.currentChronicleDate ?? INITIAL_CHRONICLE_DATE,
        restorationPoints: action.payload.restorationPoints ?? 0,
        stageMilestonesSeen: action.payload.stageMilestonesSeen ?? [],
      };
    // Game data is reset to default game state
    case "RESET":
      return initialGameState;
    // DEV TOOLS ENABLED BY SETTING VITE_SHOW_DEV_TOOLS TO TRUE
    // Add hobbits to current count
    case "DEV_ADD_HOBBITS":
      return {
        ...state,
        hobbits: state.hobbits + action.payload,
      };
    // Remove hobbits from current count
    case "DEV_REMOVE_HOBBITS":
      return {
        ...state,
        hobbits: Math.max(0, state.hobbits - action.payload),
      };
    // Increase restoration points for stage progression
    case "DEV_ADD_RESTORATION_POINTS":
      return {
        ...state,
        restorationPoints: state.restorationPoints + action.payload,
      };
    default:
      return state;
  }
};
