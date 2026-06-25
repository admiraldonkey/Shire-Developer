import { RecruitButton } from "../game/RecruitButton";
import { useRestorationStage } from "../hooks/UseRestorationStage";

export function MainActionPanel() {
  const restorationStage = useRestorationStage();

  return (
    <section
      className={[
        "min-h-0 min-w-0 flex-1 overflow-hidden rounded-3xl border p-4 shadow-2xl transition-colors duration-700 lg:p-6",
        restorationStage.theme.border,
        restorationStage.theme.mainPanelBackground,
      ].join(" ")}
    >
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 text-center lg:gap-8">
        <div className="shrink-0">
          <p className="hidden text-sm uppercase tracking-[0.35em] text-amber-200/60 sm:block">
            The Shire stirs
          </p>

          <h1 className="text-xl font-bold text-amber-100 sm:mt-3 sm:text-2xl lg:text-3xl">
            {restorationStage.mainTitle}
          </h1>

          <p className="mt-2 hidden max-w-xl text-sm text-amber-100/70 sm:block">
            {restorationStage.mainDescription}
          </p>
        </div>

        <RecruitButton />
      </div>
    </section>
  );
}
