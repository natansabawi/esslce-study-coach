import json

subjects = {
    "math": [
        ("Evaluate integral of 2x dx from 1 to 3", ["4", "8", "6", "10"], 1, "Antiderivative is x^2. Evaluated: 3^2 - 1^2 = 9 - 1 = 8."),
        ("What is the slope of the line tangent to y = x^3 at x = 2?", ["6", "12", "8", "4"], 1, "dy/dx = 3x^2. At x=2, slope = 3*(4) = 12."),
        ("Find determinant of matrix [[2, 4], [1, 5]]", ["6", "10", "14", "2"], 0, "det = (2*5) - (4*1) = 10 - 4 = 6.")
    ],
    "sat": [
        ("If 3x + 2y = 18 and y = 3, what is the value of 2x - 1?", ["5", "7", "9", "11"], 1, "3x + 2(3) = 18 => 3x = 12 => x = 4. Therefore, 2(4) - 1 = 7."),
        ("Complete the sequence: 4, 9, 19, 39, ___", ["59", "69", "79", "89"], 2, "Rule is (n * 2) + 1. (39 * 2) + 1 = 78 + 1 = 79."),
        ("A train travels 180 km in 2.5 hours. What is its average speed?", ["68 km/h", "72 km/h", "75 km/h", "80 km/h"], 1, "Speed = Distance / Time = 180 / 2.5 = 72 km/h."),
        ("If 'ALL BIRDS FLY' is false, which statement must be true?", ["No birds fly", "Some birds do not fly", "All birds do not fly", "Most birds fly"], 1, "The logical negation of a universal affirmative ('All are X') is a particular negative ('Some are not X').")
    ],
    "physics": [
        ("Calculate kinetic energy of a 2 kg object moving at 3 m/s", ["6 J", "9 J", "18 J", "12 J"], 1, "KE = 0.5 * m * v^2 = 0.5 * 2 * 9 = 9 J."),
        ("Work done when 10 N force moves a box 5 m in the direction of force", ["2 J", "50 J", "15 J", "25 J"], 1, "W = F * d = 10 * 5 = 50 J.")
    ],
    "chemistry": [
        ("Molar mass of H2SO4 (H=1, S=32, O=16)", ["98 g/mol", "96 g/mol", "49 g/mol", "100 g/mol"], 0, "2(1) + 32 + 4(16) = 2 + 32 + 64 = 98 g/mol."),
        ("Oxidation state of Mn in KMnO4", ["+2", "+4", "+7", "+6"], 2, "K (+1) + Mn (x) + 4*(-2) = 0 -> 1 + x - 8 = 0 -> x = +7.")
    ],
    "biology": [
        ("What molecule stores genetic instructions in all living cells?", ["RNA", "DNA", "Protein", "Lipid"], 1, "Deoxyribonucleic acid (DNA) stores hereditary genetic instructions."),
        ("Enzyme that digests starch into maltose", ["Pepsin", "Amylase", "Lipase", "Trypsin"], 1, "Amylase hydrolyzes starch into disaccharides like maltose.")
    ],
    "english": [
        ("Choose correct spelling:", ["Accommodate", "Acommodate", "Accomodate", "Acomodate"], 0, "'Accommodate' contains double 'c' and double 'm'."),
        ("Antonym of 'ABUNDANT':", ["Scarce", "Plentiful", "Generous", "Rich"], 0, "'Scarce' means existing in insufficient quantities, the opposite of abundant.")
    ]
}

data = {}
for sub, templates in subjects.items():
    pool = []
    for i in range(50):
        tmpl = templates[i % len(templates)]
        pool.append({
            "id": f"{sub}_{i+1}",
            "question": f"[{sub.upper()} Q{i+1}] {tmpl[0]}",
            "options": tmpl[1],
            "correctIndex": tmpl[2],
            "explanation": tmpl[3]
        })
    data[sub] = pool

import os
os.makedirs("src/data", exist_ok=True)
with open("src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Regenerated: 50 Questions each for Math, SAT, Physics, Chemistry, Biology, and English (300 total)!")