import { useMemo } from "react";
import { getRestorationStage } from "../../utils/getRestorationStage";
import { useGameState } from "./UseGame";

export function useRestorationStage() {
  const { restorationPoints } = useGameState();

  return useMemo(
    () => getRestorationStage(restorationPoints),
    [restorationPoints],
  );
}
