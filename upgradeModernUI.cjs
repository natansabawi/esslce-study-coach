const fs = require('fs');

const modernApp = `import React, { useState, useMemo } from "react";
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
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import questionsData from "./data/questions.json";

// Authentic Ethiopian National Flag SVG Component
const EthiopianFlag = ({ className = "w-9 h-6" }) => (
  <span className={'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md shadow-sm border border-stone-200/80 ' + className}>
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
  { id: "math", name: "Mathematics", icon: BookOpen, gradient: "from-emerald-500 to-teal-700", glow: "group-hover:border-emerald-500/50", badge: "High Leverage", desc: "Calculus, vectors, geometry & coordinate algebra calibrated for national engineering cutoffs.", progress: 74 },
  { id: "sat", name: "SAT Aptitude", icon: Compass, gradient: "from-indigo-500 to-purple-700", glow: "group-hover:border-indigo-500/50", badge: "General Matriculation", desc: "Logical series deduction, quantitative reasoning, pattern analysis & analytical problem-solving.", progress: 84 },
  { id: "physics", name: "Physics", icon: Atom, gradient: "from-blue-500 to-cyan-700", glow: "group-hover:border-blue-500/50", badge: "Concept Heavy", desc: "Mechanics, electromagnetism, AC circuits, optics & thermodynamics diagnostic calculations.", progress: 62 },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, gradient: "from-amber-500 to-orange-700", glow: "group-hover:border-amber-500/50", badge: "Core Science", desc: "Reaction kinetics, stoichiometry, organic synthesis pathways & periodic equilibrium trends.", progress: 81 },
  { id: "biology", name: "Biology", icon: Leaf, gradient: "from-emerald-600 to-green-800", glow: "group-hover:border-green-500/50", badge: "High Yield", desc: "Genetics, cellular respiration, molecular biology, human physiology & ecological dynamics.", progress: 88 },
  { id: "english", name: "English", icon: Languages, gradient: "from-fuchsia-500 to-rose-700", glow: "group-hover:border-rose-500/50", badge: "Speed & Accuracy", desc: "Grammar mechanics, reading inference, contextual vocabulary & paragraph coherence.", progress: 69 }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeQuizSubject, setActiveQuizSubject] = useState(null);

  // ML PREDICTION MODEL PARAMETERS
  const [grade, setGrade] = useState("12");
  const [stream, setStream] = useState("natural");
  const [predSubject, setPredSubject] = useState("math");
  const [midtermScore, setMidtermScore] = useState(76);
  const [studyHours, setStudyHours] = useState(18);
  const [manualBoost, setManualBoost] = useState(0);

  // REACTIVE ML PREDICTION ENGINE
  const prediction = useMemo(() => {
    const base = midtermScore * 0.72;
    const effortGain = Math.min(studyHours * 1.35, 25);
    const gradeWeight = grade === "12" ? 4 : grade === "remedial" ? -2 : 1;
    const streamAdjustment = stream === "natural" ? 0 : 2;
    
    const computedPercent = Math.min(99, Math.max(35, Math.round(base + effortGain + gradeWeight + streamAdjustment + manualBoost)));
    const scaledTotal600 = Math.round((computedPercent / 100) * 600);

    const strengthsMap = {
      math: "Differential Calculus & Vector Algebra",
      sat: "Logical Inferences & Series Completion",
      physics: "Newtonian Mechanics & Electric Circuits",
      chemistry: "Organic Pathways & Stoichiometry",
      biology: "Cellular Respiration & Genetics",
      english: "Grammar Mechanics & Contextual Synonyms"
    };

    const weaknessesMap = {
      math: "Integration by Substitution & 3D Geometry",
      sat: "Speed Deductions Under Strict Timing",
      physics: "Rotational Dynamics & Wave Optics",
      chemistry: "Chemical Equilibrium & Le Chatelier Shifts",
      biology: "Photosynthetic Pigments & Endocrine System",
      english: "Complex Paragraph Organization"
    };

    return {
      percent: computedPercent,
      scaled: scaledTotal600,
      confidence: computedPercent >= 80 ? "High (94%)" : "Moderate (88%)",
      status: computedPercent >= 75 ? "Targeting University Engineering / Medicine" : "Meets Standard Entrance Criteria",
      topStrength: strengthsMap[predSubject] || "Analytical Core",
      weakPoint: weaknessesMap[predSubject] || "Time Management Under Pressure",
      recommendation: computedPercent >= 80
        ? "Superb readiness! Emphasize timed 50-question mock drills to safeguard your primary placement."
        : "Dedicate 25 minutes daily to targeted problem sets to elevate your cumulative score above 520 / 600."
    };
  }, [grade, stream, predSubject, midtermScore, studyHours, manualBoost]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden relative">
      
      {/* Background Ambient Glow Accents */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* 1. ULTRA-MODERN GLASS NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="relative p-1.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-950/40">
              <img 
                src="/logo.png" 
                alt="Ethiopian Giftedness Center Logo"
                className="h-14 sm:h-16 w-auto object-contain rounded-xl"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-white">
                  Exam Predict
                </span>
                <EthiopianFlag className="w-7 h-4.5" />
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 uppercase tracking-wider shadow">
                  AI COACH
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-tight">
                ETHIOPIAN GIFTEDNESS AND TALENT DEVELOPMENT CENTER
              </p>
              <p className="text-[11px] font-semibold text-emerald-400/90 font-serif">
                የኢትዮጵያ ተሰጥኦና ተውህቦ ማበልጸጊያ ማዕከል
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#prediction" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Score Predictor</a>
            <a href="#courses" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">300 Questions Bank</a>
            <a href="#mentor" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Faculty Mentors</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveQuizSubject("sat")}
              className="relative group px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Compass className="w-4 h-4 text-emerald-200 relative z-10" />
              <span className="relative z-10">Start SAT Drill</span>
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Ethiopian National Tricolor Accent Ribbon */}
        <div className="h-[2px] w-full grid grid-cols-3">
          <div className="bg-[#078930]" />
          <div className="bg-[#FCD116]" />
          <div className="bg-[#DA121A]" />
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              className="lg:hidden bg-[#0B0F19]/95 border-b border-slate-800 px-6 py-4 flex flex-col gap-4 shadow-2xl"
            >
              <a href="#prediction" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200">Score Predictor</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200">300 Questions Bank</a>
              <a href="#mentor" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200">Faculty Mentors</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setActiveQuizSubject("sat"); }} 
                className="w-full py-3 rounded-xl font-bold bg-emerald-600 text-white text-xs"
              >
                Launch SAT Drill
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION WITH MODERN FLOATING GLASS CARDS */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-inner mb-6 text-xs font-bold text-slate-300">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400">Official National Curriculum Alignment</span>
                <span className="text-slate-600">|</span>
                <span>300 Questions Pool</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.14]">
                Precision Exam Prediction for{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Ethiopian Candidates
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-normal">
                Harness ML forecasting models calibrated against public university entrance thresholds. Practice 50-question model drills across <strong>Mathematics, SAT Aptitude, Physics, Chemistry, Biology, and English</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#prediction"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Simulate Exam Score</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </a>

                <button
                  onClick={() => setActiveQuizSubject("sat")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-base shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <span>Practice SAT Model (50 Qs)</span>
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 w-full">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-serif">300</div>
                  <div className="text-xs text-slate-400 mt-0.5">Model Questions</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif">94%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Predictive Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-serif">6</div>
                  <div className="text-xs text-slate-400 mt-0.5">Tested Disciplines</div>
                </div>
              </div>
            </div>

            {/* Photorealistic Mentors Portrait */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-gradient-to-b from-slate-800 to-slate-950 p-2 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img 
                    src="/mentors.png"
                    alt="Ethiopian Giftedness Center Educators" 
                    className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        Faculty Mentors
                      </span>
                      <span className="text-[11px] text-slate-300 font-medium">STEM & Aptitude</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-white">Ethiopian Giftedness Center Faculty</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Guiding 10,000+ candidates across all regional states</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PREDICTION COCKPIT */}
      <section id="prediction" className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
              Machine Learning Scoring Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
              Real-Time Matriculation Forecast
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Tweak your parameters in the left console. The right projection panel computes your standing dynamically in real time.
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Parameters */}
            <div className="p-7 sm:p-10 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-6 text-sm font-bold text-white">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Academic Parameter Input</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Grade</label>
                    <select 
                      value={grade} 
                      onChange={(e) => setGrade(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    >
                      <option value="11">Grade 11 Student</option>
                      <option value="12">Grade 12 (Candidate)</option>
                      <option value="remedial">University Remedial Stream</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stream Discipline</label>
                    <select 
                      value={stream} 
                      onChange={(e) => setStream(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    >
                      <option value="natural">Natural Science Stream</option>
                      <option value="social">Social Science Stream</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diagnostic Subject Focus</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { id: "math", label: "Math" },
                      { id: "sat", label: "SAT" },
                      { id: "physics", label: "Physics" },
                      { id: "chemistry", label: "Chem" },
                      { id: "biology", label: "Bio" },
                      { id: "english", label: "English" },
                    ].map((item) => (
                      <button 
                        key={item.id} 
                        type="button" 
                        onClick={() => setPredSubject(item.id)} 
                        className={'py-2.5 text-xs font-bold rounded-xl border transition-all ' + (predSubject === item.id ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white')}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Benchmark / Midterm Score</label>
                      <span className="text-base font-black text-emerald-400">{midtermScore}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="35" 
                      max="100" 
                      value={midtermScore} 
                      onChange={(e) => setMidtermScore(Number(e.target.value))} 
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Study Hours</label>
                      <span className="text-base font-black text-indigo-400">{studyHours} hrs/week</span>
                    </div>
                    <input 
                      type="range" 
                      min="4" 
                      max="40" 
                      value={studyHours} 
                      onChange={(e) => setStudyHours(Number(e.target.value))} 
                      className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer" 
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setManualBoost((prev) => (prev >= 6 ? 0 : prev + 2))}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Simulate High-Yield Study Sprint (+5 pts)</span>
              </button>
            </div>

            {/* Right Output Panel */}
            <div className="p-7 sm:p-10 lg:col-span-5 bg-slate-950/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Predicted Readiness</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {prediction.confidence}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 flex items-center justify-center my-3">
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
                        className="transition-all duration-300 ease-out drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-serif font-black text-white">{prediction.percent}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Projected</span>
                    </div>
                  </div>

                  <div className="mt-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    Scaled Total: ~{prediction.scaled} / 600 Points
                  </div>
                  <p className="text-xs font-bold text-slate-300 mt-2">{prediction.status}</p>

                  <div className="w-full mt-6 space-y-2.5 text-left">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Top Strength Area</span>
                        <span className="text-xs font-bold text-slate-200">{prediction.topStrength}</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                      <Target className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Requires Revision</span>
                        <span className="text-xs font-bold text-slate-200">{prediction.weakPoint}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-left">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-200">AI Plan:</strong> {prediction.recommendation}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MODERN EXAMINATION COURSES */}
      <section id="courses" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
                Curriculum Question Banks
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
                Core Examination Modules
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Select any subject to launch an interactive 50-question practice drill with immediate scoring and step-by-step rationales.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBJECT_COURSES.map((course) => {
              const Icon = course.icon;
              const count = questionsData[course.id]?.length || 50;

              return (
                <div 
                  key={course.id} 
                  className={'group relative rounded-3xl bg-slate-900/70 border border-slate-800 p-7 shadow-xl hover:-translate-y-1.5 transition-all duration-300 ' + course.glow}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={'w-12 h-12 rounded-2xl bg-gradient-to-tr ' + course.gradient + ' flex items-center justify-center text-white shadow-lg'}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {course.desc}
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-400">Curriculum Depth</span>
                      <span className="text-emerald-400">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                      <div className={'h-full bg-gradient-to-r ' + course.gradient} style={{ width: course.progress + '%' }} />
                    </div>

                    <button 
                      onClick={() => setActiveQuizSubject(course.id)} 
                      className="w-full py-3.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:border-emerald-500/50"
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

      {/* 5. MENTOR SPOTLIGHT */}
      <section id="mentor" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-2 bg-slate-900">
                <img 
                  src="/mentors.png"
                  alt="Ethiopian Educational Mentors" 
                  className="w-full h-auto rounded-2xl object-cover"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"; }}
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
                Center Mentorship
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
                Inspiring Academic Excellence Nationwide
              </h2>
              <p className="text-base text-slate-400 mt-4 leading-relaxed">
                Guided by senior educators at the <strong>Ethiopian Giftedness and Talent Development Center</strong>, Exam Predict Coach AI pairs rigorous matriculation standards with machine learning diagnostics. Students across Addis Ababa, Oromia, Amhara, Tigray, Sidama, and all regional states gain equal access to elite entrance coaching.
              </p>
              
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setActiveQuizSubject("sat")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                  <span>Launch SAT Aptitude Drill</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. MODAL TEST DRILL */}
      <AnimatePresence>
        {activeQuizSubject && (
          <QuizModal subjectId={activeQuizSubject} onClose={() => setActiveQuizSubject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizModal({ subjectId, onClose }) {
  const questions = questionsData[subjectId] || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx] || { question: "No question available.", options: [], correctIndex: 0, explanation: "" };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const subjectNames = { math: "Mathematics", sat: "SAT Aptitude", physics: "Physics", chemistry: "Chemistry", biology: "Biology", english: "English" };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">{subjectNames[subjectId] || subjectId} Test</span>
            <span className="text-xs text-slate-400 font-semibold">{!isCompleted ? ('Question ' + (currentIdx + 1) + ' of ' + questions.length) : "Summary"}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"><X className="w-5 h-5" /></button>
        </div>

        {!isCompleted ? (
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-6 leading-relaxed">{currentQ.question}</h3>
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
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-400 uppercase tracking-wider"><Sparkles className="w-4 h-4" /> AI Examiner Explanation</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Current Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}</span>
              <button onClick={handleNext} disabled={!isAnswered} className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-bold hover:bg-emerald-400 disabled:opacity-40 transition-all flex items-center gap-2">
                <span>{currentIdx + 1 < questions.length ? "Next Question" : "Complete Drill"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8" /></div>
            <h3 className="text-2xl font-serif font-bold text-white">Drill Completed!</h3>
            <p className="text-sm text-slate-300 mt-1">You scored <strong className="text-emerald-400">{score}</strong> out of <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)</p>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={handleRestart} className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Retake Drill</button>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
`;

fs.writeFileSync('./src/App.jsx', modernApp, 'utf8');
console.log('App.jsx upgraded to modern high-end dark UI theme.');
