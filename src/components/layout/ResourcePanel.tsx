import { useGameState } from "../hooks/UseGame";
import { StatCard } from "../ui/StatCard";
import {
  getHobbitsPerClick,
  getHobbitsPerSecond,
  getTotalOwnedUpgrades,
} from "../../utils/gameCalculations";
import type { ResourceSpendFeedback } from "../../types/UI.types";
import { useRestorationStage } from "../hooks/UseRestorationStage";

type ResourcePanelProps = {
  spendFeedback?: ResourceSpendFeedback | null;
};

export function ResourcePanel({ spendFeedback }: ResourcePanelProps) {
  const { hobbits, upgrades } = useGameState();
  const restorationStage = useRestorationStage();

  const hobbitsPerClick = getHobbitsPerClick(upgrades);
  const hobbitsPerSecond = getHobbitsPerSecond(upgrades);
  const totalOwnedUpgrades = getTotalOwnedUpgrades(upgrades);

  return (
    <aside
      className={[
        "shrink-0 rounded-3xl border p-3 shadow-2xl backdrop-blur transition-colors duration-700 lg:min-h-0 lg:overflow-y-auto lg:p-4",
        restorationStage.theme.panelBackground,
        restorationStage.theme.border,
      ].join(" ")}
    >
      <div className="mb-2 flex items-center justify-between gap-3 lg:mb-4">
        <h2 className="text-base font-semibold text-amber-100 lg:text-lg">
          Shire Ledger
        </h2>

        <span className="hidden min-w-0 max-w-36 items-center justify-center truncate rounded-full border border-amber-200/20 bg-black/20 px-3 py-1 text-center text-[10px] font-semibold leading-none text-amber-100/70 sm:inline-flex">
          {restorationStage.name}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
        <div className="relative">
          <StatCard
            label="Hobbits"
            value={Math.floor(hobbits).toLocaleString()}
            className={
              spendFeedback ? "ring-2 ring-red-400/70 bg-red-950/30" : ""
            }
          />

          {spendFeedback && (
            <span
              key={spendFeedback.id}
              className="pointer-events-none absolute right-4 top-2 animate-[float-spend_1200ms_ease-out_forwards] text-sm font-black text-red-300"
            >
              -{spendFeedback.amount.toLocaleString()}
            </span>
          )}
        </div>
        <StatCard
          label="Per second"
          value={hobbitsPerSecond.toLocaleString()}
        />
        <StatCard label="Per click" value={hobbitsPerClick.toLocaleString()} />
        <StatCard
          label="Upgrades owned"
          value={totalOwnedUpgrades.toString()}
        />
      </div>
    </aside>
  );
}
