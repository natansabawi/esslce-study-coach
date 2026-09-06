const fs = require('fs');

const completeApp = `import React, { useState, useMemo } from "react";
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
  AlertTriangle,
  BookMarked,
  Check
} from "lucide-react";
import questionsData from "./data/questions.json";

// Authentic Ethiopian National Flag SVG Component
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

  // PREDICTION ENGINE STATE
  const [grade, setGrade] = useState("12");
  const [stream, setStream] = useState("natural");
  const [predSubject, setPredSubject] = useState("math");
  const [midtermScore, setMidtermScore] = useState(76);
  const [studyHours, setStudyHours] = useState(18);

  // REAL-TIME MISSED TOPICS TRACKER
  const [missedQuestions, setMissedQuestions] = useState([
    {
      subject: "Mathematics",
      topic: "Definite Integrals & Fundamental Theorem of Calculus",
      tip: "Review u-substitution and integration by parts before attempting timed mock drills."
    },
    {
      subject: "Physics",
      topic: "Rotational Dynamics & Torque Equilibrium",
      tip: "Revisit angular momentum conservation equations and free-body diagrams."
    }
  ]);

  // LIVE ML SCORE ENGINE
  const prediction = useMemo(() => {
    const base = midtermScore * 0.72;
    const effortGain = Math.min(studyHours * 1.35, 25);
    const gradeWeight = grade === "12" ? 4 : grade === "remedial" ? -2 : 1;
    const streamAdjustment = stream === "natural" ? 0 : 2;
    
    // Penalize score dynamically if unaddressed weak topics exist
    const gapDeduction = Math.min(missedQuestions.length * 1.5, 9);
    const computedPercent = Math.min(99, Math.max(35, Math.round(base + effortGain + gradeWeight + streamAdjustment - gapDeduction)));
    const scaledTotal600 = Math.round((computedPercent / 100) * 600);

    return {
      percent: computedPercent,
      scaled: scaledTotal600,
      confidence: computedPercent >= 80 ? "High (94%)" : "Moderate (88%)",
      status: computedPercent >= 75 ? "Targeting Top-Tier Engineering / Medicine" : "Meets Standard University Entrance Threshold"
    };
  }, [grade, stream, midtermScore, studyHours, missedQuestions]);

  const handleDrillFinished = (failedItems) => {
    if (failedItems && failedItems.length > 0) {
      setMissedQuestions((prev) => {
        const combined = [...failedItems, ...prev];
        return Array.from(new Set(combined.map(a => a.topic)))
          .map(t => combined.find(a => a.topic === t))
          .slice(0, 5);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden relative">
      
      {/* Background Lighting Gradients */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[700px] h-[700px] bg-indigo-600/10 blur-[170px] rounded-full pointer-events-none -z-10" />

      {/* 1. PROFESSIONAL INSTITUTIONAL HEADER */}
      <header className="sticky top-0 z-50 bg-[#070A13]/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Large Logo & Multi-line Institutional Typography */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white p-2 shadow-xl border-2 border-emerald-500/40 flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Ethiopian Giftedness and Talent Development Center Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
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

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            <a href="#prediction" className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">Score Predictor</a>
            <a href="#weaknesses" className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> AI Study Recommendations
            </a>
            <a href="#courses" className="text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors">300 Questions Pool</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setActiveQuizSubject("sat")}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Practice SAT Diagnostic</span>
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="xl:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Tricolor National Ribbon Divider */}
        <div className="h-[3px] w-full grid grid-cols-3">
          <div className="bg-[#078930]" />
          <div className="bg-[#FCD116]" />
          <div className="bg-[#DA121A]" />
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              className="xl:hidden bg-[#070A13]/98 border-b border-slate-800 px-6 py-5 flex flex-col gap-4 shadow-2xl"
            >
              <a href="#prediction" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-200">Score Predictor</a>
              <a href="#weaknesses" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-amber-400">AI Study Recommendations</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-200">300 Questions Pool</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setActiveQuizSubject("sat"); }} 
                className="w-full py-3 rounded-xl font-black bg-emerald-400 text-slate-950 text-xs uppercase"
              >
                Launch SAT Diagnostic
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 backdrop-blur-md shadow-inner mb-6 text-xs font-bold text-slate-300">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-extrabold">National ESSLCE Entrance Architecture</span>
                <span className="text-slate-600">|</span>
                <span>300 Model Questions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.14]">
                Accurate University Scoring &{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Adaptive AI Coaching
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Take timed practice tests across all 6 core disciplines. When you answer a question incorrectly, the AI examiner immediately pinpoints the exact syllabus chapter and generates tailored study plans.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#prediction"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Simulate Exam Score</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </a>

                <button
                  onClick={() => setActiveQuizSubject("math")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Mathematics Drill (50 Qs)</span>
                </button>
              </div>
            </div>

            {/* Mentor Photo */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-2.5 bg-slate-900 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <img 
                    src="/mentors.png"
                    alt="Ethiopian Giftedness Center Educators" 
                    className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        Faculty Mentors
                      </span>
                      <span className="text-[11px] text-slate-300 font-bold">Natural & Social Science</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-white">Ethiopian Giftedness Center STEM Faculty</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Guiding 10,000+ candidates nationwide</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DYNAMIC AI WEAKNESS & STUDY RECOMMENDATION ENGINE */}
      <section id="weaknesses" className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Active Diagnostic Gap Analysis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Topics Requiring Urgent Study
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Generated based on questions answered incorrectly during practice tests.
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-xs text-slate-400">
              Targeted remediation yields an estimated <strong className="text-emerald-400">+15 to +25 score points</strong> on national entrance exams.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missedQuestions.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                      {item.subject}
                    </span>
                    <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect in Diagnostic
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.topic}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.tip}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <BookMarked className="w-3.5 h-3.5" /> High-Yield Revision
                  </span>
                  <button 
                    onClick={() => setActiveQuizSubject(item.subject.toLowerCase().includes("math") ? "math" : "physics")}
                    className="text-xs font-bold text-white hover:text-emerald-400 flex items-center gap-1"
                  >
                    <span>Practice Drill</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PREDICTION COCKPIT */}
      <section id="prediction" className="py-20 bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
              Machine Learning Scoring Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
              Real-Time Matriculation Forecast
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Adjust your parameters to see your live standing and national admission percentile update automatically.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
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
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold focus:border-emerald-500 outline-none"
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
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm font-semibold focus:border-emerald-500 outline-none"
                    >
                      <option value="natural">Natural Science Stream</option>
                      <option value="social">Social Science Stream</option>
                    </select>
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
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Study Commitment</label>
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

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Scores adjust dynamically according to diagnostic errors and active study habits.</span>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-5 bg-slate-950 flex flex-col justify-between">
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
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-left">
                <div className="text-xs text-slate-400">
                  <strong className="text-slate-200">Advisory:</strong> Practicing missed question topics directly raises your placement odds.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. 300 QUESTIONS COURSES */}
      <section id="courses" className="py-24 bg-[#070A13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
              Curriculum Question Banks
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-4">
              Core Examination Modules (50 Qs Each)
            </h2>
          </div>

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

                    <h3 className="text-xl font-serif font-bold text-white">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {course.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <button 
                      onClick={() => setActiveQuizSubject(course.id)} 
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

      {/* 6. MODAL TEST DRILL WITH AUTOMATIC WEAKNESS LOGGING */}
      <AnimatePresence>
        {activeQuizSubject && (
          <QuizModal 
            subjectId={activeQuizSubject} 
            onClose={() => setActiveQuizSubject(null)} 
            onFinished={handleDrillFinished}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizModal({ subjectId, onClose, onFinished }) {
  const questions = questionsData[subjectId] || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [failedList, setFailedList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx] || { question: "No question available.", options: [], correctIndex: 0, explanation: "" };

  const subjectNames = { 
    math: "Mathematics", 
    sat: "SAT Aptitude", 
    physics: "Physics", 
    chemistry: "Chemistry", 
    biology: "Biology", 
    english: "English" 
  };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      // Extract subject-specific topic recommendation
      const missedTopic = {
        subject: subjectNames[subjectId] || "Core Subject",
        topic: currentQ.question.split("?")[0].replace(/[\[\]]/g, "").slice(0, 50),
        tip: currentQ.explanation
      };
      setFailedList((prev) => [...prev, missedTopic]);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (onFinished) onFinished(failedList);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setFailedList([]);
    setIsCompleted(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {subjectNames[subjectId] || subjectId} Diagnostic
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {!isCompleted ? ('Question ' + (currentIdx + 1) + ' of ' + questions.length) : "Diagnostic Assessment"}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

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
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> AI Examiner Explanation & Key Rule
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Diagnostic Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}</span>
              <button onClick={handleNext} disabled={!isAnswered} className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-black hover:bg-emerald-400 disabled:opacity-40 transition-all flex items-center gap-2">
                <span>{currentIdx + 1 < questions.length ? "Next Question" : "Complete & Analyze Weaknesses"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Diagnostic Drill Completed!</h3>
            <p className="text-sm text-slate-300 mt-1">
              You scored <strong className="text-emerald-400">{score}</strong> out of <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
            </p>

            {failedList.length > 0 && (
              <div className="mt-6 text-left p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Added to Recommended Study Topics:
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {failedList.map((f, i) => (
                    <li key={i}><strong className="text-white">{f.subject}:</strong> {f.topic}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button onClick={handleRestart} className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Retake Drill
              </button>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 transition-all">
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
`;

fs.writeFileSync('./src/App.jsx', completeApp, 'utf8');
console.log('App.jsx successfully updated with prominent header, high-contrast AI COACH badge, and dynamic incorrect-answer study recommendations!');
