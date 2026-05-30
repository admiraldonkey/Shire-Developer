import type { Upgrade } from "../types/Game.types";

type PassiveUpgradeDefinition = {
  name: string;
  description: string;
};

export const passiveUpgradeDefinitions: Record<
  number,
  PassiveUpgradeDefinition
> = {
  1: {
    name: "Hobbit Hole",
    description:
      "A warm round door, a full pantry, and somewhere decent to put one’s feet up.",
  },
  2: {
    name: "Peace and Quiet",
    description:
      "The gentle art of getting folk back to work by letting them complain in comfort.",
  },
  3: {
    name: "Good Tilled Earth",
    description:
      "Freshly turned soil, patient hands, and the first signs of proper harvests returning.",
  },
  4: {
    name: "Pint of Ale",
    description:
      "Morale improves. Productivity may or may not be formally measurable.",
  },
  5: {
    name: "Old Toby",
    description:
      "A little pipe-weed restores patience, wisdom, and suspiciously long lunch breaks.",
  },
  6: {
    name: "Bakery",
    description:
      "The smell of bread returns to the lanes. Naturally, everyone becomes more useful.",
  },
  7: {
    name: "Gandalf's Fireworks",
    description:
      "A flash of wonder in the sky reminds the Shire what celebration feels like.",
  },
  8: {
    name: "Inn",
    description:
      "A place for songs, gossip, second suppers, and mildly unreliable plans.",
  },
  9: {
    name: "Brewery",
    description:
      "Because civilisation begins when someone says, ‘We should make more ale.’",
  },
  10: {
    name: "111th Birthday Party",
    description:
      "A grand occasion. Excessive, unnecessary, and therefore absolutely vital.",
  },
};

export const clickPowerUpgrades: Upgrade[] = [
  {
    id: 101,
    name: "Sturdy Walking Stick",
    description:
      "A firm knock on the path gathers attention faster than polite coughing.",
    baseCost: 25,
    costNext: 25,
    costMultiplier: 1.2,
    owned: 0,
    category: "click",
    effect: {
      type: "hobbitsPerClick",
      value: 1,
    },
  },
  {
    id: 102,
    name: "Second Breakfast Bell",
    description:
      "Ring it once and half the village remembers they had somewhere to be.",
    baseCost: 150,
    costNext: 150,
    costMultiplier: 1.2,
    owned: 0,
    category: "click",
    effect: {
      type: "hobbitsPerClick",
      value: 5,
    },
  },
  {
    id: 103,
    name: "Village Noticeboard",
    description:
      "A well-placed notice saves hours of wandering about asking daft questions.",
    baseCost: 750,
    costNext: 750,
    costMultiplier: 1.15,
    owned: 0,
    category: "click",
    effect: {
      type: "hobbitsPerClick",
      value: 15,
    },
  },
  {
    id: 104,
    name: "Mayor's Invitation",
    description:
      "A formal summons, softened with cake, gets even the reluctant folk moving.",
    baseCost: 3000,
    costNext: 3000,
    costMultiplier: 1.2,
    owned: 0,
    category: "click",
    effect: {
      type: "hobbitsPerClick",
      value: 50,
    },
  },
];
