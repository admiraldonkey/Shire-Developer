import { Upgrades } from "../Upgrades";

type UpgradeDrawerProps = {
  isOpen: boolean;
  onToggle: () => void;
};
// Eventually add sorting options depending on upgrade category but default to all (eg All | Passive | Click)
export function UpgradeDrawer({ isOpen, onToggle }: UpgradeDrawerProps) {
  return (
    <aside
      className={[
        "min-h-0 min-w-0 transition-all duration-300",
        isOpen ? "lg:w-80" : "lg:w-12",
        "w-full",
      ].join(" ")}
    >
      <div className="flex h-full min-h-0 flex-col">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="mb-3 shrink-0 rounded-full border border-amber-300/40 bg-stone-900/80 px-4 py-2 text-sm text-amber-100 shadow-lg"
        >
          {isOpen ? "Hide upgrades" : "Upgrades"}
        </button>

        {isOpen && (
          <section className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-amber-200/20 bg-stone-900/80 p-4 shadow-2xl backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold text-amber-100">
              Rebuild the Shire
            </h2>

            <Upgrades />
          </section>
        )}
      </div>
    </aside>
  );
}
