const fs = require('fs');

let app = fs.readFileSync('./src/App.jsx', 'utf8');

// Replace the logo header section with an expanded, high-visibility layout
const oldHeaderRegex = /<div className="flex items-center gap-4">[\s\S]*?<\/div>\s*<\/div>/;

const newHeader = `<div className="flex items-center gap-5 py-2">
  <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-white shadow-lg border-2 border-emerald-800/30 p-2 flex items-center justify-center shrink-0">
    <img 
      src="/logo.png" 
      alt="Ethiopian Giftedness Center Logo"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling.style.display = 'block';
      }}
    />
    <div style={{ display: 'none' }} className="w-full h-full">
      <svg viewBox="0 0 100 85" className="w-full h-full" fill="none">
        <circle cx="28" cy="18" r="4.5" fill="#8B5CF6" />
        <circle cx="50" cy="10" r="5.5" fill="#6D28D9" />
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
  </div>
  <div className="flex flex-col justify-center">
    <div className="flex items-center gap-3">
      <span className="font-serif font-black text-3xl sm:text-4xl tracking-tight text-slate-950">
        Exam Predict
      </span>
      <span className="text-xs sm:text-sm font-black px-3.5 py-1 rounded-full bg-indigo-700 text-white uppercase tracking-wider shadow">
        COACH AI
      </span>
    </div>
    <p className="text-base sm:text-lg font-black text-stone-900 tracking-tight mt-1">
      ETHIOPIAN GIFTEDNESS AND TALENT DEVELOPMENT CENTER
    </p>
    <p className="text-sm sm:text-base font-bold text-emerald-900 font-serif">
      የኢትዮጵያ ተሰጥኦና ተውህቦ ማበልጸጊያ ማዕከል
    </p>
  </div>
</div>`;

app = app.replace(oldHeaderRegex, newHeader);
fs.writeFileSync('./src/App.jsx', app, 'utf8');
console.log('Updated logo size to 112px with enlarged headings.');
