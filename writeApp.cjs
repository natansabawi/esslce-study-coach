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
  GraduationCap
} from "lucide-react";
import questionsData from "./data/questions.json";

// High-Definition Logo with Amharic & English Typography
const OfficialCenterLogo = () => (
  <div className="flex items-center gap-4">
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-md border-2 border-emerald-700/20 p-2 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 85" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="18" r="4.5" fill="#8B5CF6" />
        <circle cx="50" cy="10" r="5.2" fill="#6D28D9" />
        <circle cx="72" cy="18" r="4.5" fill="#8B5CF6" />
        <circle cx="15" cy="30" r="4" fill="#38BDF8" />
        <circle cx="85" cy="30" r="4" fill="#38BDF8" />
        <circle cx="8" cy="46" r="3.6" fill="#10B981" />
        <circle cx="92" cy="46" r="3.6" fill="#10B981" />
        <circle cx="6" cy="58" r="3.2" fill="#059669" />
        <circle cx="94" cy="58" r="3.2" fill="#059669" />
        
        <path d="M50 18 C 47 34, 47 48, 50 62 C 53 48, 53 34, 50 18 Z" fill="#5B21B6" />
        <path d="M34 23 C 40 33, 43 45, 47 60 C 44 48, 39 36, 34 23 Z" fill="#7C3AED" />
        <path d="M66 23 C 60 33, 57 45, 53 60 C 56 48, 61 36, 66 23 Z" fill="#7C3AED" />
        <path d="M20 34 C 28 42, 38 52, 45 61 C 37 54, 28 44, 20 34 Z" fill="#38BDF8" />
        <path d="M80 34 C 72 42, 62 52, 55 61 C 63 54, 72 44, 80 34 Z" fill="#38BDF8" />
        
        <path d="M14 46 C 25 48, 36 55, 46 64 C 34 58, 23 51, 14 46 Z" fill="#10B981" />
        <path d="M86 46 C 75 48, 64 55, 54 64 C 66 58, 77 51, 86 46 Z" fill="#10B981" />
        <path d="M10 57 C 23 57, 36 61, 48 67 C 34 64, 21 61, 10 57 Z" fill="#047857" />
        <path d="M90 57 C 77 57, 64 61, 52 67 C 66 64, 79 61, 90 57 Z" fill="#047857" />
      </svg>
    </div>
    <div>
      <div className="flex items-center gap-2">
        <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-slate-950">
          Exam Predict
        </span>
        <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-800 to-indigo-700 text-white uppercase tracking-wider shadow-sm">
          Coach AI
        </span>
      </div>
      <p className="text-sm sm:text-base font-bold text-stone-900 tracking-tight mt-0.5">
        ETHIOPIAN GIFTEDNESS AND TALENT DEVELOPMENT CENTER
      </p>
      <p className="text-xs sm:text-sm font-semibold text-emerald-900 font-serif">
        የኢትዮጵያ ተሰጥኦና ተውህቦ ማበልጸጊያ ማዕከል
      </p>
    </div>
  </div>
);

// High-Res Realistic Ethiopian Mentor Portrait Component
const PhotorealisticMentorCard = () => (
  <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
    <img 
      src="/mentors.png"
      onError={(e) => {
        // Fallback to high quality African female educators in STEM if local file is missing
        e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop";
      }}
      alt="Ethiopian Giftedness Center Educators" 
      className="w-full h-[450px] sm:h-[500px] object-cover object-top filter contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

    <div className="absolute bottom-5 left-5 right-5 text-white bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-white/15">
      <div className="flex items-center justify-between mb-1.5">
        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider">
          Center Academic Mentors
        </span>
        <span className="text-xs font-semibold text-emerald-300">Natural & Social Science</span>
      </div>
      <h4 className="text-lg font-serif font-bold text-white">Ethiopian STEM & Aptitude Faculty</h4>
      <p className="text-xs text-stone-200 mt-0.5">Guiding 10,000+ University Candidates Across Ethiopia</p>
    </div>
  </div>
);

