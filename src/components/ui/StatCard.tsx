import { type StatCardProps } from "../../types/UI.types";

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-amber-200/15 bg-black/20 p-3 lg:p-4">
      <p className="text-[9px] uppercase tracking-[0.24em] text-amber-200/50 lg:text-[10px]">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-amber-100 lg:mt-2 lg:text-2xl">
        {value}
      </p>
    </div>
  );
}
