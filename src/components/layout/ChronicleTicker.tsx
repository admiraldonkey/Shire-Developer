import { useEffect, useMemo, useRef, useState } from "react";
import { useGameState } from "../hooks/UseGame";
import { formatShireDate } from "../../utils/chronicleDates";
import type { ChronicleEntry } from "../../types/Chronicle.types";

type ChronicleTickerContentProps = {
  chronicleEntries: ChronicleEntry[];
};

const DEFAULT_CHRONICLE_MESSAGES = [
  "Restoration notices will appear here as the Shire begins to mend",
  "Bywater residents are encouraged to report damaged fences, empty pantries, and suspiciously idle cousins",
  "The Four Farthings await willing hands, warm hearths, and a troubling amount of paperwork",
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
  const liveMessages = useMemo(() => {
    if (chronicleEntries.length === 0) {
      return DEFAULT_CHRONICLE_MESSAGES;
    }

    return chronicleEntries.map(
      (entry) => `${formatShireDate(entry.date)} | ${entry.message}`,
    );
  }, [chronicleEntries]);

  const [displayedMessages, setDisplayedMessages] = useState(liveMessages);
  const pendingMessagesRef = useRef(liveMessages);
  const hasPendingUpdateRef = useRef(false);

  useEffect(() => {
    pendingMessagesRef.current = liveMessages;
    hasPendingUpdateRef.current = true;
  }, [liveMessages]);

  function handleTickerIteration() {
    if (!hasPendingUpdateRef.current) return;

    setDisplayedMessages(pendingMessagesRef.current);
    hasPendingUpdateRef.current = false;
  }

  return (
    <footer className="shrink-0 border-t border-amber-200/10 bg-black/70 text-amber-100 shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.35)]">
      <div className="flex h-9 items-center gap-0 overflow-hidden px-3 md:h-11 md:gap-3 lg:h-12 lg:px-4">
        <div className="hidden shrink-0 rounded-full border border-amber-300/30 bg-stone-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-200/80 md:block md:text-xs">
          The Shire Chronicle
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-black/80 to-transparent" />

          <div
            onAnimationIteration={handleTickerIteration}
            className="chronicle-marquee whitespace-nowrap text-xs text-amber-100/75 md:text-sm"
          >
            {displayedMessages.map((message, index) => (
              <span
                key={`${message}-${index}`}
                className="inline-flex items-center"
              >
                <span>{message}</span>

                {index < displayedMessages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-6 text-amber-200/45 md:mx-8"
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
