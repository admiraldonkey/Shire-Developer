import { useRef, useState } from "react";
// import { useUserState } from "../hooks/UseUser";
import { TopBar } from "./TopBar";
import { ResourcePanel } from "./ResourcePanel";
import { MainActionPanel } from "./MainActionPanel";
import { UpgradeDrawer } from "./UpgradeDrawer";
import { ChroniclePanel } from "./ChroniclePanel";
import type { ResourceSpendFeedback } from "../../types/UI.types";

export function GameLayout() {
  const [isUpgradePanelOpen, setIsUpgradePanelOpen] = useState(false);
  const [spendFeedback, setSpendFeedback] =
    useState<ResourceSpendFeedback | null>(null);
  const spendFeedbackIdRef = useRef(0);

  function getNextSpendFeedbackId() {
    spendFeedbackIdRef.current += 1;
    return spendFeedbackIdRef.current;
  }

  function handleUpgradePurchased(cost: number) {
    const feedback: ResourceSpendFeedback = {
      id: getNextSpendFeedbackId(),
      amount: cost,
    };

    setSpendFeedback(feedback);

    window.setTimeout(() => {
      setSpendFeedback((current) =>
        current?.id === feedback.id ? null : current,
      );
    }, 1200);
  }
  // const { currentUser } = useUserState();

  // useEffect(() => {
  //   setIsUpgradePanelOpen(false);
  // }, [currentUser?.name]);

  // ^^ Fix above once switch user button has been implemented

  return (
    <main className="h-dvh overflow-hidden bg-stone-950 text-amber-50">
      <div className="flex h-full min-h-0 flex-col">
        <TopBar />

        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-2.5 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-4 lg:p-4">
          <ResourcePanel spendFeedback={spendFeedback} />

          <div className="flex min-h-0 flex-1 flex-col gap-3 lg:contents">
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsUpgradePanelOpen((current) => !current)}
                aria-expanded={isUpgradePanelOpen}
                className="cursor-pointer flex h-11 w-full items-center justify-center rounded-xl border border-amber-300/40 bg-stone-950/90 px-4 text-sm font-semibold text-amber-100 shadow-lg transition hover:border-amber-200 hover:bg-stone-900"
              >
                {isUpgradePanelOpen ? "Hide upgrades" : "Show upgrades"}
              </button>
            </div>

            <MainActionPanel />
          </div>

          <UpgradeDrawer
            isOpen={isUpgradePanelOpen}
            onToggle={() => setIsUpgradePanelOpen((current) => !current)}
            onUpgradePurchased={handleUpgradePurchased}
          />
        </div>
        <ChroniclePanel />
      </div>
    </main>
  );
}
