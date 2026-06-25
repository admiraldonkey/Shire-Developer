import { RESTORATION_STAGES } from "../data/restorationStages";

export function getRestorationStage(restorationPoints: number) {
  return RESTORATION_STAGES.reduce((currentStage, stage) => {
    if (restorationPoints >= stage.minRestorationPoints) {
      return stage;
    }

    return currentStage;
  }, RESTORATION_STAGES[0]);
}
