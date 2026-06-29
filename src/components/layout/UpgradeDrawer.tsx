import { UpgradePanel } from "../game/UpgradePanel";
import { useRestorationStage } from "../hooks/UseRestorationStage";

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
  const restorationStage = useRestorationStage();

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
        className={[
          "absolute right-4 top-4 z-50 mt-2 mr-2 hidden cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition hover:brightness-110 md:block",
          restorationStage.theme.panelBackground,
          restorationStage.theme.border,
          restorationStage.theme.accentText,
        ].join(" ")}
      >
        {isOpen ? "Hide upgrades" : "Show upgrades"}
      </button>

      <aside
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={[
          "absolute z-40 transition-transform duration-300 ease-out",
          "left-3 right-3 top-[calc(env(safe-area-inset-top,0)+0.75rem)] bottom-[calc(env(safe-area-inset-bottom,0)+0.75rem)]",
          "md:bottom-4 md:right-4 md:left-auto md:top-16 md:w-[min(92vw,34rem)]",
          "w-auto",
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-[calc(100%+2rem)] pointer-events-none",
        ].join(" ")}
      >
        <div className="relative h-full">
          {/* Mobile-only close button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Close upgrades"
            className={[
              "absolute right-3 top-3 z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-lg font-bold shadow-lg transition hover:brightness-110 md:hidden",
              restorationStage.theme.panelBackground,
              restorationStage.theme.border,
              restorationStage.theme.accentText,
            ].join(" ")}
          >
            ×
          </button>

          <UpgradePanel onUpgradePurchased={onUpgradePurchased} />
        </div>
      </aside>
    </>
  );
}
