import { RESTORATION_STAGES } from "../data/restorationStages";
import { getRestorationStage } from "./getRestorationStage";

export function getRestorationProgress(restorationPoints: number) {
  const currentStage = getRestorationStage(restorationPoints);
  const currentIndex = RESTORATION_STAGES.findIndex(
    (stage) => stage.id === currentStage.id,
  );

  const nextStage = RESTORATION_STAGES[currentIndex + 1] ?? null;

  if (!nextStage) {
    return {
      currentStage,
      nextStage: null,
      progressPercent: 100,
      pointsUntilNextStage: 0,
    };
  }

  const stageStart = currentStage.minRestorationPoints;
  const stageEnd = nextStage.minRestorationPoints;
  const pointsIntoStage = restorationPoints - stageStart;
  const pointsRequired = stageEnd - stageStart;

  const progressPercent = Math.min(
    100,
    Math.max(0, (pointsIntoStage / pointsRequired) * 100),
  );

  return {
    currentStage,
    nextStage,
    progressPercent,
    pointsUntilNextStage: Math.max(0, stageEnd - restorationPoints),
  };
}
