const fs = require('fs');

let app = fs.readFileSync('./src/App.jsx', 'utf8');

// 1. Definition of the Dedicated Pomodoro Floating Engine & Drawer Component
const pomodoroComponent = `
// POMODORO FOCUS TIMER COMPONENT (25m Focus / 5m Break Cycles)
function PomodoroWidget({ isOpen, onClose }) {
  const [mode, setMode] = useState("focus"); // "focus" or "break"
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Audio Chime via Web Audio API
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(mode === "focus" ? 587.33 : 880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch (e) {}

      if (mode === "focus") {
        setMode("break");
        setTimeLeft(5 * 60);
        setSessionsCompleted((prev) => prev + 1);
      } else {
        setMode("focus");
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (newMode = mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = mode === "focus" 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-5 shadow-2xl shadow-emerald-950/40"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-serif font-black text-white">ESSLCE Pomodoro Coach</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl mb-5 border border-slate-800">
        <button
          onClick={() => resetTimer("focus")}
          className={'py-1.5 text-xs font-bold rounded-lg transition-all ' + (mode === "focus" ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-white")}
        >
          25m Focus
        </button>
        <button
          onClick={() => resetTimer("break")}
          className={'py-1.5 text-xs font-bold rounded-lg transition-all ' + (mode === "break" ? "bg-indigo-500 text-white shadow" : "text-slate-400 hover:text-white")}
        >
          5m Break
        </button>
      </div>

      {/* Circular Progress & Clock */}
      <div className="flex flex-col items-center justify-center my-3">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="#1E293B" strokeWidth="6" fill="none" />
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              stroke={mode === "focus" ? "#10B981" : "#6366F1"} 
              strokeWidth="6" 
              strokeDasharray="314.16" 
              strokeDashoffset={314.16 - (314.16 * progressPercent) / 100} 
              strokeLinecap="round" 
              fill="none" 
              className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-mono font-black text-white tracking-wider">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-black uppercase text-slate-400 mt-0.5 tracking-wider">
              {mode === "focus" ? "Deep Study" : "Rest Period"}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={toggleTimer}
          className={'px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ' + (isRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400')}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? "Pause" : "Start Session"}</span>
        </button>
        <button
          onClick={() => resetTimer(mode)}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Completed Cycles:</span>
        <span className="font-bold text-emerald-400">{sessionsCompleted} 🔥</span>
      </div>
    </motion.div>
  );
}
`;

// Insert the Pomodoro Component
if (!app.includes('function PomodoroWidget')) {
  app = app.replace('function FormulaDrawer', pomodoroComponent + '\nfunction FormulaDrawer');
}

// 2. Add Pomodoro State to App
if (!app.includes('showPomodoro')) {
  app = app.replace(
    'const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);',
    'const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);\n  const [showPomodoro, setShowPomodoro] = useState(false);'
  );
}

// 3. Add Pomodoro Button to Navigation Bar
const pomodoroNavBtn = `<button
              onClick={() => setShowPomodoro(!showPomodoro)}
              className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Pomodoro (25/5)</span>
            </button>`;

if (!app.includes('Pomodoro (25/5)')) {
  app = app.replace(
    '<a href="#radar"',
    pomodoroNavBtn + '\n            <a href="#radar"'
  );
}

// 4. Render the Floating Pomodoro Widget in App
const widgetRender = `      {/* POMODORO FOCUS WIDGET */}
      <PomodoroWidget isOpen={showPomodoro} onClose={() => setShowPomodoro(false)} />`;

if (!app.includes('POMODORO FOCUS WIDGET')) {
  app = app.replace(
    '{/* FEATURE 4: INTERACTIVE FORMULA CHEAT SHEET DRAWER */}',
    widgetRender + '\n\n      {/* FEATURE 4: INTERACTIVE FORMULA CHEAT SHEET DRAWER */}'
  );
}

fs.writeFileSync('./src/App.jsx', app, 'utf8');
console.log('Pomodoro 25/5 focus timer successfully integrated into App.jsx!');
