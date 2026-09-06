const fs = require('fs');

let app = fs.readFileSync('./src/App.jsx', 'utf8');

// Replace the raw topic parsing logic with structured concept classification
const oldTopicExtract = /const missedTopic = \{[\s\S]*?tip: currentQ\.explanation\s*\};/;

const newTopicExtract = `let topicCategory = "General Mathematics";
      let studyAction = currentQ.explanation;
      let scoreGain = "+5 to +10 Points";

      const qText = currentQ.question.toLowerCase();
      if (qText.includes("integral")) {
        topicCategory = "Definite Integrals & Antiderivatives";
        studyAction = "Study rule: ∫ x^n dx = x^(n+1)/(n+1). Apply Fundamental Theorem [F(b) - F(a)].";
        scoreGain = "+8 to +12 Points";
      } else if (qText.includes("tangent") || qText.includes("slope") || qText.includes("derivative")) {
        topicCategory = "Tangent Lines & Derivatives";
        studyAction = "Differentiate f(x) to get f'(x), then substitute x0 to calculate tangent slope m.";
        scoreGain = "+10 to +15 Points";
      } else if (qText.includes("determinant") || qText.includes("matrix")) {
        topicCategory = "Matrix Determinants & Linear Systems";
        studyAction = "Apply cross-multiplication: det([[a, b], [c, d]]) = ad - bc.";
        scoreGain = "+6 to +10 Points";
      }

      const missedTopic = {
        subject: subjectNames[subjectId] || "Mathematics",
        topic: topicCategory,
        tip: studyAction,
        yield: scoreGain
      };`;

app = app.replace(oldTopicExtract, newTopicExtract);

// Render the yield badge on the completion screen
app = app.replace(
  /<li key=\{i\}><strong className="text-white">\{f\.subject\}:<\/strong> \{f\.topic\}<\/li>/g,
  `<li key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
      <div>
        <span className="font-bold text-emerald-400">{f.subject}: </span>
        <span className="text-slate-200">{f.topic}</span>
        <p className="text-[11px] text-slate-400 mt-0.5">{f.tip}</p>
      </div>
      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-black text-[10px] shrink-0">{f.yield}</span>
    </li>`
);

fs.writeFileSync('./src/App.jsx', app, 'utf8');
console.log('Grouped diagnostic study recommendation cards injected successfully.');
