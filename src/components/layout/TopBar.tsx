import { useEffect, useRef, useState } from "react";
import { useUserState, useUserDispatch } from "../hooks/UseUser";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import { useRestorationStage } from "../hooks/UseRestorationStage";
import { getRestorationProgress } from "../../utils/getRestorationProgress";
import { saveGameToStorage, resetGameSave } from "../../utils/storage";
import {
  initialiseGameForUser,
  loadHydratedGameFromStorage,
} from "../../utils/gameInitialisation";
import { devLog } from "../../utils/devLog";

type OptionsNotice = {
  id: number;
  type: "success" | "warning" | "error";
  message: string;
};

export function TopBar() {
  const { currentUser } = useUserState();
  const gameState = useGameState();
  const dispatchGame = useGameDispatch();
  const dispatchUser = useUserDispatch();
  const restorationStage = useRestorationStage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [optionsNotice, setOptionsNotice] = useState<OptionsNotice | null>(
    null,
  );
  const noticeIdRef = useRef(0);

  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);

  const SHOW_DEV_MENU =
    import.meta.env.DEV || import.meta.env.VITE_SHOW_DEV_TOOLS === "true";

  function closeMenus() {
    setIsMenuOpen(false);
    setIsDevMenuOpen(false);
  }

  function showOptionsNotice(type: OptionsNotice["type"], message: string) {
    noticeIdRef.current += 1;

    const notice: OptionsNotice = {
      id: noticeIdRef.current,
      type,
      message,
    };

    setOptionsNotice(notice);

    window.setTimeout(() => {
      setOptionsNotice((current) =>
        current?.id === notice.id ? null : current,
      );
    }, 1600);
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
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
    if (!currentUser) {
      showOptionsNotice("error", "No user found");
      closeMenus();
      return;
    }

    saveGameToStorage(currentUser.name, gameState);
    showOptionsNotice("success", "Game saved");

    closeMenus();
  }

  async function handleLoadGame() {
    if (!currentUser) {
      showOptionsNotice("error", "No user found");
      closeMenus();
      return;
    }

    try {
      const hydratedGame = await loadHydratedGameFromStorage(currentUser.name);

      if (!hydratedGame) {
        showOptionsNotice("warning", "No save found");
        closeMenus();
        return;
      }

      dispatchGame({ type: "LOAD_GAME", payload: hydratedGame });
      showOptionsNotice("success", "Save loaded");
    } catch (error) {
      console.error("Failed to load saved game:", error);
      showOptionsNotice("error", "Load failed");
    }

    closeMenus();
  }

  async function handleResetSave() {
    if (!currentUser) {
      showOptionsNotice("error", "No user found");
      closeMenus();
      return;
    }

    const shouldReset = window.confirm(
      "Reset this save and start again? This cannot be undone.",
    );

    if (!shouldReset) {
      closeMenus();
      return;
    }

    try {
      resetGameSave(currentUser.name);

      const { gameState } = await initialiseGameForUser(currentUser.name);

      dispatchGame({ type: "LOAD_GAME", payload: gameState });
      saveGameToStorage(currentUser.name, gameState);

      showOptionsNotice("success", "Save reset");
    } catch (error) {
      console.error("Failed to reset save:", error);
      showOptionsNotice("error", "Reset failed");
    }

    closeMenus();
  }

  function handleSwitchUser() {
    dispatchUser({ type: "LOGOUT" });
    closeMenus();
  }

  function handleDeleteUser() {
    if (currentUser) {
      localStorage.removeItem(currentUser.name);
      dispatchUser({ type: "DELETE" });
      dispatchGame({ type: "RESET" });
    } else {
      devLog("User not found");
    }
    closeMenus();
  }

  function handleDevAddHobbits(amount: number) {
    dispatchGame({ type: "DEV_ADD_HOBBITS", payload: amount });
    showOptionsNotice("success", `Added ${amount.toLocaleString()} hobbits`);
  }

  function handleDevRemoveHobbits(amount: number) {
    dispatchGame({ type: "DEV_REMOVE_HOBBITS", payload: amount });
    showOptionsNotice("warning", `Removed ${amount.toLocaleString()} hobbits`);
  }

  function handleDevAdvanceStage() {
    const restorationProgress = getRestorationProgress(
      gameState.restorationPoints,
    );

    if (!restorationProgress.nextStage) {
      showOptionsNotice("warning", "Already at final stage");
      return;
    }

    const nextStage = restorationProgress.nextStage;
    const pointsToAdd = Math.max(
      0,
      nextStage.minRestorationPoints - gameState.restorationPoints,
    );

    dispatchGame({
      type: "DEV_ADD_RESTORATION_POINTS",
      payload: pointsToAdd,
    });

    if (!gameState.stageMilestonesSeen.includes(nextStage.id)) {
      dispatchGame({
        type: "ADD_CHRONICLE_ENTRY",
        payload: {
          type: "milestone",
          message: nextStage.milestoneMessage ?? nextStage.mainDescription,
          dayAdvance: 1,
        },
      });

      dispatchGame({
        type: "MARK_RESTORATION_STAGE_SEEN",
        payload: nextStage.id,
      });
    }

    showOptionsNotice("success", `${nextStage.name} reached`);
  }

  return (
    <header
      className={[
        "relative z-[100] shrink-0 border-b px-4 py-3 text-amber-100 shadow-lg backdrop-blur transition-colors duration-700",
        restorationStage.theme.panelBackground,
        restorationStage.theme.border,
      ].join(" ")}
    >
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
        <div
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-full z-[120] mt-2 w-[calc(100%-2rem)] -translate-x-1/2"
        >
          {optionsNotice && (
            <div
              key={optionsNotice.id}
              className={[
                "mx-auto max-w-xs rounded-full border px-4 py-2 text-center text-sm font-semibold shadow-lg animate-[notice-pop_1600ms_ease-out_forwards]",
                optionsNotice.type === "success"
                  ? "border-green-300/40 bg-green-950/95 text-green-100"
                  : optionsNotice.type === "warning"
                    ? "border-amber-300/40 bg-amber-950/95 text-amber-100"
                    : "border-red-300/40 bg-red-950/95 text-red-100",
              ].join(" ")}
            >
              {optionsNotice.message}
            </div>
          )}
        </div>
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className={[
              "flex h-10 cursor-pointer items-center justify-center rounded-full border px-3 text-sm font-semibold shadow-lg transition hover:brightness-110 sm:px-4",
              restorationStage.theme.panelBackground,
              restorationStage.theme.border,
              restorationStage.theme.accentText,
            ].join(" ")}
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
              className={[
                "absolute right-0 z-[110] mt-2 w-56 overflow-visible rounded-2xl border p-2 shadow-2xl backdrop-blur",
                restorationStage.theme.panelBackground,
                restorationStage.theme.border,
              ].join(" ")}
            >
              <MenuButton onClick={handleSaveGame}>Save Game</MenuButton>
              <MenuButton onClick={handleLoadGame}>Load Game</MenuButton>
              <MenuButton onClick={handleSwitchUser}>Switch User</MenuButton>

              <div className="my-2 border-t border-amber-200/10" />

              <MenuButton danger onClick={handleResetSave}>
                Reset Save
              </MenuButton>
              <MenuButton danger onClick={handleDeleteUser}>
                Delete User
              </MenuButton>
              {SHOW_DEV_MENU && (
                <div className="relative mt-2 border-t border-amber-100/10 pt-2">
                  <MenuButton
                    variant="dev"
                    active={isDevMenuOpen}
                    ariaExpanded={isDevMenuOpen}
                    ariaHasPopup="menu"
                    rightSlot={isDevMenuOpen ? "‹" : "›"}
                    onClick={() => setIsDevMenuOpen((current) => !current)}
                  >
                    Dev
                  </MenuButton>

                  {isDevMenuOpen && (
                    <div
                      role="menu"
                      className={[
                        "absolute z-[130] w-56 rounded-2xl border p-2 shadow-2xl backdrop-blur",
                        "right-0 top-full mt-2",
                        "sm:right-full sm:left-auto sm:top-0 sm:mr-2 sm:mt-0",
                        restorationStage.theme.panelBackground,
                        restorationStage.theme.border,
                      ].join(" ")}
                    >
                      <MenuButton
                        variant="dev"
                        onClick={() => handleDevAddHobbits(1_000)}
                      >
                        Add 1,000 hobbits
                      </MenuButton>

                      <MenuButton
                        variant="dev"
                        onClick={() => handleDevAddHobbits(10_000)}
                      >
                        Add 10,000 hobbits
                      </MenuButton>

                      <MenuButton
                        variant="dev"
                        onClick={() => handleDevRemoveHobbits(1_000)}
                      >
                        Remove 1,000 hobbits
                      </MenuButton>

                      <MenuButton variant="dev" onClick={handleDevAdvanceStage}>
                        Advance stage
                      </MenuButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

type MenuButtonVariant = "default" | "danger" | "dev";

type MenuButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  variant?: MenuButtonVariant;
  active?: boolean;
  rightSlot?: React.ReactNode;
  ariaExpanded?: boolean;
  ariaHasPopup?: "menu";
};

function MenuButton({
  children,
  onClick,
  danger = false,
  variant = "default",
  active = false,
  rightSlot,
  ariaExpanded,
  ariaHasPopup,
}: MenuButtonProps) {
  const resolvedVariant = danger ? "danger" : variant;

  const variantClasses = {
    default: "text-amber-100/85 hover:bg-amber-100/10 hover:text-amber-50",
    danger: "text-red-200 hover:bg-red-950/60 hover:text-red-100",
    dev: "text-sky-100/90 hover:bg-sky-950/60 hover:text-sky-50",
  };

  return (
    <button
      type="button"
      role="menuitem"
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      onClick={onClick}
      className={[
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
        variantClasses[resolvedVariant],
        active ? "bg-white/10" : "",
      ].join(" ")}
    >
      <span className="min-w-0 truncate">{children}</span>

      {rightSlot && (
        <span className="shrink-0 text-xs opacity-70">{rightSlot}</span>
      )}
    </button>
  );
}
