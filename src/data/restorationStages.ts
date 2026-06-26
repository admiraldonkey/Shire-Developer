import type { RestorationStage } from "../types/Restoration.types";

export const RESTORATION_STAGES: RestorationStage[] = [
  {
    id: "scoured",
    name: "Scoured Shire",
    minRestorationPoints: 0,
    mainTitle: "Rebuild what was lost",
    mainDescription:
      "The lanes are scarred and the fields lie quiet, but every willing hand brings warmth back beneath the hill.",
    milestoneMessage: "The work of restoring the Shire begins",
    chronicleLabel: "Westfarthing Times",
    theme: {
      appBackground:
        "bg-gradient-to-br from-stone-950 via-neutral-950 to-zinc-900",
      panelBackground: "bg-stone-950/90",
      mainPanelBackground:
        "bg-gradient-to-br from-stone-950 via-zinc-950 to-neutral-900",
      border: "border-amber-200/15",
      softBorder: "border-stone-500/25",
      accentText: "text-amber-100",
      recruitButton:
        "bg-gradient-to-br from-green-950 via-stone-900 to-zinc-950",
      recruitButtonGlow: "shadow-stone-950/70",
      tickerBackground: "bg-black/75",
      tickerFadeFrom: "from-black/90",
    },
    unlocks: {
      fireflies: false,
      leafDecorations: false,
      goldenAccents: false,
      festivalTouches: false,
    },
  },
  {
    id: "firstHearths",
    name: "First Hearths",
    minRestorationPoints: 250,
    mainTitle: "The first hearths are lit",
    mainDescription:
      "Smoke curls from mended chimneys, and the first warm windows begin to glow against the dark.",
    milestoneMessage:
      "The first hearths are lit again, and warm windows begin to answer the dark",
    chronicleLabel: "Bywater Notices",
    theme: {
      appBackground:
        "bg-gradient-to-br from-stone-950 via-amber-950 to-green-950",
      panelBackground: "bg-stone-950/85",
      mainPanelBackground:
        "bg-gradient-to-br from-green-950 via-stone-950 to-amber-950",
      border: "border-amber-300/20",
      softBorder: "border-amber-200/20",
      accentText: "text-amber-100",
      recruitButton:
        "bg-gradient-to-br from-green-900 via-green-950 to-amber-950",
      recruitButtonGlow: "shadow-amber-950/60",
      tickerBackground: "bg-black/75",
      tickerFadeFrom: "from-black/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: false,
      goldenAccents: false,
      festivalTouches: false,
    },
  },
  {
    id: "greenShoots",
    name: "Green Shoots",
    minRestorationPoints: 1_000,
    mainTitle: "Green returns to the fields",
    mainDescription:
      "Fresh shoots break through the turned earth, and the Shire begins to remember its own colour.",
    milestoneMessage:
      "Green shoots return to the fields, and the Shire begins to remember its colour",
    chronicleLabel: "Four Farthings Report",
    theme: {
      appBackground:
        "bg-gradient-to-br from-green-950 via-stone-900 to-lime-950",
      panelBackground: "bg-green-950/80",
      mainPanelBackground:
        "bg-gradient-to-br from-green-900 via-green-950 to-stone-900",
      border: "border-lime-300/25",
      softBorder: "border-green-200/20",
      accentText: "text-lime-100",
      recruitButton:
        "bg-gradient-to-br from-green-800 via-emerald-900 to-lime-950",
      recruitButtonGlow: "shadow-green-950/60",
      tickerBackground: "bg-green-950/75",
      tickerFadeFrom: "from-green-950/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: true,
      goldenAccents: false,
      festivalTouches: false,
    },
  },
  {
    id: "bywaterRising",
    name: "Bywater Rising",
    minRestorationPoints: 5_000,
    mainTitle: "Bywater rises again",
    mainDescription:
      "Paths are cleared, gardens are replanted, and neighbours gather where silence had taken root.",
    milestoneMessage:
      "Bywater rises again as paths are cleared, gardens replanted, and neighbours gather",
    chronicleLabel: "Bywater Chronicle",
    theme: {
      appBackground:
        "bg-gradient-to-br from-emerald-950 via-green-900 to-yellow-950",
      panelBackground: "bg-green-950/75",
      mainPanelBackground:
        "bg-gradient-to-br from-emerald-900 via-green-900 to-amber-900",
      border: "border-yellow-300/30",
      softBorder: "border-emerald-200/25",
      accentText: "text-yellow-100",
      recruitButton:
        "bg-gradient-to-br from-emerald-700 via-green-800 to-amber-800",
      recruitButtonGlow: "shadow-emerald-950/60",
      tickerBackground: "bg-green-950/75",
      tickerFadeFrom: "from-green-950/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: true,
      goldenAccents: true,
      festivalTouches: false,
    },
  },
  {
    id: "fourFarthings",
    name: "The Four Farthings Stir",
    minRestorationPoints: 20_000,
    mainTitle: "The Four Farthings stir",
    mainDescription:
      "Word of renewal spreads from field to lane, from mill to market, from hearth to hearth.",
    milestoneMessage: "Word of restoration spreads across the Four Farthings",
    chronicleLabel: "The Shire Chronicle",
    theme: {
      appBackground:
        "bg-gradient-to-br from-green-900 via-emerald-800 to-amber-900",
      panelBackground: "bg-emerald-950/70",
      mainPanelBackground:
        "bg-gradient-to-br from-green-800 via-emerald-900 to-yellow-800",
      border: "border-amber-300/35",
      softBorder: "border-lime-200/25",
      accentText: "text-amber-100",
      recruitButton:
        "bg-gradient-to-br from-green-700 via-lime-800 to-amber-700",
      recruitButtonGlow: "shadow-lime-950/60",
      tickerBackground: "bg-amber-950/70",
      tickerFadeFrom: "from-amber-950/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: true,
      goldenAccents: true,
      festivalTouches: false,
    },
  },
  {
    id: "goldenYear",
    name: "The Golden Year",
    minRestorationPoints: 75_000,
    mainTitle: "The Shire enters a golden year",
    mainDescription:
      "The harvests swell, the trees grow tall, and laughter returns to every road and round green door.",
    milestoneMessage:
      "The Shire enters a golden year of harvest, laughter, and full tables",
    chronicleLabel: "Golden Year Chronicle",
    theme: {
      appBackground:
        "bg-gradient-to-br from-green-800 via-lime-800 to-amber-700",
      panelBackground: "bg-green-950/65",
      mainPanelBackground:
        "bg-gradient-to-br from-lime-800 via-green-800 to-amber-600",
      border: "border-yellow-200/45",
      softBorder: "border-yellow-100/30",
      accentText: "text-yellow-50",
      recruitButton:
        "bg-gradient-to-br from-lime-700 via-green-700 to-yellow-600",
      recruitButtonGlow: "shadow-yellow-900/60",
      tickerBackground: "bg-amber-950/70",
      tickerFadeFrom: "from-amber-950/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: true,
      goldenAccents: true,
      festivalTouches: true,
    },
  },
  {
    id: "freeLand",
    name: "Free Land Flourishing",
    minRestorationPoints: 250_000,
    mainTitle: "The Shire flourishes in peace",
    mainDescription:
      "Green hills, bright gardens, full tables, and quiet roads mark a land restored to itself.",
    milestoneMessage:
      "The Shire flourishes in peace, restored to green hills and quiet roads",
    chronicleLabel: "Free Land Chronicle",
    theme: {
      appBackground:
        "bg-gradient-to-br from-emerald-700 via-green-700 to-yellow-500",
      panelBackground: "bg-emerald-950/60",
      mainPanelBackground:
        "bg-gradient-to-br from-emerald-700 via-lime-700 to-amber-500",
      border: "border-yellow-100/60",
      softBorder: "border-lime-100/40",
      accentText: "text-yellow-50",
      recruitButton:
        "bg-gradient-to-br from-green-600 via-lime-600 to-amber-500",
      recruitButtonGlow: "shadow-yellow-800/70",
      tickerBackground: "bg-amber-950/70",
      tickerFadeFrom: "from-amber-950/90",
    },
    unlocks: {
      fireflies: true,
      leafDecorations: true,
      goldenAccents: true,
      festivalTouches: true,
    },
  },
];
