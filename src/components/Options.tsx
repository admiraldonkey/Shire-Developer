import { useGameDispatch, useGameState } from "./hooks/UseGame";
import { useUserState, useUserDispatch } from "./hooks/UseUser";

export const Options = () => {
  const gameState = useGameState();
  const { currentUser } = useUserState();
  const dispatchGame = useGameDispatch();
  const dispatchUser = useUserDispatch();

  const handleSave = () => {
    if (currentUser) {
      const data = { ...currentUser, gameState: gameState };
      localStorage.setItem(currentUser.name, JSON.stringify(data));
    }
  };

  const handleLoad = () => {
    if (currentUser) {
      const savedData = localStorage.getItem(currentUser.name);
      if (savedData) {
        const parsed = JSON.parse(savedData).gameState;
        dispatchGame({ type: "LOAD_GAME", payload: parsed });
      } else {
        console.log("No save data found");
      }
    } else {
      console.log("User not found");
    }
  };

  const handleThemeChange = () => {
    if (currentUser) {
      const newTheme = currentUser.theme === "dark" ? "light" : "dark";
      dispatchUser({ type: "SET_THEME", payload: newTheme });
    } else {
      console.log("User not found");
    }
  };

  const handleCheat = () => {
    dispatchGame({ type: "CHEAT" });
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      localStorage.removeItem(currentUser.name);
      dispatchUser({ type: "DELETE" });
      dispatchGame({ type: "RESET" });
    } else {
      console.log("User not found");
    }
  };

  return (
    <div className="py-2 mb-2 ml-2">
      {/* <h3 className="font-bold pl-2 pb-2">Options:</h3> */}
      <button
        className="rounded-lg border border-amber-200/30 px-3 py-2 text-sm text-amber-100 hover:bg-amber-100/10"
        onClick={handleSave}
      >
        Save Game
      </button>
      <button
        className="rounded-lg border border-amber-200/30 px-3 py-2 text-sm text-amber-100 hover:bg-amber-100/10"
        onClick={handleLoad}
      >
        Load Game
      </button>
      <button
        className="rounded-lg border border-amber-200/30 px-3 py-2 text-sm text-amber-100 hover:bg-amber-100/10"
        onClick={handleThemeChange}
      >
        {currentUser?.theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
      <button
        className="rounded-lg border border-amber-200/30 px-3 py-2 text-sm text-amber-100 hover:bg-amber-100/10"
        onClick={handleCheat}
      >
        Add 10000 hobbits
      </button>
      <button
        className="rounded-lg border border-amber-200/30 px-3 py-2 text-sm text-amber-100 hover:bg-amber-100/10"
        onClick={handleDeleteUser}
      >
        Delete User
      </button>
    </div>
  );
};
