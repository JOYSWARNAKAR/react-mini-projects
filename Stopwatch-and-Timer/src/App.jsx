import { useState } from "react";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

const tabs = [
  { id: "timer", label: "Timer" },
  { id: "stopwatch", label: "Stopwatch" },
];

function App() {
  const [activeTab, setActiveTab] = useState("timer");

  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <section className="w-full max-w-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-3">
            Stopwatch & Timer App
          </h1>

          <p className="text-slate-400">
            Modern Stopwatch & Timer
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          
          {/* Tabs */}
          <div className="flex bg-slate-900/50 p-2 rounded-2xl mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === "timer" ? (
              <Timer />
            ) : (
              <Stopwatch />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;