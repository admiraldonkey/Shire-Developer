import { useState } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import type { ClickPopup } from "../../types/UI.types";
import { getHobbitsPerClick } from "../../utils/gameCalculations";
import { useRestorationStage } from "../hooks/UseRestorationStage";

export function RecruitButton() {
  const { upgrades } = useGameState();
  const dispatch = useGameDispatch();
  const restorationStage = useRestorationStage();

  const hobbitsPerClick = getHobbitsPerClick(upgrades);

  const [popups, setPopups] = useState<ClickPopup[]>([]);

  function handleRecruit(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch({ type: "CLICK_HOBBITS" });
    console.log(hobbitsPerClick);

    const buttonRect = event.currentTarget.getBoundingClientRect();

    const popup: ClickPopup = {
      id: Date.now(),
      value: hobbitsPerClick,
      x: event.clientX - buttonRect.left,
      y: event.clientY - buttonRect.top,
    };

    setPopups((current) => [...current, popup]);

    window.setTimeout(() => {
      setPopups((current) => current.filter((item) => item.id !== popup.id));
    }, 800);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleRecruit}
        className={[
          "relative rounded-full border-4 transition",
          "h-[clamp(7rem,32vw,9rem)] w-[clamp(7rem,32vw,9rem)] sm:h-44 sm:w-44 lg:h-52 lg:w-52",
          "cursor-pointer hover:scale-105 active:scale-95",
          restorationStage.theme.recruitButton,
          restorationStage.theme.border,
          restorationStage.theme.recruitButtonGlow,
          "shadow-2xl",
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
          className="pointer-events-none absolute animate-[float-up_800ms_ease-out_forwards] text-lg font-bold text-amber-200"
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
