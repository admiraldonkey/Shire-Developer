import { useRestorationStage } from "../hooks/UseRestorationStage";

export function RestorationDecorations() {
  const stage = useRestorationStage();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stage.unlocks.fireflies && (
        <>
          <span className="shire-firefly left-[12%] top-[30%]" />
          <span className="shire-firefly left-[78%] top-[22%] animation-delay-700" />
          <span className="shire-firefly left-[52%] top-[70%] animation-delay-1200" />
        </>
      )}

      {stage.unlocks.leafDecorations && (
        <>
          <span className="shire-leaf left-[8%] top-[12%]" />
          <span className="shire-leaf right-[10%] top-[18%]" />
        </>
      )}

      {stage.unlocks.goldenAccents && (
        <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-yellow-200/40 to-transparent" />
      )}

      {stage.unlocks.festivalTouches && (
        <div className="absolute left-1/2 top-3 h-1 w-28 -translate-x-1/2 rounded-full bg-amber-200/30 blur-sm" />
      )}
    </div>
  );
}
