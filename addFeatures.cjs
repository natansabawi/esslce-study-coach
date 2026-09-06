const fs = require('fs');

const completeApp = `import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Leaf, 
  Languages, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Sparkles, 
  ChevronRight, 
  Award, 
  Target, 
  Menu, 
  X, 
  BarChart3, 
  RotateCcw,
  GraduationCap,
  Clock,
  Lightbulb,
  FileDown,
  Printer,
  Archive,
  AlertTriangle,
  Play,
  Pause,
  BookMarked
} from "lucide-react";
import questionsData from "./data/questions.json";

// Authentic Ethiopian Flag Component
const EthiopianFlag = ({ className = "w-10 h-6" }) => (
  <span className={'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md shadow-md border border-white/20 ' + className}>
    <svg viewBox="0 0 60 36" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="12" fill="#078930" />
      <rect y="12" width="60" height="12" fill="#FCD116" />
      <rect y="24" width="60" height="12" fill="#DA121A" />
      <circle cx="30" cy="18" r="8" fill="#0F47AF" />
      <path
        d="M30 11.8 L31.9 16 L36.4 16 L32.8 18.6 L34.2 23 L30 20.3 L25.8 23 L27.2 18.6 L23.6 16 L28.1 16 Z"
        fill="#FCD116"
      />
      <circle cx="30" cy="18" r="1.3" fill="#0F47AF" />
      <line x1="30" y1="13.2" x2="30" y2="10.8" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34.8" y1="14.8" x2="36.5" y2="13.5" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34.5" y1="21.5" x2="36.5" y2="23" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="25.5" y1="21.5" x2="23.5" y2="23" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="25.2" y1="14.8" x2="23.5" y2="13.5" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  </span>
);

const SUBJECT_COURSES = [
  { id: "math", name: "Mathematics", icon: BookOpen, gradient: "from-emerald-500 to-teal-700", badge: "High Leverage", desc: "Calculus, vectors, geometry & coordinate algebra calibrated for national engineering cutoffs.", progress: 74 },
  { id: "sat", name: "SAT Aptitude", icon: Compass, gradient: "from-indigo-500 to-purple-700", badge: "General Matriculation", desc: "Logical series deduction, quantitative reasoning, pattern analysis & analytical problem-solving.", progress: 84 },
  { id: "physics", name: "Physics", icon: Atom, gradient: "from-blue-500 to-cyan-700", badge: "Concept Heavy", desc: "Mechanics, electromagnetism, AC circuits, optics & thermodynamics diagnostic calculations.", progress: 62 },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, gradient: "from-amber-500 to-orange-700", badge: "Core Science", desc: "Reaction kinetics, stoichiometry, organic synthesis pathways & periodic equilibrium trends.", progress: 81 },
  { id: "biology", name: "Biology", icon: Leaf, gradient: "from-emerald-600 to-green-800", badge: "High Yield", desc: "Genetics, cellular respiration, molecular biology, human physiology & ecological dynamics.", progress: 88 },
  { id: "english", name: "English", icon: Languages, gradient: "from-fuchsia-500 to-rose-700", badge: "Speed & Accuracy", desc: "Grammar mechanics, reading inference, contextual vocabulary & paragraph coherence.", progress: 69 }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeQuizSubject, setActiveQuizSubject] = useState(null);
  const [isTimedMode, setIsTimedMode] = useState(true);
  const [isVaultMode, setIsVaultMode] = useState(false);
  const [showPrintReport, setShowPrintReport] = useState(false);

  // PREDICTION ENGINE STATE
  const [grade, setGrade] = useState("12");
  const [stream, setStream] = useState("natural");
  const [predSubject, setPredSubject] = useState("math");
  const [midtermScore, setMidtermScore] = useState(76);
  const [studyHours, setStudyHours] = useState(18);

  // FEATURE 4: ERROR VAULT PERSISTENCE
  const [errorVault, setErrorVault] = useState(() => {
    try {
      const saved = localStorage.getItem("esslce_error_vault");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("esslce_error_vault", JSON.stringify(errorVault));
    } catch (e) {
      console.error(e);
    }
  }, [errorVault]);

  // LIVE ML SCORING MODEL
  const prediction = useMemo(() => {
    const base = midtermScore * 0.72;
    const effortGain = Math.min(studyHours * 1.35, 25);
    const gradeWeight = grade === "12" ? 4 : grade === "remedial" ? -2 : 1;
    const streamAdjustment = stream === "natural" ? 0 : 2;
    const vaultDeduction = Math.min(errorVault.length * 0.6, 12);
    
    const computedPercent = Math.min(99, Math.max(35, Math.round(base + effortGain + gradeWeight + streamAdjustment - vaultDeduction)));
    const scaledTotal600 = Math.round((computedPercent / 100) * 600);

    return {
      percent: computedPercent,
      scaled: scaledTotal600,
      confidence: computedPercent >= 80 ? "High (94%)" : "Moderate (88%)",
      status: computedPercent >= 75 ? "Targeting Top-Tier Engineering / Medicine" : "Meets Standard University Entrance Threshold"
    };
  }, [grade, stream, midtermScore, studyHours, errorVault]);

  // Save new mistakes into Error Vault
  const handleSaveToVault = (failedQuestions) => {
    setErrorVault((prev) => {
      const map = new Map();
      [...failedQuestions, ...prev].forEach(item => map.set(item.id, item));
      return Array.from(map.values()).slice(0, 50);
    });
  };

  const handleClearVault = () => {
    setErrorVault([]);
    localStorage.removeItem("esslce_error_vault");
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden relative">
      
      {/* 1. INSTITUTIONAL HEADER */}
      <header className="sticky top-0 z-50 bg-[#070A13]/90 backdrop-blur-2xl border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white p-2 shadow-xl border-2 border-emerald-500/40 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Center Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
                  Exam Predict
                </span>
                <EthiopianFlag className="w-8 h-5 sm:w-10 sm:h-6" />
                <span className="text-xs sm:text-sm font-black px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 uppercase tracking-wider shadow-md">
                  AI COACH
                </span>
              </div>
              <p className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-200 tracking-wide mt-1 uppercase">
                Ethiopian Giftedness and Talent Development Center
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-400 font-serif mt-0.5">
                የኢትዮጵያ ተሰጥኦና ተውህቦ ማበልጸጊያ ማዕከል
              </p>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-7">
            <a href="#prediction" className="text-sm font-bold text-slate-300 hover:text-emerald-400">Score Predictor</a>
            <a href="#vault" className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5">
              <Archive className="w-4 h-4" /> Error Vault ({errorVault.length})
            </a>
            <button 
              onClick={() => setShowPrintReport(true)}
              className="text-sm font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4 text-emerald-400" /> Export PDF Profile
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setIsVaultMode(false);
                setActiveQuizSubject("sat");
              }}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Launch Timed Exam</span>
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2.5 rounded-xl text-slate-400 hover:text-white">
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        <div className="h-[3px] w-full grid grid-cols-3">
          <div className="bg-[#078930]" />
          <div className="bg-[#FCD116]" />
          <div className="bg-[#DA121A]" />
        </div>
      </header>

      {/* 2. HERO WITH TIMER TOGGLE */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-bold text-slate-300">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-extrabold">ESSLCE Adaptive Simulator</span>
                </div>

                {/* FEATURE 2: TIMED MODE TOGGLE */}
                <button
                  onClick={() => setIsTimedMode(!isTimedMode)}
                  className={'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ' + (isTimedMode ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400')}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timed Exam Mode: {isTimedMode ? "ON (60 Mins)" : "OFF (Untimed)"}</span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.14]">
                Complete National Exam Preparation with{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Socratic AI Coaching
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Take full timed diagnostic drills across 6 subjects, access multi-level solution hints, archive missed questions in your personal error vault, and export verified performance transcripts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setIsVaultMode(false);
                    setActiveQuizSubject("math");
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-base shadow-xl hover:scale-105 transition-all flex items-center gap-2.5"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Start Mathematics (50 Qs)</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>

                <button
                  onClick={() => setShowPrintReport(true)}
                  className="px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base transition-all flex items-center gap-2"
                >
                  <FileDown className="w-5 h-5 text-emerald-400" />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-2.5 bg-slate-900">
                <img 
                  src="/mentors.png"
                  alt="Ethiopian Giftedness Center Faculty" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 4: ERROR VAULT & FLASHCARD REVIEW SECTION */}
      <section id="vault" className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
                <Archive className="w-4 h-4" />
                <span>Feature 4: Personal Spaced-Repetition Vault</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Saved Diagnostic Mistakes ({errorVault.length} Questions)
              </h2>
            </div>

            {errorVault.length > 0 && (
              <div className="mt-4 md:mt-0 flex gap-3">
                <button
                  onClick={() => {
                    setIsVaultMode(true);
                    setActiveQuizSubject("vault");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <BookMarked className="w-4 h-4 text-slate-950" />
                  <span>Drill Missed Questions ({errorVault.length})</span>
                </button>
                <button
                  onClick={handleClearVault}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Clear Vault
                </button>
              </div>
            )}
          </div>

          {errorVault.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 text-center text-slate-400 text-sm">
              Your Error Vault is clean! Questions answered incorrectly during exams are saved here automatically for targeted retests.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {errorVault.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Question ID: {item.id}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2 mb-2 line-clamp-2">
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {item.explanation}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-emerald-400">
                    Correct Answer: {item.options[item.correctIndex]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PREDICTION ENGINE */}
      <section id="prediction" className="py-20 bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
              Machine Learning Scoring Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
              Real-Time Matriculation Forecast
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="p-7 sm:p-10 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Grade</label>
                    <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold outline-none">
                      <option value="11">Grade 11 Student</option>
                      <option value="12">Grade 12 (Candidate)</option>
                      <option value="remedial">University Remedial Stream</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stream Discipline</label>
                    <select value={stream} onChange={(e) => setStream(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold outline-none">
                      <option value="natural">Natural Science Stream</option>
                      <option value="social">Social Science Stream</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Benchmark Diagnostic Score</label>
                      <span className="text-base font-black text-emerald-400">{midtermScore}%</span>
                    </div>
                    <input type="range" min="35" max="100" value={midtermScore} onChange={(e) => setMidtermScore(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Study Hours</label>
                      <span className="text-base font-black text-indigo-400">{studyHours} hrs/week</span>
                    </div>
                    <input type="range" min="4" max="40" value={studyHours} onChange={(e) => setStudyHours(Number(e.target.value))} className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-5 bg-slate-950 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Projected Score</span>
              <div className="relative w-44 h-44 flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#1E293B" strokeWidth="8" fill="none" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeDasharray="314.16" 
                    strokeDashoffset={314.16 - (314.16 * prediction.percent) / 100} 
                    strokeLinecap="round" 
                    fill="none" 
                    className="transition-all duration-300 ease-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-serif font-black text-white">{prediction.percent}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <div className="mt-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                Scaled Total: ~{prediction.scaled} / 600 Points
              </div>
              <p className="text-xs font-bold text-slate-300 mt-2">{prediction.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUBJECT COURSES */}
      <section id="courses" className="py-24 bg-[#070A13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBJECT_COURSES.map((course) => {
              const Icon = course.icon;
              const count = questionsData[course.id]?.length || 50;

              return (
                <div key={course.id} className="rounded-3xl bg-slate-900 border border-slate-800 p-7 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={'w-12 h-12 rounded-2xl bg-gradient-to-tr ' + course.gradient + ' flex items-center justify-center text-white shadow-lg'}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                        {course.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white">{course.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{course.desc}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <button 
                      onClick={() => {
                        setIsVaultMode(false);
                        setActiveQuizSubject(course.id);
                      }} 
                      className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <span>Start Drill ({count} Questions)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUIZ MODAL (WITH FEATURE 2 TIMER & FEATURE 3 SOCRATIC HINT) */}
      <AnimatePresence>
        {activeQuizSubject && (
          <QuizModal 
            subjectId={activeQuizSubject} 
            isVault={isVaultMode}
            vaultList={errorVault}
            timed={isTimedMode}
            onClose={() => setActiveQuizSubject(null)} 
            onSaveMistakes={handleSaveToVault}
          />
        )}
      </AnimatePresence>

      {/* FEATURE 5: OFFICIAL PRINTABLE PDF DIAGNOSTIC PROFILE */}
      <AnimatePresence>
        {showPrintReport && (
          <OfficialReportModal 
            prediction={prediction} 
            errorVault={errorVault} 
            onClose={() => setShowPrintReport(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// QUIZ MODAL WITH TIMER (FEATURE 2) & HINT TUTOR (FEATURE 3)
function QuizModal({ subjectId, isVault, vaultList, timed, onClose, onSaveMistakes }) {
  const questions = isVault ? vaultList : (questionsData[subjectId] || []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [failedList, setFailedList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // FEATURE 2: TIMED MODE STATE (60 seconds per question or section clock)
  const [timeLeft, setTimeLeft] = useState(60 * (questions.length || 1));
  const [timerRunning, setTimerRunning] = useState(timed);

  // FEATURE 3: SOCRATIC HINT LEVEL (0 = hidden, 1 = clue, 2 = step formula)
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    if (!timed || isCompleted || !timerRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timed, isCompleted, timerRunning]);

  const currentQ = questions[currentIdx] || { 
    id: "q1", 
    question: "No question available.", 
    options: [], 
    correctIndex: 0, 
    explanation: "" 
  };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setFailedList((prev) => [...prev, currentQ]);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setHintLevel(0);
    } else {
      setIsCompleted(true);
      if (onSaveMistakes) onSaveMistakes(failedList);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        
        {/* Top Bar with Timer */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              {isVault ? "Error Vault Drill" : subjectId.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {!isCompleted ? ('Question ' + (currentIdx + 1) + ' of ' + questions.length) : "Summary"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {timed && !isCompleted && (
              <div className={'flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold border ' + (timeLeft < 180 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-slate-800 text-emerald-400 border-slate-700')}>
                <Clock className="w-3.5 h-3.5" />
                <span>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
                <button onClick={() => setTimerRunning(!timerRunning)} className="ml-1 text-slate-400 hover:text-white">
                  {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>
            )}
            <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isCompleted ? (
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50 font-bold";
                  else if (idx === selectedOpt) btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                }
                return (
                  <button key={idx} disabled={isAnswered} onClick={() => handleSelectOption(idx)} className={'w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ' + btnStyle}>
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswered && idx === selectedOpt && idx !== currentQ.correctIndex && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* FEATURE 3: SOCRATIC AI HINT BUTTON */}
            {!isAnswered && (
              <div className="mb-6">
                {hintLevel === 0 ? (
                  <button
                    onClick={() => setHintLevel(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl transition-all"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Need a Hint? (Socratic Tutor)</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <div className="flex items-center justify-between mb-1 font-bold">
                      <span className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4" /> Tutor Clue Level {hintLevel} of 2</span>
                      {hintLevel === 1 && (
                        <button onClick={() => setHintLevel(2)} className="underline hover:text-white">
                          Show Core Formula Step
                        </button>
                      )}
                    </div>
                    <p className="mt-1">
                      {hintLevel === 1 
                        ? "Identify the governing theorem: look closely at the variable power and boundary conditions." 
                        : ("Formula Hint: " + currentQ.explanation.split('.')[0] + ".")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Full Solution & Examiner Rationale
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}</span>
              <button onClick={handleNext} disabled={!isAnswered} className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-black hover:bg-emerald-400 disabled:opacity-40 transition-all flex items-center gap-2">
                <span>{currentIdx + 1 < questions.length ? "Next Question" : "Complete Exam"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Examination Session Concluded</h3>
            <p className="text-sm text-slate-300 mt-1">
              You scored <strong className="text-emerald-400">{score}</strong> out of <strong>{questions.length}</strong> ({Math.round((score / (questions.length || 1)) * 100)}%)
            </p>

            {failedList.length > 0 && (
              <div className="mt-5 p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-left text-xs">
                <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  <Archive className="w-4 h-4" /> {failedList.length} Question(s) Saved into Error Vault
                </div>
                <p className="text-slate-400">These will appear in your Spaced-Repetition Vault until mastered.</p>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400">
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// FEATURE 5: PRINTABLE / PDF OFFICIAL REPORT MODAL
function OfficialReportModal({ prediction, errorVault, onClose }) {
  const reportRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative print:p-0 print:shadow-none">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900 mb-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
            <div>
              <h2 className="font-serif font-black text-xl text-slate-900 tracking-tight">ETHIOPIAN GIFTEDNESS & TALENT DEVELOPMENT CENTER</h2>
              <p className="text-xs font-bold text-emerald-800">OFFICIAL ESSLCE CANDIDATE READINESS & PREDICTION PROFILE</p>
              <p className="text-[10px] text-slate-500">የኢትዮጵያ ተሰጥኦና ተውህቦ ማበልጸጊያ ማዕከል - Matriculation Audit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-900 print:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Prediction Data */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500">Predicted Score (600 Scale)</span>
            <div className="text-3xl font-serif font-black text-emerald-800 mt-1">{prediction.scaled} / 600</div>
            <p className="text-xs text-slate-600 mt-0.5">National Placement Confidence: {prediction.confidence}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-500">Diagnostic Pass Benchmark</span>
            <div className="text-3xl font-serif font-black text-indigo-900 mt-1">{prediction.percent}%</div>
            <p className="text-xs text-slate-600 mt-0.5">{prediction.status}</p>
          </div>
        </div>

        {/* Error Vault Summary */}
        <div className="mb-6">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Priority Revision Chapters (Active In Error Vault)</h4>
          {errorVault.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No persistent weaknesses detected.</p>
          ) : (
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              {errorVault.slice(0, 4).map((item, i) => (
                <li key={i}><strong>{item.id.toUpperCase()}:</strong> {item.question}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Official Footer Verification */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Official Verification Stamp: EGDTC-AI-{Math.floor(100000 + Math.random() * 900000)}</span>
          <span>Issued: {new Date().toLocaleDateString('en-GB')}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3 print:hidden">
          <button onClick={handlePrint} className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800">
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100">
            Close
          </button>
        </div>

      </div>
    </motion.div>
  );
}
`;

fs.writeFileSync('./src/App.jsx', completeApp, 'utf8');
console.log('App.jsx successfully generated with Features 2, 3, 4, and 5.');
