import { useEffect, useRef, useState } from "react";
import { useUserState, useUserDispatch } from "../hooks/UseUser";
import { useGameDispatch, useGameState } from "../hooks/UseGame";

export function TopBar() {
  const { currentUser } = useUserState();
  const gameState = useGameState();
  const dispatchGame = useGameDispatch();
  const dispatchUser = useUserDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSaveGame() {
    if (currentUser) {
      const data = { ...currentUser, gameState: gameState };
      localStorage.setItem(currentUser.name, JSON.stringify(data));
    }
    setIsMenuOpen(false);
  }

  function handleLoadGame() {
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
    setIsMenuOpen(false);
  }

  function handleAddHobbits() {
    dispatchGame({ type: "CHEAT" });
    setIsMenuOpen(false);
  }

  function handleDeleteUser() {
    if (currentUser) {
      localStorage.removeItem(currentUser.name);
      dispatchUser({ type: "DELETE" });
      dispatchGame({ type: "RESET" });
    } else {
      console.log("User not found");
    }
    setIsMenuOpen(false);
  }

  return (
    <header className="relative z-[100] shrink-0 border-b border-amber-200/10 bg-black/80 px-4 py-3 text-amber-100 shadow-lg backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-wide text-amber-100 sm:text-base">
            Hobbit Recruitment Agency
          </p>

          <p className="mt-0.5 truncate text-xs text-amber-100/60">
            On duty:{" "}
            <span className="font-semibold text-amber-100">
              {currentUser?.name ?? "Guest"}
            </span>
          </p>
        </div>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="cursor-pointer flex h-10 items-center justify-center rounded-full border border-amber-300/40 bg-stone-950/90 px-3 text-sm font-semibold text-amber-100 shadow-lg transition hover:border-amber-200 hover:bg-stone-900 sm:px-4"
          >
            <span className="sm:hidden" aria-hidden="true">
              ⚙
            </span>

            <span className="hidden sm:inline">Options</span>

            <span className="ml-2 hidden text-amber-100/60 sm:inline">▾</span>
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 z-110 mt-2 w-56 overflow-hidden rounded-2xl border border-amber-200/20 bg-stone-950/95 p-2 shadow-2xl backdrop-blur"
            >
              <MenuButton onClick={handleSaveGame}>Save Game</MenuButton>
              <MenuButton onClick={handleLoadGame}>Load Game</MenuButton>

              <div className="my-2 border-t border-amber-200/10" />

              <MenuButton onClick={handleAddHobbits}>
                Add 10000 hobbits
              </MenuButton>

              <MenuButton danger onClick={handleDeleteUser}>
                Delete User
              </MenuButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

type MenuButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
};

function MenuButton({ children, onClick, danger = false }: MenuButtonProps) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={[
        "cursor-pointer flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition",
        danger
          ? "text-red-200 hover:bg-red-950/60 hover:text-red-100"
          : "text-amber-100/85 hover:bg-amber-100/10 hover:text-amber-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
