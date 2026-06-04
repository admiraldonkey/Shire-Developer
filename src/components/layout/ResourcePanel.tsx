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
    <aside className="rounded-3xl border border-amber-200/20 bg-stone-900/80 p-4 shadow-2xl backdrop-blur lg:p-5">
      <h2 className="mb-3 text-lg font-semibold text-amber-100 lg:mb-4">
        Shire Ledger
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
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
