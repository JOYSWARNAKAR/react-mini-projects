export default function Scoreboard({ scores }) {
  return (
    <div className="flex gap-4 text-center">
      <div className="flex-1 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-sky-400/80">
          Player X
        </p>
        <p className="mt-1 text-2xl font-bold text-sky-300">{scores.X}</p>
      </div>
      <div className="flex-1 rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Draws
        </p>
        <p className="mt-1 text-2xl font-bold text-slate-300">{scores.draws}</p>
      </div>
      <div className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-rose-400/80">
          Player O
        </p>
        <p className="mt-1 text-2xl font-bold text-rose-300">{scores.O}</p>
      </div>
    </div>
  )
}
