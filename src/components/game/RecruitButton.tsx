import { useRef, useState, type Ref } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import type { ClickPopup } from "../../types/UI.types";
import { getHobbitsPerClick } from "../../utils/gameCalculations";
import { useRestorationStage } from "../hooks/UseRestorationStage";

type RecruitButtonProps = {
  buttonRef?: Ref<HTMLButtonElement>;
};

export function RecruitButton({ buttonRef }: RecruitButtonProps) {
  const { upgrades } = useGameState();
  const dispatch = useGameDispatch();
  const restorationStage = useRestorationStage();

  const hobbitsPerClick = getHobbitsPerClick(upgrades);

  const [popups, setPopups] = useState<ClickPopup[]>([]);
  const [isKeyboardPressing, setIsKeyboardPressing] = useState(false);

  const popupIdRef = useRef(0);

  function getNextPopupId() {
    popupIdRef.current += 1;
    return popupIdRef.current;
  }

  function triggerKeyboardPressAnimation() {
    setIsKeyboardPressing(false);

    window.requestAnimationFrame(() => {
      setIsKeyboardPressing(true);

      window.setTimeout(() => {
        setIsKeyboardPressing(false);
      }, 160);
    });
  }

  function handleRecruit(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch({ type: "CLICK_HOBBITS" });

    const buttonRect = event.currentTarget.getBoundingClientRect();

    const wasKeyboardOrProgrammaticClick =
      event.clientX === 0 && event.clientY === 0;

    if (wasKeyboardOrProgrammaticClick) {
      triggerKeyboardPressAnimation();
    }

    const popup: ClickPopup = {
      id: getNextPopupId(),
      value: hobbitsPerClick,
      x: wasKeyboardOrProgrammaticClick
        ? buttonRect.width / 2
        : event.clientX - buttonRect.left,
      y: wasKeyboardOrProgrammaticClick
        ? buttonRect.height * 0.28
        : Math.max(12, event.clientY - buttonRect.top - 28),
    };

    setPopups((current) => [...current, popup]);

    window.setTimeout(() => {
      setPopups((current) => current.filter((item) => item.id !== popup.id));
    }, 800);
  }

  function handleRecruitButtonKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) {
    if ((event.code === "Space" || event.code === "Enter") && event.repeat) {
      event.preventDefault();
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleRecruit}
        onKeyDown={handleRecruitButtonKeyDown}
        className={[
          "relative rounded-full border-4 transition",
          "h-[clamp(7rem,32vw,9rem)] w-[clamp(7rem,32vw,9rem)] sm:h-44 sm:w-44 lg:h-52 lg:w-52",
          "cursor-pointer hover:scale-105 active:scale-95",
          restorationStage.theme.recruitButton,
          restorationStage.theme.border,
          restorationStage.theme.recruitButtonGlow,
          "shadow-2xl",
          isKeyboardPressing
            ? "animate-[recruit-key-press_160ms_ease-out]"
            : "",
        ].join(" ")}
      >
        <span className="block text-base font-bold text-amber-100 sm:text-lg">
          Recruit Hobbit
        </span>

        <span className="mt-1 block text-xs text-amber-100/60 sm:mt-2 sm:text-sm">
          +{hobbitsPerClick} per click
        </span>
      </button>

      {popups.map((popup) => (
        <span
          key={popup.id}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-[float-up_800ms_ease-out_forwards] text-lg font-bold text-amber-200"
          style={{
            left: popup.x,
            top: popup.y,
          }}
        >
          +{popup.value}
        </span>
      ))}
    </div>
  );
}
