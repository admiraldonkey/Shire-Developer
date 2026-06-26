export type RestorationStageId =
  | "scoured"
  | "firstHearths"
  | "greenShoots"
  | "bywaterRising"
  | "fourFarthings"
  | "goldenYear"
  | "freeLand";

export type RestorationStage = {
  id: RestorationStageId;
  name: string;
  minRestorationPoints: number;
  mainTitle: string;
  mainDescription: string;
  milestoneMessage?: string;
  chronicleLabel: string;
  theme: {
    appBackground: string;
    panelBackground: string;
    mainPanelBackground: string;
    border: string;
    softBorder: string;
    accentText: string;
    recruitButton: string;
    recruitButtonGlow: string;
    tickerBackground: string;
    tickerFadeFrom: string;
  };
  unlocks: {
    fireflies: boolean;
    leafDecorations: boolean;
    goldenAccents: boolean;
    festivalTouches: boolean;
  };
};
