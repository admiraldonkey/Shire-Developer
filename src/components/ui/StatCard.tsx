import { type StatCardProps } from "../../types/UI.types";

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-amber-200/15 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-amber-200/50">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-amber-100">{value}</p>
    </div>
  );
}
