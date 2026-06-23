import type { Upgrade } from "../../types/Game.types";

type UpgradeCardProps = {
  upgrade: Upgrade;
  isSelected: boolean;
  isAffordable: boolean;
  isRecentlyPurchased?: boolean;
  recentPurchaseCount?: number;
  onSelect: () => void;
  onBuy: () => void;
  variant?: "landscape" | "portrait";
};

export function UpgradeCard({
  upgrade,
  isSelected,
  isAffordable,
  isRecentlyPurchased = false,
  recentPurchaseCount = 0,
  onSelect,
  onBuy,
  variant = "landscape",
}: UpgradeCardProps) {
  const isPortrait = variant === "portrait";

  const effectLabel =
    upgrade.effect.type === "hobbitsPerSecond"
      ? `+${upgrade.effect.value} / sec`
      : `+${upgrade.effect.value} / click`;

  const cardStateClasses = isRecentlyPurchased
    ? "z-30 scale-100 cursor-default border-green-400 opacity-100 shadow-2xl"
    : isSelected
      ? "z-20 scale-100 cursor-default border-amber-300 opacity-100 ring-2 ring-amber-300 shadow-2xl"
      : "z-10 scale-[0.96] cursor-pointer border-stone-400/70 opacity-65 hover:opacity-85";

  return (
    <article
      onClick={onSelect}
      className={[
        "relative w-full overflow-hidden rounded-2xl border shadow-xl",
        "transition-all duration-300",
        "bg-linear-to-br from-amber-50 via-stone-100 to-amber-100 text-stone-950",
        isPortrait ? "h-full min-h-0 p-3" : "w-full min-h-48 p-3",
        cardStateClasses,
        isSelected && !isPortrait && !isRecentlyPurchased
          ? "translate-x-2"
          : "",
      ].join(" ")}
    >
      {isRecentlyPurchased && (
        <div
          key={`purchase-flash-${upgrade.id}-${recentPurchaseCount}`}
          className="pointer-events-none absolute inset-0 z-20 animate-[purchase-flash_1400ms_ease-out] rounded-2xl"
          aria-hidden="true"
        />
      )}
      {isPortrait ? (
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-24 shrink-0 items-center justify-center rounded-xl border border-amber-300/70 bg-green-900 text-center text-sm text-amber-100 shadow-inner sm:h-28">
            Artwork placeholder
            {/* 
            Use below for images so they crop to fit frame:
            <img
  src={upgrade.image}
  alt=""
  className="h-full w-full rounded-xl object-cover"
/> */}
          </div>

          <div className="mt-4 flex shrink-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-600">
                {upgrade.category === "passive" ? "Passive" : "Click"}
              </p>

              <h3 className="mt-1 line-clamp-2 text-lg font-black leading-tight sm:text-xl">
                {upgrade.name}
              </h3>
            </div>

            <div
              className={[
                "relative z-40 shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition",
                isRecentlyPurchased
                  ? "bg-green-950 text-green-100 ring-2 ring-green-400/70 shadow-[0_0_1rem_rgba(34,197,94,0.7)]"
                  : "bg-stone-950 text-amber-100",
              ].join(" ")}
            >
              {isRecentlyPurchased && recentPurchaseCount > 0 && (
                <span
                  key={`${upgrade.id}-${recentPurchaseCount}`}
                  className="pointer-events-none absolute right-full top-1/2 z-50 mr-2 -translate-y-1/2 animate-[owned-pop_1200ms_ease-out_forwards] rounded-full bg-green-950/95 px-2 py-0.5 text-xs font-black text-green-100 shadow-lg ring-1 ring-green-300/50"
                >
                  +{recentPurchaseCount}
                </span>
              )}
              Own {upgrade.owned}
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-snug text-stone-700 sm:text-sm">
            {upgrade.description}
          </p>

          <div className="mt-3 grid shrink-0 grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="rounded-lg bg-white/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                Effect
              </p>
              <p className="mt-1 font-bold">{effectLabel}</p>
            </div>

            <div className="rounded-lg bg-white/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                Cost
              </p>
              <p className="mt-1 font-bold">
                {Math.ceil(upgrade.costNext).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-auto flex shrink-0 items-center justify-between gap-3 pt-2">
            <p className="text-xs text-stone-600">
              {isAffordable ? "Ready to recruit" : "Gather more hobbits"}
            </p>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onBuy();
              }}
              aria-disabled={!isAffordable}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-bold transition sm:px-4 sm:py-2 sm:text-sm",
                isAffordable
                  ? "cursor-pointer bg-green-800 text-amber-50 hover:bg-green-700"
                  : "cursor-not-allowed bg-stone-400 text-stone-100 opacity-70",
              ].join(" ")}
            >
              Recruit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 gap-3">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-amber-300/70 bg-green-900 text-center text-xs text-amber-100 shadow-inner">
            Artwork
            <br />
            placeholder
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600">
                  {upgrade.category === "passive" ? "Passive" : "Click"}
                </p>

                <h3 className="mt-1 truncate text-lg font-black leading-tight">
                  {upgrade.name}
                </h3>
              </div>

              <div
                className={[
                  "relative z-40 shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition",
                  isRecentlyPurchased
                    ? "bg-green-950 text-green-100 ring-2 ring-green-400/70 shadow-[0_0_1rem_rgba(34,197,94,0.7)]"
                    : "bg-stone-950 text-amber-100",
                ].join(" ")}
              >
                {isRecentlyPurchased && recentPurchaseCount > 0 && (
                  <span
                    key={`${upgrade.id}-${recentPurchaseCount}`}
                    className="pointer-events-none absolute right-full top-1/2 z-50 mr-2 -translate-y-1/2 animate-[owned-pop_1200ms_ease-out_forwards] rounded-full bg-green-950/95 px-2 py-0.5 text-xs font-black text-green-100 shadow-lg ring-1 ring-green-300/50"
                  >
                    +{recentPurchaseCount}
                  </span>
                )}
                Own {upgrade.owned}
              </div>
            </div>

            <p className="mt-2 line-clamp-2 text-sm leading-snug text-stone-700">
              {upgrade.description}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="min-w-0 rounded-lg bg-white/60 px-2 py-2">
                <p className="uppercase tracking-[0.16em] text-stone-500">
                  Effect
                </p>
                <p className="mt-1 truncate font-bold">{effectLabel}</p>
              </div>

              <div className="min-w-0 rounded-lg bg-white/60 px-2 py-2">
                <p className="uppercase tracking-[0.16em] text-stone-500">
                  Cost
                </p>
                <p className="mt-1 truncate font-bold">
                  {Math.ceil(upgrade.costNext).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="min-w-0 truncate text-xs text-stone-600">
                {isAffordable ? "Ready to recruit" : "Gather more hobbits"}
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onBuy();
                }}
                aria-disabled={!isAffordable}
                className={[
                  "rounded-full px-4 py-2 text-sm font-bold transition",
                  isAffordable
                    ? "cursor-pointer bg-green-800 text-amber-50 hover:bg-green-700"
                    : "cursor-not-allowed bg-stone-400 text-stone-100 opacity-70",
                ].join(" ")}
              >
                Recruit
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
