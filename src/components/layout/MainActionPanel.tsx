import { RecruitButton } from "../game/RecruitButton";

export function MainActionPanel() {
  return (
    <section className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-3xl border border-amber-200/20 bg-linear-to-br from-green-950 via-stone-950 to-stone-900 p-5 shadow-2xl lg:p-6">
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-5 lg:gap-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/60">
            The Shire stirs
          </p>

          <h1 className="mt-3 text-2xl font-bold text-amber-100 lg:text-3xl">
            Rebuild what was lost
          </h1>

          <p className="mt-3 max-w-xl text-sm text-amber-100/70">
            The lanes are scarred and the fields lie quiet, but every willing
            hand brings warmth back beneath the hill.
          </p>
        </div>

        <RecruitButton />
      </div>
    </section>
  );
}
