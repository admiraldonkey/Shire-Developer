import { useEffect, useMemo, useRef, useState } from "react";
import { useGameState } from "../hooks/UseGame";
import { useRestorationStage } from "../hooks/UseRestorationStage";
import type { ChronicleEntry } from "../../types/Chronicle.types";
import {
  INITIAL_CHRONICLE_DATE,
  formatShireDate,
} from "../../utils/chronicleDates";

type ChronicleTickerContentProps = {
  chronicleEntries: ChronicleEntry[];
};

const DEFAULT_CHRONICLE_ENTRIES: ChronicleEntry[] = [
  {
    id: -1,
    type: "system",
    date: INITIAL_CHRONICLE_DATE,
    message:
      "Restoration notices will appear here as the Shire begins to mend.",
  },
  {
    id: -2,
    type: "system",
    date: INITIAL_CHRONICLE_DATE,
    message:
      "Bywater residents are encouraged to report damaged fences, empty pantries, and suspiciously idle cousins.",
  },
  {
    id: -3,
    type: "system",
    date: INITIAL_CHRONICLE_DATE,
    message:
      "The Four Farthings await willing hands, warm hearths, and a troubling amount of paperwork.",
  },
];

export function ChronicleTicker() {
  const { isGameLoaded, chronicleEntries } = useGameState();

  if (!isGameLoaded) {
    return (
      <footer className="shrink-0 border-t border-amber-200/10 bg-black/70 px-3 py-2 text-xs text-amber-100/70">
        The Shire Chronicle is being opened...
      </footer>
    );
  }

  return <ChronicleTickerContent chronicleEntries={chronicleEntries} />;
}

function ChronicleTickerContent({
  chronicleEntries,
}: ChronicleTickerContentProps) {
  const restorationStage = useRestorationStage();

  const liveEntries = useMemo(() => {
    return chronicleEntries.length > 0
      ? chronicleEntries
      : DEFAULT_CHRONICLE_ENTRIES;
  }, [chronicleEntries]);

  const [displayedEntries, setDisplayedEntries] = useState(liveEntries);
  const pendingEntriesRef = useRef(liveEntries);
  const hasPendingUpdateRef = useRef(false);

  useEffect(() => {
    pendingEntriesRef.current = liveEntries;
    hasPendingUpdateRef.current = true;
  }, [liveEntries]);

  function handleTickerIteration() {
    if (!hasPendingUpdateRef.current) return;

    setDisplayedEntries(pendingEntriesRef.current);
    hasPendingUpdateRef.current = false;
  }

  return (
    <footer
      className={[
        "shrink-0 border-t text-amber-100 shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.35)] transition-colors duration-700",
        restorationStage.theme.border,
        restorationStage.theme.tickerBackground,
      ].join(" ")}
    >
      <div className="flex h-9 items-center gap-0 overflow-hidden px-3 md:h-11 md:gap-3 lg:h-12 lg:px-4">
        <div
          className={[
            "hidden shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] shadow-sm transition-colors duration-700 md:block md:text-xs",
            restorationStage.theme.panelBackground,
            restorationStage.theme.border,
            restorationStage.theme.accentText,
          ].join(" ")}
        >
          {restorationStage.chronicleLabel}
        </div>

        <div className="relative isolate min-w-0 flex-1 overflow-hidden">
          <div
            className={[
              "pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-4 bg-linear-to-r to-transparent opacity-50 md:block",
              restorationStage.theme.tickerFadeFrom,
            ].join(" ")}
          />

          <div
            className={[
              "pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-4 bg-linear-to-l to-transparent opacity-50 md:block",
              restorationStage.theme.tickerFadeFrom,
            ].join(" ")}
          />

          <div
            onAnimationIteration={handleTickerIteration}
            className="chronicle-marquee text-xs text-amber-100/75 md:text-sm"
          >
            {displayedEntries.map((entry, index) => (
              <span
                key={`${entry.id}-${index}`}
                className={[
                  "inline-flex shrink-0 items-center",
                  entry.type === "milestone"
                    ? "text-amber-50"
                    : "text-amber-100/75",
                ].join(" ")}
              >
                {entry.type === "milestone" && (
                  <span className="mr-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-100">
                    Milestone
                  </span>
                )}

                <span className="shrink-0 font-semibold text-amber-200/80">
                  {formatShireDate(entry.date)}
                </span>

                <span className="mx-2 shrink-0 text-amber-200/40">|</span>

                <span className="shrink-0">{entry.message}</span>

                {index < displayedEntries.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-6 shrink-0 text-amber-200/45 md:mx-8"
                  >
                    ❧
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
