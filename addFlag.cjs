const fs = require('fs');

let app = fs.readFileSync('./src/App.jsx', 'utf8');

// 1. Definition of the Official Ethiopian Flag Component with SVG Star Emblem
const ethiopianFlagComponent = `
// Authentic Ethiopian National Flag SVG Component
const EthiopianFlag = ({ className = "w-10 h-6.5" }) => (
  <span className={'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md shadow-md border border-stone-200/80 ' + className}>
    <svg viewBox="0 0 60 36" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Green Top Band */}
      <rect width="60" height="12" fill="#078930" />
      {/* Yellow Middle Band */}
      <rect y="12" width="60" height="12" fill="#FCD116" />
      {/* Red Bottom Band */}
      <rect y="24" width="60" height="12" fill="#DA121A" />
      {/* Central Blue Disc */}
      <circle cx="30" cy="18" r="8" fill="#0F47AF" />
      {/* Radiant Yellow Star and Ray Emblems */}
      <path
        d="M30 11.8 L31.9 16 L36.4 16 L32.8 18.6 L34.2 23 L30 20.3 L25.8 23 L27.2 18.6 L23.6 16 L28.1 16 Z"
        fill="#FCD116"
      />
      {/* Radiating Rays */}
      <circle cx="30" cy="18" r="1.3" fill="#0F47AF" />
      <line x1="30" y1="13.2" x2="30" y2="10.8" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34.8" y1="14.8" x2="36.5" y2="13.5" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34.5" y1="21.5" x2="36.5" y2="23" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="25.5" y1="21.5" x2="23.5" y2="23" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="25.2" y1="14.8" x2="23.5" y2="13.5" stroke="#FCD116" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  </span>
);
`;

// Insert the flag component right above the course data
if (!app.includes('const EthiopianFlag')) {
  app = app.replace('const SUBJECT_COURSES =', ethiopianFlagComponent + '\nconst SUBJECT_COURSES =');
}

// 2. Add an Ethiopian Tricolor Accent Bar directly below the fixed header
const headerAccent = `
        {/* Ethiopian National Tricolor Accent Ribbon */}
        <div className="absolute bottom-0 left-0 right-0 h-[3.5px] grid grid-cols-3">
          <div className="bg-[#078930]" />
          <div className="bg-[#FCD116]" />
          <div className="bg-[#DA121A]" />
        </div>
      </header>`;

if (!app.includes('Ethiopian National Tricolor Accent Ribbon')) {
  app = app.replace('</header>', headerAccent);
}

// 3. Add the flag next to the logo title
const brandTitleWithFlag = `<div className="flex items-center gap-3">
      <span className="font-serif font-black text-3xl sm:text-4xl tracking-tight text-slate-950">
        Exam Predict
      </span>
      <EthiopianFlag className="w-9 h-6 shadow-sm ring-1 ring-black/5" />
      <span className="text-xs sm:text-sm font-black px-3.5 py-1 rounded-full bg-indigo-700 text-white uppercase tracking-wider shadow">
        COACH AI
      </span>
    </div>`;

app = app.replace(
  /<div className="flex items-center gap-3">\s*<span className="font-serif font-black text-3xl sm:text-4xl[^>]*>[\s\S]*?<\/div>/,
  brandTitleWithFlag
);

fs.writeFileSync('./src/App.jsx', app, 'utf8');
console.log('Ethiopian flag and tricolor gradient bar added successfully.');
