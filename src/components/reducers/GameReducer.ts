import { type GameAction, type GameState } from "../types/Game.types";

export const initialGameState: GameState = {
  hobbits: 0,
  hobbitsPerSecond: 0,
  clickPower: 1,
  upgrades: [],
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    // 'Recruit' button clicked. Increases hobbits value by current clickPower (1 by default)
    case "CLICK_HOBBIT":
      return { ...state, hobbits: state.hobbits + state.clickPower };
    // Hobbit value increases by hobbitsPerSecond value every second (1000ms). Dispatched from useEffect interval in Counter component.
    case "TICK":
      return {
        ...state,
        hobbits: state.hobbits + state.hobbitsPerSecond,
      };
    // Upgrades pulled from API or from local storage are used to update upgrades in game state.
    case "SET_UPGRADES":
      return {
        ...state,
        upgrades: action.payload,
      };
    // Handles logic when a user buys an upgrade (only dispatches if player has enough to cover cost)
    case "BUY_UPGRADE": {
      // ID of purchased upgrade is sent as payload
      const upgradeId = action.payload;
      let upgradePrice = 0;
      let upgradeHps = 0;

      // Map through upgrades, return those not matching bought upgrade.
      // When matching upgrade is found, save its cost & hobbit per second increase value to variables for updating their states.
      const updatedUpgrades = state.upgrades.map((u) => {
        if (u.id !== upgradeId) return u;

        upgradePrice = u.cost;
        upgradeHps = u.increase;
        // Update purchased upgrade with amount owned, increase cost and subsequent purchase price.
        return {
          ...u,
          owned: u.owned + 1,
          cost: u.cost + u.costNext,
          costNext: Math.round(u.costNext * 1.2), // Rounded to keep costs & UI simple
        };
      });

      // Update game state to reflect purchase, deduct price from current hobbits & increase hobbits per second value by the bought upgrade's increase amount.
      return {
        ...state,
        hobbits: state.hobbits - upgradePrice,
        hobbitsPerSecond: state.hobbitsPerSecond + upgradeHps,
        upgrades: updatedUpgrades,
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
