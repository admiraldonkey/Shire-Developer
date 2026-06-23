export type ChronicleEntryType = "system" | "purchase" | "milestone";

export type ShireDate = {
  year: number;
  dayOfYear: number;
};

export type ChronicleEntry = {
  id: number;
  type: ChronicleEntryType;
  message: string;
  date: ShireDate;
};
