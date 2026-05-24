import { useEffect, useRef, useState } from "react";

const TICK_RATE = 10;

function formatElapsed(totalMilliseconds) {
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const centiseconds = Math.floor((totalMilliseconds % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}.${String(centiseconds).padStart(2, "0")}`;
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;

    startedAtRef.current = Date.now() - elapsed;

    const intervalId = setInterval(() => {
      setElapsed(Date.now() - startedAtRef.current);
    }, TICK_RATE);

    return () => clearInterval(intervalId);
  }, [elapsed, isRunning]);

  const addLap = () => {
    if (elapsed === 0) return;

    const previousTotal = laps.reduce(
      (total, lap) => total + lap,
      0
    );

    setLaps((current) => [
      elapsed - previousTotal,
      ...current,
    ]);
  };

  const resetStopwatch = () => {
    setElapsed(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <section className="text-white">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        Stopwatch
      </h1>

      {/* Time Display */}
      <div className="text-center mb-10">
        <div className="text-6xl font-bold tracking-wider">
          {formatElapsed(elapsed)}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        
        <button
          onClick={() =>
            setIsRunning((current) => !current)
          }
          className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 shadow-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          disabled={elapsed === 0}
          onClick={addLap}
          className="px-6 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 transition-all duration-300 disabled:opacity-50"
        >
          Lap
        </button>

        <button
          onClick={resetStopwatch}
          className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-400 transition-all duration-300 shadow-lg"
        >
          Reset
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <ol className="space-y-3 max-h-64 overflow-y-auto">
          {laps.map((lap, index) => (
            <li
              key={`${lap}-${index}`}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
            >
              <span className="text-slate-300">
                Lap {laps.length - index}
              </span>

              <strong className="text-white">
                {formatElapsed(lap)}
              </strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Stopwatch;