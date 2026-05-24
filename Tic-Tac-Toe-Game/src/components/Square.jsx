export default function Square({ value, onClick, disabled, isWinning, player }) {
  const isX = value === 'X'
  const isO = value === 'O'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        value
          ? `Square ${value}`
          : player
            ? `Empty square, ${player}'s turn`
            : 'Empty square'
      }
      className={[
        'flex h-24 w-24 items-center justify-center rounded-2xl border-2 text-4xl font-bold transition-all duration-200 sm:h-28 sm:w-28 sm:text-5xl',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400',
        isWinning
          ? 'scale-105 border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30'
          : 'border-slate-600/80 bg-slate-800/80 hover:border-slate-500 hover:bg-slate-700/90',
        !value && !disabled && 'cursor-pointer active:scale-95',
        disabled && !value && 'cursor-not-allowed opacity-60',
        isX && 'text-sky-400',
        isO && 'text-rose-400',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {value && (
        <span className="scale-100 transition-transform duration-200" aria-hidden="true">
          {value}
        </span>
      )}
    </button>
  )
}
