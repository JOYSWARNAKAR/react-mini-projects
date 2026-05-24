export default function ResetButton({ onReset }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 active:scale-[0.98]"
    >
      New game
    </button>
  )
}
