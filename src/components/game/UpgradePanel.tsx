import { useMemo, useState } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import { UpgradeCard } from "./UpgradeCard";
import type { UpgradeCategory } from "../../types/Game.types";

type UpgradeFilter = "all" | UpgradeCategory;

export function UpgradePanel() {
  const { hobbits, upgrades } = useGameState();
  const dispatch = useGameDispatch();

  const [selectedFilter, setSelectedFilter] = useState<UpgradeFilter>("all");
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<number | null>(
    upgrades[0]?.id ?? null,
  );

  const visibleUpgrades = useMemo(() => {
    if (selectedFilter === "all") return upgrades;
    return upgrades.filter((upgrade) => upgrade.category === selectedFilter);
  }, [selectedFilter, upgrades]);

  const activeUpgradeId = visibleUpgrades.some(
    (upgrade) => upgrade.id === selectedUpgradeId,
  )
    ? selectedUpgradeId
    : (visibleUpgrades[0]?.id ?? null);

  function handleBuyUpgrade(upgradeId: number) {
    dispatch({ type: "BUY_UPGRADE", payload: upgradeId });
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-amber-200/20 bg-stone-950/95 px-4 pb-4 pt-14 shadow-2xl backdrop-blur md:p-4">
      <div className="shrink-0">
        <h2 className="text-lg font-semibold text-amber-100">
          Rebuild the Shire
        </h2>

        <p className="mt-1 text-sm text-amber-100/60">
          Invest in comfort, community, and second breakfast logistics.
        </p>

        <div className="mt-4 flex gap-2">
          {(["all", "passive", "click"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={[
                "rounded-full px-3 py-1.5 text-sm font-semibold transition",
                selectedFilter === filter
                  ? "bg-amber-200 text-stone-950"
                  : "bg-stone-800 text-amber-100/75 hover:bg-stone-700",
              ].join(" ")}
            >
              {filter === "all"
                ? "All"
                : filter === "passive"
                  ? "Passive"
                  : "Click"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-hidden">
        {/* Desktop stacked deck */}
        <div className="hidden h-full overflow-y-auto overflow-x-hidden pr-3 md:block scrollbar-gutter-stable">
          <div className="-space-y-5 pb-8">
            {visibleUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                isSelected={upgrade.id === activeUpgradeId}
                isAffordable={hobbits >= upgrade.costNext}
                onSelect={() => setSelectedUpgradeId(upgrade.id)}
                onBuy={() => handleBuyUpgrade(upgrade.id)}
                variant="landscape"
              />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="flex min-h-0 flex-1 flex-col md:hidden">
          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="no-scrollbar flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto overflow-y-hidden px-6 py-3">
              <div className="w-[4vw] shrink-0" aria-hidden="true" />

              {visibleUpgrades.map((upgrade) => (
                <div
                  key={upgrade.id}
                  className="flex w-[72vw] max-w-xs shrink-0 snap-center items-center py-2"
                >
                  <UpgradeCard
                    upgrade={upgrade}
                    isSelected={upgrade.id === activeUpgradeId}
                    isAffordable={hobbits >= upgrade.costNext}
                    onSelect={() => setSelectedUpgradeId(upgrade.id)}
                    onBuy={() => handleBuyUpgrade(upgrade.id)}
                    variant="portrait"
                  />
                </div>
              ))}

              <div className="w-[4vw] shrink-0" aria-hidden="true" />
            </div>
          </div>

          <div className="shrink-0 pb-1 pt-2">
            <div className="flex justify-center gap-2">
              {visibleUpgrades.map((upgrade) => (
                <span
                  key={upgrade.id}
                  className={[
                    "h-2 rounded-full transition-all",
                    upgrade.id === activeUpgradeId
                      ? "w-6 bg-amber-200"
                      : "w-2 bg-amber-200/30",
                  ].join(" ")}
                />
              ))}
            </div>

            <p className="mt-2 text-center text-xs text-amber-100/45">
              Swipe to browse upgrades
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
