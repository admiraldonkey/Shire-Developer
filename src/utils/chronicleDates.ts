import type { ShireDate } from "../types/Chronicle.types";
import type { Upgrade } from "../types/Game.types";

export const INITIAL_CHRONICLE_DATE: ShireDate = {
  year: 1419,
  dayOfYear: 122, // 1 Thrimidge
};

const DAYS_IN_SHIRE_YEAR = 365;

const SHIRE_MONTHS = [
  "Afteryule",
  "Solmath",
  "Rethe",
  "Astron",
  "Thrimidge",
  "Forelithe",
  "Afterlithe",
  "Wedmath",
  "Halimath",
  "Winterfilth",
  "Blotmath",
  "Foreyule",
];

export function addDaysToShireDate(
  date: ShireDate,
  daysToAdd: number,
): ShireDate {
  let dayOfYear = date.dayOfYear + daysToAdd;
  let year = date.year;

  while (dayOfYear > DAYS_IN_SHIRE_YEAR) {
    dayOfYear -= DAYS_IN_SHIRE_YEAR;
    year += 1;
  }

  return {
    year,
    dayOfYear,
  };
}

export function formatShireDate(date: ShireDate) {
  const { dayOfYear, year } = date;

  if (dayOfYear === 1) {
    return `2 Yule, ${year} S.R.`;
  }

  if (dayOfYear === 182) {
    return `1 Lithe, ${year} S.R.`;
  }

  if (dayOfYear === 183) {
    return `Mid-year's Day, ${year} S.R.`;
  }

  if (dayOfYear === 184) {
    return `2 Lithe, ${year} S.R.`;
  }

  if (dayOfYear === 365) {
    return `1 Yule, ${year} S.R.`;
  }

  // Afteryule through Forelithe.
  if (dayOfYear >= 2 && dayOfYear <= 181) {
    const daysSinceAfteryuleStarted = dayOfYear - 2;
    const monthIndex = Math.floor(daysSinceAfteryuleStarted / 30);
    const dayOfMonth = (daysSinceAfteryuleStarted % 30) + 1;

    return `${dayOfMonth} ${SHIRE_MONTHS[monthIndex]}, ${year} S.R.`;
  }

  // Afterlithe through Foreyule.
  const daysSinceAfterlitheStarted = dayOfYear - 185;
  const monthIndex = 6 + Math.floor(daysSinceAfterlitheStarted / 30);
  const dayOfMonth = (daysSinceAfterlitheStarted % 30) + 1;

  return `${dayOfMonth} ${SHIRE_MONTHS[monthIndex]}, ${year} S.R.`;
}

export function getUpgradeChronicleDayAdvance(upgrade: Upgrade) {
  const cost = Math.max(1, upgrade.costNext);
  const costDays = Math.max(1, Math.floor(Math.log10(cost) * 3));

  const effectDays =
    upgrade.effect.type === "hobbitsPerSecond"
      ? Math.ceil(upgrade.effect.value / 5)
      : Math.ceil(upgrade.effect.value / 10);

  return Math.min(35, Math.max(1, costDays + effectDays));
}
