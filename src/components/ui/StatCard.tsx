import { type StatCardProps } from "../../types/UI.types";

export function StatCard({ label, value, className = "" }: StatCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-amber-200/15 bg-black/20 p-2.5 transition lg:p-4",
        className,
      ].join(" ")}
    >
      <p className="text-[8px] uppercase leading-none tracking-[0.22em] text-amber-200/50 lg:text-[10px]">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold leading-tight text-amber-100 lg:mt-2 lg:text-2xl">
        {value}
      </p>
    </div>
  );
}
