import { useState } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import type { ClickPopup } from "../../types/UI.types";

export function RecruitButton() {
  const { hobbitsPerClick } = useGameState();
  const dispatch = useGameDispatch();

  const [popups, setPopups] = useState<ClickPopup[]>([]);

  function handleRecruit(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch({ type: "CLICK_HOBBIT" });

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
        className="relative h-48 w-48 rounded-full border-4 border-amber-300/50 bg-green-900 shadow-2xl shadow-amber-950/50 transition hover:scale-105 hover:border-amber-200 active:scale-95"
      >
        <span className="block text-lg font-bold text-amber-100">
          Recruit Hobbit
        </span>

        <span className="mt-2 block text-sm text-amber-100/60">
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
