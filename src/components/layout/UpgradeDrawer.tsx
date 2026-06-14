import { UpgradePanel } from "../game/UpgradePanel";

type UpgradeDrawerProps = {
  isOpen: boolean;
  onToggle: () => void;
  onUpgradePurchased: (cost: number) => void;
};

export function UpgradeDrawer({
  isOpen,
  onToggle,
  onUpgradePurchased,
}: UpgradeDrawerProps) {
  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] md:bg-transparent md:backdrop-blur-0"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Desktop-only drawer button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="cursor-pointer absolute right-4 top-4 z-50 mt-2 mr-2 hidden rounded-full border border-amber-300/40 bg-stone-950/90 px-4 py-2 text-sm font-semibold text-amber-100 shadow-lg transition hover:border-amber-200 hover:bg-stone-900 md:block"
      >
        {isOpen ? "Hide upgrades" : "Show upgrades"}
      </button>

      <aside
        className={[
          "absolute z-40 transition-transform duration-300 ease-out",
          "inset-x-3 bottom-3 top-3",
          "md:bottom-4 md:right-4 md:left-auto md:top-16 md:w-[min(92vw,34rem)]",
          "w-auto",
          isOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]",
        ].join(" ")}
      >
        <div className="relative h-full">
          {/* Mobile-only close button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Close upgrades"
            className="cursor-pointer absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-stone-950 text-lg font-bold text-amber-100 shadow-lg transition hover:border-amber-200 hover:bg-stone-900 md:hidden"
          >
            ×
          </button>

          <UpgradePanel onUpgradePurchased={onUpgradePurchased} />
        </div>
      </aside>
    </>
  );
}
