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

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[16rem_minmax(0,1fr)_auto]">
          <ResourcePanel />

          <MainActionPanel />

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
