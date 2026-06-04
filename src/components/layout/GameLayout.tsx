import { useState } from "react";
import { TopBar } from "./TopBar";
import { ResourcePanel } from "./ResourcePanel";
import { MainActionPanel } from "./MainActionPanel";
import { UpgradeDrawer } from "./UpgradeDrawer";
import { ChroniclePanel } from "./ChroniclePanel";

export function GameLayout() {
  const [isUpgradePanelOpen, setIsUpgradePanelOpen] = useState(true);

  return (
    <main className="h-screen overflow-hidden bg-stone-950 text-amber-50">
      <div className="flex h-full flex-col">
        <TopBar />

        <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-4">
          <ResourcePanel />

          <div className="flex min-h-0 flex-1 flex-col gap-3 lg:contents">
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsUpgradePanelOpen((current) => !current)}
                aria-expanded={isUpgradePanelOpen}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-amber-300/40 bg-stone-950/90 px-4 text-sm font-semibold text-amber-100 shadow-lg transition hover:border-amber-200 hover:bg-stone-900"
              >
                {isUpgradePanelOpen ? "Hide upgrades" : "Show upgrades"}
              </button>
            </div>

            <MainActionPanel />
          </div>

          <UpgradeDrawer
            isOpen={isUpgradePanelOpen}
            onToggle={() => setIsUpgradePanelOpen((current) => !current)}
          />
        </div>
        <ChroniclePanel />
      </div>
    </main>
  );
}
