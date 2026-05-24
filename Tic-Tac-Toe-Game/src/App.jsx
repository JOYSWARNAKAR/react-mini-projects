import { useState } from 'react'
import Board from './components/Board'
import GameStatus from './components/GameStatus'
import ResetButton from './components/ResetButton'
import Scoreboard from './components/Scoreboard'
import {
  calculateWinner,
  getNextPlayer,
  isBoardFull,
} from './utils/gameLogic'

const EMPTY_BOARD = Array(9).fill(null)

function getGameStatus(squares, winner) {
  if (winner) {
    return { type: 'win', winner: winner.winner }
  }
  if (isBoardFull(squares)) {
    return { type: 'draw' }
  }
  return { type: 'turn' }
}

export default function App() {
  const [squares, setSquares] = useState(EMPTY_BOARD)
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const result = calculateWinner(squares)
  const status = getGameStatus(squares, result)
  const gameOver = status.type !== 'turn'

  function handlePlay(index) {
    if (squares[index] || gameOver) return

    const nextSquares = squares.slice()
    nextSquares[index] = currentPlayer
    setSquares(nextSquares)

    const outcome = calculateWinner(nextSquares)
    if (outcome) {
      setScores((prev) => ({
        ...prev,
        [outcome.winner]: prev[outcome.winner] + 1,
      }))
      return
    }
    if (isBoardFull(nextSquares)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      return
    }

    setCurrentPlayer(getNextPlayer(currentPlayer))
  }

  function handleReset() {
    setSquares(EMPTY_BOARD)
    setCurrentPlayer('X')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-slate-100">
      <main className="w-full max-w-md space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Tic Tac Toe
          </h1>
          <p className="mt-2 text-slate-400">
            Two players · X goes first
          </p>
        </header>

        <Scoreboard scores={scores} />

        <GameStatus status={status} currentPlayer={currentPlayer} />

        <div className="flex justify-center">
          <Board
            squares={squares}
            onPlay={handlePlay}
            winningLine={result?.line}
            gameOver={gameOver}
            currentPlayer={currentPlayer}
          />
        </div>

        <div className="flex justify-center">
          <ResetButton onReset={handleReset} />
        </div>
      </main>
    </div>
  )
}
