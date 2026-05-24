import { useEffect, useState } from "react";

const SECOND = 1000;
const DEFAULT_SECONDS = 5 * 60;

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
}

function clampTimeUnit(value, max) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
}

function Timer() {
  const [duration, setDuration] = useState(DEFAULT_SECONDS);
  const [remaining, setRemaining] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, SECOND);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const updateDuration = (nextDuration) => {
    const safeDuration = Math.max(0, nextDuration);

    setDuration(safeDuration);
    setRemaining(safeDuration);
    setIsRunning(false);
  };

  const updateUnit = (unit, value) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const next = {
      hours,
      minutes,
      seconds,
      [unit]: clampTimeUnit(
        value,
        unit === "hours" ? 23 : 59
      ),
    };

    updateDuration(
      next.hours * 3600 +
        next.minutes * 60 +
        next.seconds
    );
  };

  const resetTimer = () => {
    setRemaining(duration);
    setIsRunning(false);
  };

  return (
    <section className="text-white">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        Timer
      </h1>

      {/* Time Display */}
      <div className="text-center mb-10">
        <div className="text-6xl font-bold tracking-wider">
          {formatTime(remaining)}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        
        <label className="flex flex-col items-center gap-2">
          <span className="text-slate-400 text-sm">
            Hours
          </span>

          <input
            type="number"
            min="0"
            max="23"
            value={Math.floor(duration / 3600)}
            onChange={(event) =>
              updateUnit(
                "hours",
                event.target.valueAsNumber
              )
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-center text-white outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>

        <label className="flex flex-col items-center gap-2">
          <span className="text-slate-400 text-sm">
            Minutes
          </span>

          <input
            type="number"
            min="0"
            max="59"
            value={Math.floor((duration % 3600) / 60)}
            onChange={(event) =>
              updateUnit(
                "minutes",
                event.target.valueAsNumber
              )
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-center text-white outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>

        <label className="flex flex-col items-center gap-2">
          <span className="text-slate-400 text-sm">
            Seconds
          </span>

          <input
            type="number"
            min="0"
            max="59"
            value={duration % 60}
            onChange={(event) =>
              updateUnit(
                "seconds",
                event.target.valueAsNumber
              )
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-center text-white outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        
        <button
          disabled={duration === 0 || remaining === 0}
          onClick={() =>
            setIsRunning((current) => !current)
          }
          className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-400 transition-all duration-300 shadow-lg"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

export default Timer;