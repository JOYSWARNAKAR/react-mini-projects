import Square from './Square'

export default function Board({ squares, onPlay, winningLine, gameOver, currentPlayer }) {
  const winningSet = new Set(winningLine ?? [])

  return (
    <div
      className="grid grid-cols-3 gap-3 rounded-3xl bg-slate-900/60 p-4 shadow-2xl ring-1 ring-slate-700/50 sm:gap-4 sm:p-5"
      role="grid"
      aria-label="Tic tac toe board"
    >
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          player={currentPlayer}
          isWinning={winningSet.has(index)}
          disabled={gameOver || value !== null}
          onClick={() => onPlay(index)}
        />
      ))}
    </div>
  )
}
