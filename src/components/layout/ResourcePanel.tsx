import { useGameState } from "../hooks/UseGame";
import { StatCard } from "../ui/StatCard";
import {
  getHobbitsPerClick,
  getHobbitsPerSecond,
  getTotalOwnedUpgrades,
} from "../../utils/gameCalculations";

export function ResourcePanel() {
  const { hobbits, upgrades } = useGameState();

  const hobbitsPerClick = getHobbitsPerClick(upgrades);
  const hobbitsPerSecond = getHobbitsPerSecond(upgrades);
  const totalOwnedUpgrades = getTotalOwnedUpgrades(upgrades);

  return (
    <aside className="min-h-0 overflow-y-auto rounded-3xl border border-amber-200/20 bg-stone-900/80 p-4 shadow-2xl backdrop-blur">
      <h2 className="mb-4 text-lg font-semibold text-amber-100">
        Shire Ledger
      </h2>

      <div className="space-y-3">
        <StatCard
          label="Hobbits"
          value={Math.floor(hobbits).toLocaleString()}
        />
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