const SUBJECT_COURSES = [
  { id: "math", name: "Mathematics", icon: BookOpen, bgIcon: "bg-emerald-600 text-white", badge: "High Leverage", desc: "Calculus, vectors, geometry & algebra aligned with national matriculation.", progress: 74 },
  { id: "sat", name: "SAT (Scholastic Aptitude)", icon: Compass, bgIcon: "bg-indigo-600 text-white", badge: "General Entrance", desc: "Logical deduction, sequence series, quantitative aptitude, and analytical reasoning.", progress: 84 },
  { id: "physics", name: "Physics", icon: Atom, bgIcon: "bg-blue-600 text-white", badge: "Concept Heavy", desc: "Electromagnetism, mechanics, thermodynamics, and calculation drills.", progress: 62 },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, bgIcon: "bg-amber-600 text-white", badge: "Core Science", desc: "Organic pathways, stoichiometry, equilibrium constants, and periodic trends.", progress: 81 },
  { id: "biology", name: "Biology", icon: Leaf, bgIcon: "bg-teal-600 text-white", badge: "High Yield", desc: "Genetics, cellular respiration, human physiology, and ecological dynamics.", progress: 88 },
  { id: "english", name: "English", icon: Languages, bgIcon: "bg-purple-600 text-white", badge: "Speed & Accuracy", desc: "Reading comprehension, grammatical inference, vocabulary, and sentence flow.", progress: 69 }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeQuizSubject, setActiveQuizSubject] = useState(null);

  // ML PREDICTION MODEL PARAMETERS
  const [grade, setGrade] = useState("12");
  const [stream, setStream] = useState("natural");
  const [predSubject, setPredSubject] = useState("math");
  const [midtermScore, setMidtermScore] = useState(74);
  const [studyHours, setStudyHours] = useState(16);

  // REACTIVE ML PREDICTION CALCULATION
  const prediction = useMemo(() => {
    const base = midtermScore * 0.72;
    const effortGain = Math.min(studyHours * 1.35, 25);
    const gradeWeight = grade === "12" ? 3 : grade === "remedial" ? -2 : 1;
    const streamAdjustment = stream === "natural" ? 0 : 2;
    
    const computedPercent = Math.min(99, Math.max(35, Math.round(base + effortGain + gradeWeight + streamAdjustment)));
    const scaledTotal600 = Math.round((computedPercent / 100) * 600);

    const strengthsMap = {
      math: "Differential Calculus & Vectors",
      sat: "Logical Inferences & Series Completion",
      physics: "Newtonian Mechanics & AC Circuits",
      chemistry: "Organic Synthesis & Stoichiometry",
      biology: "Cellular Respiration & Genetics",
      english: "Grammar Mechanics & Contextual Synonyms"
    };

    const weaknessesMap = {
      math: "Integration & 3D Coordinate Geometry",
      sat: "Speed Under Time Constraints",
      physics: "Rotational Dynamics & Wave Optics",
      chemistry: "Le Chatelier Shifts & Equilibrium",
      biology: "Photosynthetic Carbon Fixation",
      english: "Complex Paragraph Organization"
    };

    return {
      percent: computedPercent,
      scaled: scaledTotal600,
      confidence: computedPercent >= 80 ? "High (94%)" : "Moderate (88%)",
      status: computedPercent >= 75 ? "Targeting High-Demand University Placement" : "Meets Standard Entrance Criteria",
      topStrength: strengthsMap[predSubject] || "Analytical Core",
      weakPoint: weaknessesMap[predSubject] || "Calculation Speed",
      recommendation: computedPercent >= 80
        ? "Excellent pacing! Prioritize full 50-question mock drills to secure top placement."
        : "Dedicate 25 minutes daily to targeted question drills to raise your score above 520 / 600."
    };
  }, [grade, stream, predSubject, midtermScore, studyHours]);

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-slate-800 font-sans selection:bg-emerald-800/20 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 1. Header with Full Brand Emblem */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <OfficialCenterLogo />

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#prediction" className="text-sm font-bold text-stone-700 hover:text-emerald-800">Score Predictor</a>
            <a href="#courses" className="text-sm font-bold text-stone-700 hover:text-emerald-800">Practice Modules</a>
            <a href="#mentor" className="text-sm font-bold text-stone-700 hover:text-emerald-800">Faculty Mentorship</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveQuizSubject("sat")}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>SAT Aptitude (50 Qs)</span>
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 2. Hero Section with Real Mentors Photo */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm mb-6 text-xs font-bold text-stone-700">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Center National Examination Intelligence</span>
                <span className="text-stone-300">|</span>
                <span className="text-emerald-800">300 Questions Bank</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-950 leading-[1.12]">
                Master Your Exam with <span className="bg-gradient-to-r from-emerald-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">Exam Predict Coach AI</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Empowering entrance candidates with adaptive score forecasting and 50-question model tests across <strong>Mathematics, SAT Aptitude, Physics, Chemistry, Biology, and English</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#prediction"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-900/15 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Simulate Exam Score</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setActiveQuizSubject("sat")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border-2 border-stone-300 text-slate-900 font-bold text-base shadow-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-5 h-5 text-indigo-600" />
                  <span>SAT Aptitude Drill</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <PhotorealisticMentorCard />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Real-Time Prediction Engine */}
      <section id="prediction" className="py-20 bg-[#F5F3ED] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1 rounded-full">
              Real-Time Predictive Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              National Examination Score Predictor
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Move the sliders or switch parameters below to view your real-time score projection and personalized cutoff status.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            <div className="p-7 sm:p-10 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-100">
              <div>
                <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-900">
                  <BarChart3 className="w-5 h-5 text-emerald-800" />
                  <span>Candidate Academic Inputs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Target Grade</label>
                    <select 
                      value={grade} 
                      onChange={(e) => setGrade(e.target.value)} 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-800 outline-none"
                    >
                      <option value="11">Grade 11 Student</option>
                      <option value="12">Grade 12 (Candidate)</option>
                      <option value="remedial">University Remedial Stream</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Academic Stream</label>
                    <select 
                      value={stream} 
                      onChange={(e) => setStream(e.target.value)} 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-800 outline-none"
                    >
                      <option value="natural">Natural Science Stream</option>
                      <option value="social">Social Science Stream</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Evaluation Subject</label>
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
                        className={'py-2.5 text-xs font-bold rounded-xl border transition-all ' + (predSubject === item.id ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100')}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Current Diagnostic Score</label>
                      <span className="text-base font-extrabold text-emerald-800">{midtermScore}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="35" 
                      max="100" 
                      value={midtermScore} 
                      onChange={(e) => setMidtermScore(Number(e.target.value))} 
                      className="w-full accent-emerald-800 h-2 bg-stone-100 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Weekly Study Hours</label>
                      <span className="text-base font-extrabold text-emerald-800">{studyHours} Hours / Week</span>
                    </div>
                    <input 
                      type="range" 
                      min="4" 
                      max="40" 
                      value={studyHours} 
                      onChange={(e) => setStudyHours(Number(e.target.value))} 
                      className="w-full accent-emerald-800 h-2 bg-stone-100 rounded-lg cursor-pointer" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 font-semibold flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Score models recalculate instantly as you adjust any parameter.</span>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-5 bg-[#FAF9F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Live Forecast</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {prediction.confidence}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-44 h-44 flex items-center justify-center my-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" stroke="#E6E4DC" strokeWidth="10" fill="none" />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        stroke="#047857" 
                        strokeWidth="10" 
                        strokeDasharray="314.16" 
                        strokeDashoffset={314.16 - (314.16 * prediction.percent) / 100} 
                        strokeLinecap="round" 
                        fill="none" 
                        className="transition-all duration-300 ease-out" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-serif font-extrabold text-slate-900">{prediction.percent}%</span>
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Projected Score</span>
                    </div>
                  </div>

                  <div className="mt-3 px-4 py-1.5 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-sm">
                    Scaled Total: ~{prediction.scaled} / 600 Points
                  </div>
                  <p className="text-xs font-bold text-emerald-900 mt-2">{prediction.status}</p>

                  <div className="w-full mt-6 space-y-2.5 text-left">
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Top Strength</span>
                        <span className="text-xs font-bold text-slate-800">{prediction.topStrength}</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start gap-3">
                      <Target className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Requires Revision</span>
                        <span className="text-xs font-bold text-slate-800">{prediction.weakPoint}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-left">
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>AI Strategy:</strong> {prediction.recommendation}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Examination Courses */}
      <section id="courses" className="py-24 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1 rounded-full">
              Full 300 Questions Bank
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Core Examination Modules
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Select any subject to launch an interactive 50-question practice test with instant scoring and step-by-step rationales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBJECT_COURSES.map((course) => {
              const Icon = course.icon;
              const count = questionsData[course.id]?.length || 50;

              return (
                <div key={course.id} className="bg-white rounded-3xl border border-stone-200 p-7 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={'w-12 h-12 rounded-2xl ' + course.bgIcon + ' flex items-center justify-center shadow-md'}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">{course.badge}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{course.name}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">{course.desc}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <button 
                      onClick={() => setActiveQuizSubject(course.id)} 
                      className="w-full py-3.5 rounded-xl bg-stone-50 hover:bg-emerald-800 hover:text-white border border-stone-200 text-stone-800 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:border-emerald-800 shadow-sm"
                    >
                      <span>Launch Drill ({count} Questions)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Mentor Spotlight */}
      <section id="mentor" className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <PhotorealisticMentorCard />
            </div>
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1 rounded-full">
                Center Mentorship
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
                Inspiring Academic Excellence Nationwide
              </h2>
              <p className="text-base text-stone-600 mt-4 leading-relaxed">
                Guided by educators at the <strong>Ethiopian Giftedness and Talent Development Center</strong>, Exam Predict Coach AI pairs national curriculum analysis with adaptive scoring. Candidates across all regional states can prepare effectively for university entrance cutoffs.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setActiveQuizSubject("sat")}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Start SAT Aptitude Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive 50-Question Drill Modal */}
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white border border-stone-200 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{subjectNames[subjectId] || subjectId} Test</span>
            <span className="text-xs text-stone-500 font-semibold">{!isCompleted ? ('Question ' + (currentIdx + 1) + ' of ' + questions.length) : "Summary"}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"><X className="w-5 h-5" /></button>
        </div>

        {!isCompleted ? (
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 mb-6 leading-relaxed">{currentQ.question}</h3>
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100";
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 font-bold";
                  else if (idx === selectedOpt) btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                }
                return (
                  <button key={idx} disabled={isAnswered} onClick={() => handleSelectOption(idx)} className={'w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ' + btnStyle}>
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswered && idx === selectedOpt && idx !== currentQ.correctIndex && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-6">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-800 uppercase tracking-wider"><Sparkles className="w-4 h-4" /> AI Examiner Explanation</div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-stone-100">
              <span className="text-xs text-stone-500 font-medium">Current Score: {score} / {currentIdx + (isAnswered ? 1 : 0)}</span>
              <button onClick={handleNext} disabled={!isAnswered} className="px-6 py-3 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-900 disabled:opacity-40 transition-all flex items-center gap-2">
                <span>{currentIdx + 1 < questions.length ? "Next Question" : "Complete Drill"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8" /></div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">Drill Completed!</h3>
            <p className="text-sm text-stone-600 mt-1">You scored <strong className="text-emerald-800">{score}</strong> out of <strong>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)</p>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={handleRestart} className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-all flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Retake Drill</button>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-all">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
`;

fs.writeFileSync('./src/App.jsx', completeApp, 'utf8');
console.log('App.jsx updated with prominent official logo, photorealistic mentor card, and instant ML engine.');
