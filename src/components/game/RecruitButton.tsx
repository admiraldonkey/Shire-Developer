import { useState } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import type { ClickPopup } from "../../types/UI.types";
import { getHobbitsPerClick } from "../../utils/gameCalculations";

export function RecruitButton() {
  const { upgrades } = useGameState();
  const dispatch = useGameDispatch();

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
          "cursor-pointer relative rounded-full border-4 border-amber-300/50 bg-green-900",
          "h-[clamp(7rem,32vw,9rem)] w-[clamp(7rem,32vw,9rem)] sm:h-44 sm:w-44 lg:h-52 lg:w-52",
          "shadow-2xl shadow-amber-950/50 transition",
          "hover:scale-105 active:scale-95",
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
