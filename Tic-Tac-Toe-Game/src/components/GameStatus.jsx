export default function GameStatus({ status, currentPlayer }) {
  const isWin = status.type === 'win'
  const isDraw = status.type === 'draw'
  const isTurn = status.type === 'turn'

  return (
    <div
      className={[
        'min-h-[4.5rem] rounded-2xl border px-6 py-4 text-center transition-all duration-300',
        isWin && 'border-emerald-500/50 bg-emerald-500/10',
        isDraw && 'border-amber-500/50 bg-amber-500/10',
        isTurn && 'border-slate-600/50 bg-slate-800/50',
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      {isTurn && (
        <>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
            Current turn
          </p>
          <p className="mt-1 text-2xl font-bold">
            <span
              className={
                currentPlayer === 'X' ? 'text-sky-400' : 'text-rose-400'
              }
            >
              Player {currentPlayer}
            </span>
          </p>
        </>
      )}

      {isWin && (
        <>
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/90">
            Winner
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-300">
            Player {status.winner} wins!
          </p>
        </>
      )}

      {isDraw && (
        <>
          <p className="text-sm font-medium uppercase tracking-wider text-amber-400/90">
            Game over
          </p>
          <p className="mt-1 text-2xl font-bold text-amber-300">
            It&apos;s a draw!
          </p>
        </>
      )}
    </div>
  )
}
