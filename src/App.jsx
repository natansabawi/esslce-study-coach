import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Atom, FlaskConical, Leaf, Languages, Brain, ArrowLeft, CheckCircle2, XCircle, Clock, Target } from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";

const SUBJECTS = [
  {
    id: "math", name: "Mathematics", icon: "math", color: "#1F4D3D",
    topics: [
      { id: "algebra", name: "Algebra", questions: [
        { q: "Solve for x: 2x + 5 = 17", options: ["5", "6", "7", "11"], correct: 1, exp: "Subtract 5: 2x = 12, so x = 6." },
        { q: "Factorize x² − 9", options: ["(x−3)(x−3)", "(x+3)(x+3)", "(x−3)(x+3)", "(x−9)(x+1)"], correct: 2, exp: "This is a difference of squares: a² − b² = (a−b)(a+b)." },
        { q: "If f(x) = 3x − 2, what is f(4)?", options: ["8", "10", "12", "14"], correct: 1, exp: "3(4) − 2 = 12 − 2 = 10." },
        { q: "Simplify: 3(x + 2) − 4", options: ["3x + 2", "3x + 6", "3x − 2", "3x + 10"], correct: 0, exp: "3(x+2) − 4 = 3x + 6 − 4 = 3x + 2." },
        { q: "Solve for x: x/3 = 9", options: ["3", "12", "27", "36"], correct: 2, exp: "Multiply both sides by 3: x = 27." },
        { q: "Solve for x: 5x − 3 = 2x + 9", options: ["2", "3", "4", "6"], correct: 2, exp: "5x − 2x = 9 + 3, so 3x = 12, x = 4." },
      ]},
      { id: "geometry", name: "Geometry & Trigonometry", questions: [
        { q: "What is the sum of interior angles of a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1, exp: "The interior angles of any triangle always sum to 180°." },
        { q: "What is sin(30°)?", options: ["0", "0.5", "1", "√3/2"], correct: 1, exp: "sin(30°) = 1/2 = 0.5, a standard angle value." },
        { q: "A right triangle has legs 3 and 4. What is the hypotenuse?", options: ["5", "6", "7", "25"], correct: 0, exp: "By the Pythagorean theorem: √(3² + 4²) = √25 = 5." },
        { q: "What is cos(60°)?", options: ["0", "0.5", "1", "√3/2"], correct: 1, exp: "cos(60°) = 0.5, a standard angle value." },
        { q: "What is the formula for a circle's circumference?", options: ["πr²", "2πr", "πd²", "4πr²"], correct: 1, exp: "Circumference = 2πr, where r is the radius." },
        { q: "In a right triangle, the side opposite the right angle is called the?", options: ["adjacent", "opposite", "hypotenuse", "base"], correct: 2, exp: "The hypotenuse is always the longest side, opposite the right angle." },
      ]},
      { id: "calculus", name: "Calculus", questions: [
        { q: "What is the derivative of x²?", options: ["x", "2x", "x²", "2"], correct: 1, exp: "Using the power rule: d/dx(xⁿ) = n·x^(n−1), so d/dx(x²) = 2x." },
        { q: "What is ∫2x dx?", options: ["x² + C", "2x² + C", "x + C", "x²/2 + C"], correct: 0, exp: "Reversing the power rule gives x² + C." },
        { q: "What is the limit of sin(x)/x as x → 0?", options: ["0", "1", "undefined", "infinity"], correct: 1, exp: "This is a standard limit result: lim(x→0) sin(x)/x = 1." },
        { q: "What is the derivative of a constant, e.g. d/dx(5)?", options: ["0", "5", "1", "x"], correct: 0, exp: "The derivative of any constant is 0, since it doesn't change." },
        { q: "What is the derivative of sin(x)?", options: ["cos(x)", "−cos(x)", "−sin(x)", "tan(x)"], correct: 0, exp: "The derivative of sin(x) is cos(x), a standard calculus identity." },
        { q: "What is ∫3 dx?", options: ["3x + C", "3 + C", "x + C", "3x² + C"], correct: 0, exp: "Integrating a constant 3 with respect to x gives 3x + C." },
      ]},
    ],
  },
  {
    id: "physics", name: "Physics", icon: "physics", color: "#3A5F8A",
    topics: [
      { id: "mechanics", name: "Mechanics", questions: [
        { q: "What is Newton's second law formula?", options: ["F = ma", "F = mv", "F = m/a", "F = a/m"], correct: 0, exp: "Force equals mass times acceleration." },
        { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1, exp: "Force is measured in newtons (N)." },
        { q: "An object in free fall near Earth's surface accelerates at approximately?", options: ["5 m/s²", "9.8 m/s²", "15 m/s²", "20 m/s²"], correct: 1, exp: "Earth's gravitational acceleration is about 9.8 m/s²." },
        { q: "What is the formula for kinetic energy?", options: ["mgh", "½mv²", "mv", "m/v"], correct: 1, exp: "Kinetic energy = ½ × mass × velocity²." },
        { q: "Momentum is calculated as?", options: ["mass × velocity", "mass × acceleration", "force × time", "mass / velocity"], correct: 0, exp: "Momentum = mass × velocity." },
        { q: "According to Newton's third law, for every action there is an equal and opposite?", options: ["mass", "force", "velocity", "energy"], correct: 1, exp: "Newton's third law: for every action force, there's an equal and opposite reaction force." },
      ]},
      { id: "electricity", name: "Electricity & Magnetism", questions: [
        { q: "Ohm's law states that V equals?", options: ["IR", "I/R", "I + R", "R/I"], correct: 0, exp: "Ohm's law: Voltage = Current × Resistance." },
        { q: "What is the SI unit of electric current?", options: ["Volt", "Ohm", "Ampere", "Coulomb"], correct: 2, exp: "Electric current is measured in amperes (A)." },
        { q: "Like magnetic poles ___ each other.", options: ["attract", "repel", "cancel", "ignore"], correct: 1, exp: "Like poles repel; opposite poles attract." },
        { q: "Which of these is an electrical insulator?", options: ["Copper", "Rubber", "Aluminum", "Silver"], correct: 1, exp: "Rubber doesn't conduct electricity well, making it a good insulator." },
        { q: "Electric power is calculated as?", options: ["P = VI", "P = V/I", "P = I/V", "P = V + I"], correct: 0, exp: "Power = Voltage × Current." },
        { q: "A device that stores electric charge is called a?", options: ["resistor", "capacitor", "inductor", "diode"], correct: 1, exp: "A capacitor stores electric charge in an electric field." },
      ]},
      { id: "waves", name: "Waves & Thermodynamics", questions: [
        { q: "What is the approximate speed of light in a vacuum?", options: ["3×10⁵ m/s", "3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s"], correct: 2, exp: "Light travels at about 3×10⁸ m/s in a vacuum." },
        { q: "By the second law of thermodynamics, heat flows from ___ to ___ temperature regions.", options: ["low, high", "high, low", "it doesn't flow", "only in solids"], correct: 1, exp: "Heat naturally flows from hot to cold regions." },
        { q: "What is the SI unit of frequency?", options: ["Hertz", "Newton", "Joule", "Watt"], correct: 0, exp: "Frequency is measured in hertz (Hz), cycles per second." },
        { q: "Sound waves are what type of wave?", options: ["transverse", "longitudinal", "electromagnetic", "standing only"], correct: 1, exp: "Sound is a longitudinal mechanical wave — particles vibrate parallel to wave motion." },
        { q: "The process of a liquid changing to gas is called?", options: ["condensation", "evaporation", "sublimation", "deposition"], correct: 1, exp: "Evaporation is the change from liquid to gas." },
        { q: "In the electromagnetic spectrum, which has the shortest wavelength?", options: ["radio waves", "visible light", "gamma rays", "infrared"], correct: 2, exp: "Gamma rays have the shortest wavelength and highest energy in the EM spectrum." },
      ]},
    ],
  },
  {
    id: "chemistry", name: "Chemistry", icon: "chemistry", color: "#8A5A3A",
    topics: [
      { id: "atomic", name: "Atomic Structure & Bonding", questions: [
        { q: "The number of protons in a neutral atom equals its?", options: ["mass number", "atomic number", "number of neutrons", "number of isotopes"], correct: 1, exp: "The atomic number is defined as the number of protons." },
        { q: "Ionic bonds form through?", options: ["sharing electrons", "transfer of electrons", "sharing protons", "transfer of neutrons"], correct: 1, exp: "Ionic bonds form when electrons are transferred between atoms." },
        { q: "The nucleus of an atom contains?", options: ["protons and electrons", "protons and neutrons", "neutrons and electrons", "only protons"], correct: 1, exp: "The nucleus contains protons and neutrons; electrons orbit around it." },
        { q: "Which subatomic particle has no electric charge?", options: ["proton", "electron", "neutron", "ion"], correct: 2, exp: "Neutrons are electrically neutral, as the name suggests." },
        { q: "Elements in the same group of the periodic table have similar?", options: ["atomic mass", "number of neutrons", "valence electrons", "number of protons"], correct: 2, exp: "Elements in the same group share the same number of valence electrons, giving similar chemical properties." },
        { q: "A covalent bond involves?", options: ["transfer of electrons", "sharing of electrons", "transfer of protons", "sharing of neutrons"], correct: 1, exp: "Covalent bonds form when atoms share pairs of electrons." },
      ]},
      { id: "acidsbases", name: "Acids, Bases & Organic Chemistry", questions: [
        { q: "A solution with pH 3 is?", options: ["strongly basic", "neutral", "acidic", "none of these"], correct: 2, exp: "pH below 7 indicates an acidic solution." },
        { q: "The functional group −OH characterizes which class of compounds?", options: ["alkanes", "alcohols", "esters", "carboxylic acids"], correct: 1, exp: "The hydroxyl group (−OH) defines alcohols." },
        { q: "A neutralization reaction between an acid and a base produces a salt and?", options: ["oxygen", "water", "hydrogen gas", "carbon dioxide"], correct: 1, exp: "Acid + Base → Salt + Water." },
        { q: "Which of these is a strong acid?", options: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Carbonic acid"], correct: 2, exp: "Hydrochloric acid (HCl) fully dissociates in water, making it a strong acid." },
        { q: "The general formula for an alkane is?", options: ["CnH2n", "CnH2n+2", "CnH2n−2", "CnHn"], correct: 1, exp: "Alkanes follow the formula CnH2n+2, being fully saturated hydrocarbons." },
        { q: "A base that dissolves in water is called an?", options: ["acid", "alkali", "salt", "ester"], correct: 1, exp: "A water-soluble base is called an alkali." },
      ]},
      { id: "reactions", name: "Chemical Reactions & Rates", questions: [
        { q: "A catalyst ___ the rate of a reaction without being consumed.", options: ["increases", "decreases", "has no effect on", "reverses"], correct: 0, exp: "Catalysts speed up reactions by lowering activation energy, without being used up." },
        { q: "Increasing temperature generally ___ reaction rate.", options: ["increases", "decreases", "has no effect on", "stops"], correct: 0, exp: "Higher temperature gives particles more energy, increasing collision rate." },
        { q: "In a balanced chemical equation, mass is?", options: ["created", "destroyed", "conserved", "doubled"], correct: 2, exp: "This reflects the law of conservation of mass." },
        { q: "Which factor does NOT affect reaction rate?", options: ["temperature", "concentration", "color of container", "surface area"], correct: 2, exp: "The container's color has no chemical effect on reaction rate." },
        { q: "A reaction that releases heat is called?", options: ["endothermic", "exothermic", "isothermic", "adiabatic"], correct: 1, exp: "Exothermic reactions release heat energy to their surroundings." },
        { q: "The rate of a chemical reaction is generally measured as change in concentration over?", options: ["mass", "time", "volume", "pressure"], correct: 1, exp: "Reaction rate = change in concentration ÷ time." },
      ]},
    ],
  },
  {
    id: "biology", name: "Biology", icon: "biology", color: "#3A7A4A",
    topics: [
      { id: "cell", name: "Cell Biology & Genetics", questions: [
        { q: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], correct: 2, exp: "Mitochondria produce ATP, the cell's energy currency." },
        { q: "What does DNA stand for?", options: ["Deoxyribonucleic acid", "Dinucleic acid", "Diribonucleic acid", "Deoxyribose acid"], correct: 0, exp: "DNA = Deoxyribonucleic acid." },
        { q: "In a heterozygous genotype (Aa) where A is dominant, which trait is expressed?", options: ["A", "a", "both equally", "neither"], correct: 0, exp: "The dominant allele (A) is expressed over the recessive allele (a)." },
        { q: "Which structure controls what enters and leaves a cell?", options: ["cell wall", "cell membrane", "nucleus", "cytoplasm"], correct: 1, exp: "The cell membrane regulates the movement of substances in and out of the cell." },
        { q: "A cross between two heterozygous parents (Aa × Aa) produces what genotype ratio?", options: ["1:2:1", "3:1", "1:1", "2:2"], correct: 0, exp: "A Punnett square gives AA:Aa:aa in a 1:2:1 ratio." },
        { q: "Which of these is found in plant cells but not animal cells?", options: ["mitochondria", "nucleus", "cell wall", "ribosome"], correct: 2, exp: "Plant cells have a rigid cell wall for structural support; animal cells don't." },
      ]},
      { id: "physiology", name: "Human Physiology", questions: [
        { q: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], correct: 2, exp: "The human heart has 4 chambers: two atria and two ventricles." },
        { q: "Which organ produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Stomach"], correct: 1, exp: "The pancreas produces insulin to regulate blood sugar." },
        { q: "Gas exchange in the lungs occurs in the?", options: ["bronchi", "trachea", "alveoli", "larynx"], correct: 2, exp: "Alveoli are tiny air sacs where oxygen and CO₂ are exchanged." },
        { q: "Which blood cells fight infection?", options: ["red blood cells", "white blood cells", "platelets", "plasma"], correct: 1, exp: "White blood cells are part of the immune system, fighting infections." },
        { q: "The largest organ of the human body is the?", options: ["liver", "brain", "skin", "heart"], correct: 2, exp: "The skin is the body's largest organ by surface area and mass." },
        { q: "Digestion of food primarily begins in the?", options: ["stomach", "mouth", "small intestine", "esophagus"], correct: 1, exp: "Digestion begins in the mouth with chewing and salivary enzymes." },
      ]},
      { id: "ecology", name: "Ecology & Evolution", questions: [
        { q: "The process by which species change over generations is called?", options: ["mutation", "evolution", "respiration", "photosynthesis"], correct: 1, exp: "Evolution describes gradual change in species over generations." },
        { q: "Organisms that make their own food are called?", options: ["consumers", "decomposers", "producers", "predators"], correct: 2, exp: "Producers (like plants) make their own food via photosynthesis." },
        { q: "A group of the same species living in one area is called a?", options: ["community", "population", "ecosystem", "biome"], correct: 1, exp: "A population is all members of one species in a given area." },
        { q: "The process by which plants make food using sunlight is called?", options: ["respiration", "photosynthesis", "transpiration", "fermentation"], correct: 1, exp: "Photosynthesis converts sunlight, water, and CO₂ into glucose and oxygen." },
        { q: "A relationship where both organisms benefit is called?", options: ["parasitism", "commensalism", "mutualism", "predation"], correct: 2, exp: "Mutualism is a relationship where both species gain a benefit." },
        { q: "Natural selection favors traits that increase an organism's?", options: ["size", "survival and reproduction", "speed", "color"], correct: 1, exp: "Natural selection favors traits that improve survival and reproductive success." },
      ]},
    ],
  },
  {
    id: "english", name: "English", icon: "english", color: "#6A4A8A",
    topics: [
      { id: "grammar", name: "Grammar & Structure", questions: [
        { q: 'Choose the correct verb form: "She ___ to school every day."', options: ["go", "goes", "going", "gone"], correct: 1, exp: 'With third-person singular subjects, add -s: "She goes."' },
        { q: 'Identify the noun in: "The teacher explained the lesson clearly."', options: ["teacher", "explained", "clearly", "the"], correct: 0, exp: '"Teacher" names a person, making it the noun.' },
        { q: "Which sentence is grammatically correct?", options: ["He don't like it.", "He doesn't likes it.", "He doesn't like it.", "He not like it."], correct: 2, exp: '"He doesn\'t like it" correctly pairs "doesn\'t" with the base verb form.' },
        { q: "Choose the correct sentence.", options: ["They was happy.", "They were happy.", "They is happy.", "They be happy."], correct: 1, exp: '"They" takes the plural verb form "were."' },
        { q: 'What part of speech is the word "quickly"?', options: ["noun", "verb", "adjective", "adverb"], correct: 3, exp: 'Words ending in -ly that describe verbs are usually adverbs; "quickly" describes how an action is done.' },
        { q: "Which sentence uses correct punctuation?", options: ["I like apples oranges and bananas.", "I like apples, oranges, and bananas.", "I like apples oranges, and bananas.", "I like, apples oranges and bananas."], correct: 1, exp: "Commas separate items in a list, including before 'and' in the Oxford comma style." },
      ]},
      { id: "reading", name: "Reading Comprehension", questions: [
        { q: "The main idea of a passage is usually found in the?", options: ["title only", "topic sentence", "last word only", "it's never stated"], correct: 1, exp: "The topic sentence typically states the main idea of a paragraph." },
        { q: "An inference is?", options: ["a fact stated directly", "a conclusion drawn from evidence", "the title of a text", "a grammar rule"], correct: 1, exp: "Inference means reasoning to a conclusion using clues in the text." },
        { q: "Skimming a text means?", options: ["reading every word slowly", "reading quickly for the general idea", "memorizing the text", "translating the text"], correct: 1, exp: "Skimming is a quick read to grasp the overall idea." },
        { q: "A text's tone refers to the?", options: ["author's attitude toward the subject", "number of paragraphs", "title of the passage", "list of characters"], correct: 0, exp: "Tone reflects the author's attitude or feeling about the subject matter." },
        { q: "Context clues help readers to?", options: ["memorize the text", "guess the meaning of unfamiliar words", "count words", "ignore difficult words"], correct: 1, exp: "Context clues are hints in surrounding text that reveal a word's likely meaning." },
        { q: "A summary should?", options: ["include every detail", "capture only the main points", "be longer than the original", "add new opinions"], correct: 1, exp: "A good summary is concise and focuses only on the main points." },
      ]},
      { id: "vocabulary", name: "Vocabulary & Writing", questions: [
        { q: 'A synonym for "happy" is?', options: ["sad", "joyful", "angry", "tired"], correct: 1, exp: '"Joyful" shares a similar meaning to "happy."' },
        { q: 'An antonym for "increase" is?', options: ["rise", "grow", "decrease", "expand"], correct: 2, exp: '"Decrease" means the opposite of "increase."' },
        { q: "A good topic sentence should?", options: ["be vague", "state the main idea of the paragraph", "only ask a question", "always be the last sentence"], correct: 1, exp: "A topic sentence introduces and states the paragraph's main idea." },
        { q: 'Which word means "to make something better"?', options: ["worsen", "improve", "ignore", "remove"], correct: 1, exp: '"Improve" means to make something better.' },
        { q: "A word that describes a noun is called a(n)?", options: ["verb", "adverb", "adjective", "pronoun"], correct: 2, exp: "Adjectives describe or modify nouns." },
        { q: "The concluding sentence of a paragraph usually?", options: ["introduces a new topic", "restates or wraps up the main idea", "asks a random question", "contains only statistics"], correct: 1, exp: "A concluding sentence wraps up or restates the paragraph's main idea." },
      ]},
    ],
  },
  {
    id: "sat", name: "SAT (Aptitude)", icon: "sat", color: "#B8752E",
    topics: [
      { id: "verbal", name: "Verbal Reasoning", questions: [
        { q: 'Choose the word closest in meaning to "ample":', options: ["scarce", "abundant", "brief", "weak"], correct: 1, exp: '"Ample" means more than enough, close in meaning to "abundant."' },
        { q: "Complete the analogy: Bird is to Sky as Fish is to ___", options: ["Water", "Air", "Land", "Tree"], correct: 0, exp: "A bird's natural environment is the sky; a fish's natural environment is water." },
        { q: "Which word does not belong with the others?", options: ["Apple", "Banana", "Carrot", "Mango"], correct: 2, exp: "Apple, Banana, and Mango are fruits; a Carrot is a vegetable." },
        { q: 'Choose the antonym of "generous":', options: ["stingy", "kind", "wealthy", "calm"], correct: 0, exp: '"Stingy" is the opposite of "generous."' },
        { q: "Complete the analogy: Doctor is to Hospital as Teacher is to ___", options: ["Book", "School", "Pen", "Student"], correct: 1, exp: "A doctor works in a hospital; a teacher works in a school." },
        { q: 'Which word means the opposite of "expand"?', options: ["shrink", "grow", "stretch", "widen"], correct: 0, exp: '"Shrink" is the opposite of "expand."' },
      ]},
      { id: "quantitative", name: "Quantitative Reasoning", questions: [
        { q: "A train travels 60 km in 1.5 hours. What is its average speed?", options: ["30 km/h", "40 km/h", "45 km/h", "90 km/h"], correct: 1, exp: "Speed = distance/time = 60/1.5 = 40 km/h." },
        { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], correct: 2, exp: "15% of 200 = 0.15 × 200 = 30." },
        { q: "3 workers build a wall in 12 days. How many days will 6 workers take at the same rate?", options: ["6", "8", "12", "24"], correct: 0, exp: "Total work = 3 × 12 = 36 worker-days. With 6 workers: 36 ÷ 6 = 6 days." },
        { q: "A number increased by 20% becomes 60. What was the original number?", options: ["40", "45", "48", "50"], correct: 3, exp: "x × 1.2 = 60, so x = 50." },
        { q: "What is the next number in the sequence: 2, 4, 8, 16, ___?", options: ["18", "20", "24", "32"], correct: 3, exp: "Each number doubles the previous one: 16 × 2 = 32." },
        { q: "The ratio of boys to girls in a class is 3:2, with 30 students total. How many boys are there?", options: ["12", "15", "18", "20"], correct: 2, exp: "5 parts = 30 students, so 1 part = 6. Boys = 3 × 6 = 18." },
      ]},
      { id: "abstract", name: "Abstract & Logical Reasoning", questions: [
        { q: "Complete the pattern: Circle, Square, Circle, Square, ___?", options: ["Circle", "Square", "Triangle", "Star"], correct: 0, exp: "The pattern alternates Circle, Square — so it continues with Circle." },
        { q: "If all Bloops are Razzles, and all Razzles are Lazzles, then all Bloops are definitely?", options: ["Lazzles", "Razzles only", "neither", "Bloops"], correct: 0, exp: "By transitivity, if Bloops ⊂ Razzles ⊂ Lazzles, then all Bloops are Lazzles." },
        { q: "Find the odd one out:", options: ["Triangle", "Square", "Pentagon", "Circle"], correct: 3, exp: "Triangle, Square, and Pentagon are polygons with straight sides; a Circle has none." },
        { q: "Complete the sequence: A, C, E, G, ___?", options: ["H", "I", "J", "K"], correct: 1, exp: "The pattern skips one letter each time: A, C, E, G, I." },
        { q: "If today is Wednesday, what day will it be after 10 days?", options: ["Friday", "Saturday", "Sunday", "Monday"], correct: 1, exp: "10 mod 7 = 3 days ahead. Wednesday + 3 days = Saturday." },
        { q: "Which number does not belong?", options: ["9", "16", "25", "30"], correct: 3, exp: "9, 16, and 25 are perfect squares (3², 4², 5²); 30 is not." },
      ]},
    ],
  },
];

const ICONS = { math: BookOpen, physics: Atom, chemistry: FlaskConical, biology: Leaf, english: Languages, sat: Brain };
const STORAGE_KEY = "esslce-progress-v1";
const IDENTITY_KEY = "esslce-identity-v1";
const SHARED_PREFIX = "class-progress:";

const storage = {
  get: async (key, shared = false) => {
    if (typeof window !== "undefined" && window.storage?.get) {
      return await window.storage.get(key, shared);
    }
    const val = localStorage.getItem((shared ? "shared_" : "local_") + key);
    return val ? { value: val } : null;
  },
  set: async (key, value, shared = false) => {
    if (typeof window !== "undefined" && window.storage?.set) {
      return await window.storage.set(key, value, shared);
    }
    localStorage.setItem((shared ? "shared_" : "local_") + key, value);
  },
  list: async (prefix, shared = false) => {
    if (typeof window !== "undefined" && window.storage?.list) {
      return await window.storage.list(prefix, shared);
    }
    const fullPrefix = (shared ? "shared_" : "local_") + prefix;
    const keys = Object.keys(localStorage)
      .filter((k) => k.startsWith(fullPrefix))
      .map((k) => k.replace(fullPrefix, prefix));
    return { keys };
  },
};

function topicStats(progress, subjectId, topicId) {
  const key = `${subjectId}:${topicId}`;
  return progress[key] || { correct: 0, wrong: 0, minutes: 0, lastStudied: null };
}

function topicMastery(stat) {
  const attempts = stat.correct + stat.wrong;
  if (attempts === 0) return null;
  return stat.correct / attempts;
}

function subjectScore(progress, subject) {
  const stats = subject.topics.map((t) => topicStats(progress, subject.id, t.id));
  const attempted = stats.filter((s) => s.correct + s.wrong > 0);
  if (attempted.length === 0) return null;

  const avgMastery = attempted.reduce((sum, s) => sum + topicMastery(s), 0) / attempted.length;
  const coverage = attempted.length / subject.topics.length;
  const totalMinutes = stats.reduce((sum, s) => sum + s.minutes, 0);
  const timeFactor = Math.min(totalMinutes / (subject.topics.length * 20), 1);

  const score = 0.7 * avgMastery * 100 + 0.2 * coverage * 100 + 0.1 * timeFactor * 100;
  return Math.round(Math.max(0, Math.min(100, score)));
}

function overallReadiness(progress) {
  const scores = SUBJECTS.map((s) => subjectScore(progress, s));
  const anyAttempted = scores.some((s) => s !== null);
  if (!anyAttempted) return null;
  return scores.reduce((sum, s) => sum + (s ?? 0), 0);
}

function projectedScoreIfMastered(progress, subject, topicId) {
  const targetTopic = subject.topics.find((t) => t.id === topicId);
  const questionCount = targetTopic?.questions.length || 6;
  const stats = subject.topics.map((t) => {
    if (t.id === topicId) {
      return { correct: questionCount, wrong: 0, minutes: 20, lastStudied: new Date().toISOString() };
    }
    return topicStats(progress, subject.id, t.id);
  });
  const attempted = stats.filter((s) => s.correct + s.wrong > 0);
  const avgMastery = attempted.reduce((sum, s) => sum + topicMastery(s), 0) / attempted.length;
  const coverage = attempted.length / subject.topics.length;
  const totalMinutes = stats.reduce((sum, s) => sum + s.minutes, 0);
  const timeFactor = Math.min(totalMinutes / (subject.topics.length * 20), 1);
  const score = 0.7 * avgMastery * 100 + 0.2 * coverage * 100 + 0.1 * timeFactor * 100;
  return Math.round(Math.max(0, Math.min(100, score)));
}

function getRecommendations(progress, limit = 4) {
  const recs = [];
  SUBJECTS.forEach((subject) => {
    const currentScore = subjectScore(progress, subject) ?? 0;
    subject.topics.forEach((topic) => {
      const stat = topicStats(progress, subject.id, topic.id);
      const mastery = topicMastery(stat);
      if (mastery === 1) return;
      const projected = projectedScoreIfMastered(progress, subject, topic.id);
      const gain = projected - currentScore;
      if (gain <= 0) return;

      let reason;
      if (mastery === null) {
        reason = "Not started yet — practicing it adds quick coverage gains.";
      } else if (mastery < 0.5) {
        reason = `Only ${Math.round(mastery * 100)}% accuracy so far — your weakest attempted topic here.`;
      } else {
        reason = `${Math.round(mastery * 100)}% accuracy — close to solid, worth locking in.`;
      }

      recs.push({
        subjectId: subject.id, subjectName: subject.name, color: subject.color,
        topicId: topic.id, topicName: topic.name, gain, reason,
      });
    });
  });
  recs.sort((a, b) => b.gain - a.gain);
  return recs.slice(0, limit);
}

function getTimeInsight(progress) {
  const subjectStats = SUBJECTS.map((subject) => {
    const stats = subject.topics.map((t) => topicStats(progress, subject.id, t.id));
    const minutes = stats.reduce((sum, s) => sum + s.minutes, 0);
    const score = subjectScore(progress, subject);
    return { name: subject.name, minutes, score };
  }).filter((s) => s.minutes > 0);

  if (subjectStats.length < 2) return null;

  const mostTime = [...subjectStats].sort((a, b) => b.minutes - a.minutes)[0];
  const lowestScore = [...subjectStats].filter((s) => s.score !== null).sort((a, b) => a.score - b.score)[0];

  if (mostTime.name !== lowestScore.name && mostTime.score !== null && mostTime.score < 60 && mostTime.minutes >= 15) {
    return `You've spent the most time on ${mostTime.name} (${Math.round(mostTime.minutes)} min), but its score is still ${mostTime.score}/100 — consider slowing down and reviewing explanations instead of just repeating quizzes.`;
  }
  if (lowestScore.score !== null && lowestScore.minutes < 10) {
    return `${lowestScore.name} has your lowest score (${lowestScore.score}/100) but the least time invested (${Math.round(lowestScore.minutes)} min) — it's likely your highest-leverage subject to study next.`;
  }
  return null;
}

function progressToCSV(progress, studentId) {
  const rows = [["student_id", "subject", "topic", "correct", "wrong", "minutes_studied", "days_since_last_studied", "final_exam_score"]];
  const now = Date.now();
  SUBJECTS.forEach((subject) => {
    subject.topics.forEach((topic) => {
      const stat = topicStats(progress, subject.id, topic.id);
      if (stat.correct + stat.wrong === 0) return;
      const daysSince = stat.lastStudied ? Math.round((now - new Date(stat.lastStudied).getTime()) / 86400000) : "";
      rows.push([studentId, subject.id, topic.id, stat.correct, stat.wrong, stat.minutes.toFixed(1), daysSince, ""]);
    });
  });
  return rows.map((r) => r.join(",")).join("\n");
}

function downloadCSV(progress) {
  const studentId = window.prompt("Enter a student ID or name for this export:", "student_1");
  if (!studentId) return;
  const csv = progressToCSV(progress, studentId);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${studentId}_progress.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function syncSharedProgress(studentId, progress) {
  try {
    await storage.set(
      SHARED_PREFIX + studentId,
      JSON.stringify({ studentId, progress, updatedAt: new Date().toISOString() }),
      true
    );
  } catch (e) {
    console.error("Shared sync error:", e);
  }
}

async function fetchAllSharedStudents() {
  const students = [];
  try {
    const listResult = await storage.list(SHARED_PREFIX, true);
    const keys = (listResult && listResult.keys) || [];
    for (const key of keys) {
      try {
        const result = await storage.get(key, true);
        if (result && result.value) students.push(JSON.parse(result.value));
      } catch (e) {}
    }
  } catch (e) {}
  return students;
}

export default function App() {
  const [progress, setProgress] = useState({});
  const [identity, setIdentity] = useState({ studentId: null, sharing: false });
  const [role, setRole] = useState("student");
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState({ screen: "dashboard" });
  const quizStartRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await storage.get(STORAGE_KEY, false);
        if (result && result.value) setProgress(JSON.parse(result.value));
      } catch (e) {}
      try {
        const idResult = await storage.get(IDENTITY_KEY, false);
        if (idResult && idResult.value) setIdentity(JSON.parse(idResult.value));
      } catch (e) {} finally {
        setLoaded(true);
      }
    })();
  }, []);

  async function saveProgress(next) {
    setProgress(next);
    try {
      await storage.set(STORAGE_KEY, JSON.stringify(next), false);
    } catch (e) {
      console.error("Storage error:", e);
    }
    if (identity.sharing && identity.studentId) {
      syncSharedProgress(identity.studentId, next);
    }
  }

  async function toggleSharing() {
    if (identity.sharing) {
      const nextIdentity = { ...identity, sharing: false };
      setIdentity(nextIdentity);
      await storage.set(IDENTITY_KEY, JSON.stringify(nextIdentity), false);
      return;
    }
    const name = window.prompt(
      "Enter your name or student ID. This will be visible on the Teacher Dashboard:",
      identity.studentId || ""
    );
    if (!name) return;
    const nextIdentity = { studentId: name, sharing: true };
    setIdentity(nextIdentity);
    await storage.set(IDENTITY_KEY, JSON.stringify(nextIdentity), false);
    await syncSharedProgress(name, progress);
  }

  function startQuiz(subjectId, topicId) {
    quizStartRef.current = Date.now();
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    const topic = subject.topics.find((t) => t.id === topicId);
    
    const preparedQuestions = topic.questions.map((q) => {
      const correctAnswerText = q.options[q.correct];
      const shuffled = [...q.options].sort(() => Math.random() - 0.5);
      return {
        ...q,
        options: shuffled,
        correct: shuffled.indexOf(correctAnswerText),
      };
    });

    setView({ 
      screen: "quiz", 
      subjectId, 
      topicId, 
      qIndex: 0, 
      answers: [], 
      selected: null, 
      revealed: false,
      questions: preparedQuestions 
    });
  }

  function selectAnswer(idx) {
    setView((v) => ({ ...v, selected: idx, revealed: true }));
  }

  function nextQuestion(subject, topic) {
    setView((v) => {
      const isCorrect = v.selected === v.questions[v.qIndex].correct;
      const answers = [...v.answers, isCorrect];
      const nextIndex = v.qIndex + 1;
      if (nextIndex >= v.questions.length) {
        const rawMinutes = (Date.now() - quizStartRef.current) / 60000;
        const elapsedMinutes = Math.min(15, Math.max(0.5, rawMinutes));
        const key = `${subject.id}:${topic.id}`;
        const prev = topicStats(progress, subject.id, topic.id);
        const correctCount = answers.filter(Boolean).length;
        const next = {
          ...progress,
          [key]: {
            correct: prev.correct + correctCount,
            wrong: prev.wrong + (answers.length - correctCount),
            minutes: prev.minutes + elapsedMinutes,
            lastStudied: new Date().toISOString(),
          },
        };
        saveProgress(next);
        return { screen: "summary", subjectId: subject.id, topicId: topic.id, answers };
      }
      return { ...v, qIndex: nextIndex, selected: null, revealed: false, answers };
    });
  }

  if (!loaded) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#6E655A", fontFamily: "var(--font-body)" }}>Loading your progress…</span>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{FONT_IMPORT}</style>
      <TopBar role={role} onSetRole={(r) => { setRole(r); setView({ screen: "dashboard" }); }} />
      {role === "teacher" && <TeacherDashboard />}
      {role === "student" && view.screen === "dashboard" && (
        <Dashboard
          progress={progress}
          onOpenSubject={(id) => setView({ screen: "subject", subjectId: id })}
          onPractice={startQuiz}
          identity={identity}
          onToggleSharing={toggleSharing}
        />
      )}
      {role === "student" && view.screen === "subject" && (
        <SubjectView
          subject={SUBJECTS.find((s) => s.id === view.subjectId)}
          progress={progress}
          onBack={() => setView({ screen: "dashboard" })}
          onPractice={startQuiz}
        />
      )}
      {role === "student" && view.screen === "quiz" && (
        <QuizView
          view={view}
          subject={SUBJECTS.find((s) => s.id === view.subjectId)}
          onSelect={selectAnswer}
          onNext={nextQuestion}
          onBack={() => setView({ screen: "subject", subjectId: view.subjectId })}
        />
      )}
      {role === "student" && view.screen === "summary" && (
        <SummaryView
          view={view}
          subject={SUBJECTS.find((s) => s.id === view.subjectId)}
          topic={SUBJECTS.find((s) => s.id === view.subjectId).topics.find((t) => t.id === view.topicId)}
          onDone={() => setView({ screen: "subject", subjectId: view.subjectId })}
        />
      )}
    </div>
  );
}

function TopBar({ role, onSetRole }) {
  return (
    <div style={styles.topBar}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={LOGO_DATA_URI} alt="Ethiopian Giftedness and Talent Development Center" style={{ height: 34, width: 34, objectFit: "contain" }} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#231F1B", fontWeight: 600 }}>Ethiopian Giftedness & Talent Development Center</div>
          <div style={{ fontSize: 11.5, color: "#8A8172" }}>ESSLCE Study Coach</div>
        </div>
      </div>
      <div style={styles.rolePills}>
        <button style={{ ...styles.rolePill, ...(role === "student" ? styles.rolePillActive : {}) }} onClick={() => onSetRole("student")}>Student</button>
        <button style={{ ...styles.rolePill, ...(role === "teacher" ? styles.rolePillActive : {}) }} onClick={() => onSetRole("teacher")}>Teacher</button>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchAllSharedStudents();
      setStudents(data);
    })();
  }, []);

  if (students === null) {
    return <div style={styles.container}><span style={{ color: "#6E655A" }}>Loading class data…</span></div>;
  }

  const rows = students.map((s) => {
    const overall = overallReadiness(s.progress);
    const subjectScores = SUBJECTS.map((subj) => ({ id: subj.id, name: subj.name, score: subjectScore(s.progress, subj), color: subj.color }));
    const weakest = subjectScores.filter((s2) => s2.score !== null).sort((a, b) => a.score - b.score)[0];
    return { studentId: s.studentId, overall, subjectScores, weakest, updatedAt: s.updatedAt };
  }).sort((a, b) => (a.overall ?? -1) - (b.overall ?? -1));

  const classAverage = rows.length > 0
    ? Math.round(rows.reduce((sum, r) => sum + (r.overall ?? 0), 0) / rows.length)
    : null;

  return (
    <div style={styles.container}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#8A8172" }}>Teacher Dashboard</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, margin: "6px 0 28px", color: "#231F1B" }}>Class overview</h1>

      {rows.length === 0 ? (
        <div style={styles.heroCard}>
          <div style={{ color: "#6E655A" }}>No students have shared their progress yet. Ask students to turn on "Share with your teacher" from their Dashboard.</div>
        </div>
      ) : (
        <>
          <div style={{ ...styles.heroCard, marginBottom: 28 }}>
            <div>
              <div style={{ color: "#8A8172", fontSize: 14, marginBottom: 6 }}>Class average readiness</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "#1F4D3D" }}>{classAverage}<span style={{ fontSize: 22, color: "#8A8172" }}>/600</span></div>
              <div style={{ color: "#6E655A", fontSize: 14, marginTop: 6 }}>{rows.length} student{rows.length === 1 ? "" : "s"} sharing progress</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map((r) => (
              <div key={r.studentId} style={styles.topicRow}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#231F1B", marginBottom: 6 }}>{r.studentId}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {r.subjectScores.map((s) => (
                      <div key={s.id} title={s.name} style={{ fontSize: 11.5, color: "#8A8172", display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 4, background: s.score === null ? "#EDE6D6" : s.color }} />
                        {s.name.split(" ")[0]}: {s.score === null ? "—" : s.score}
                      </div>
                    ))}
                  </div>
                  {r.weakest && <div style={{ fontSize: 12.5, color: "#8B3A3A", marginTop: 8 }}>Weakest: {r.weakest.name} ({r.weakest.score}/100)</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#1F4D3D" }}>{r.overall ?? "—"}<span style={{ fontSize: 13, color: "#8A8172" }}>/600</span></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Dashboard({ progress, onOpenSubject, onPractice, identity, onToggleSharing }) {
  const readiness = overallReadiness(progress);
  const recommendations = getRecommendations(progress);
  const timeInsight = getTimeInsight(progress);
  return (
    <div style={styles.container}>
      <header style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#8A8172", letterSpacing: 0.3 }}>ESSLCE · Natural Science stream</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, margin: "6px 0 0", color: "#231F1B" }}>Study Coach</h1>
        </div>
        <button style={styles.exportButton} onClick={() => downloadCSV(progress)}>
          Export progress (CSV)
        </button>
      </header>

      <div style={styles.sharingRow}>
        <div style={{ fontSize: 13, color: "#6E655A" }}>
          {identity.sharing
            ? <>Sharing progress with your teacher as <b>{identity.studentId}</b></>
            : "Your teacher can't see your progress unless you turn this on."}
        </div>
        <button style={{ ...styles.smallButton, borderColor: identity.sharing ? "#8B3A3A" : "#1F4D3D", color: identity.sharing ? "#8B3A3A" : "#1F4D3D" }} onClick={onToggleSharing}>
          {identity.sharing ? "Stop sharing" : "Share with your teacher"}
        </button>
      </div>

      <div style={styles.heroCard}>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#8A8172", fontSize: 14, marginBottom: 6 }}>Predicted exam readiness</div>
          {readiness === null ? (
            <>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#231F1B", marginBottom: 8 }}>Not enough data yet</div>
              <div style={{ color: "#6E655A", fontSize: 15, maxWidth: 420 }}>Practice at least one topic in any subject and your readiness score will appear here, based on accuracy, topic coverage, and study time.</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "#1F4D3D", lineHeight: 1 }}>{readiness}<span style={{ fontSize: 28, color: "#8A8172" }}>/600</span></div>
              <div style={{ color: "#6E655A", fontSize: 15, marginTop: 8, maxWidth: 420 }}>{readinessMessage(readiness)}</div>
            </>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "32px 0 6px", color: "#231F1B" }}>Recommended for you</div>
          <div style={{ fontSize: 13, color: "#8A8172", marginBottom: 16 }}>Ranked by how many points mastering each topic could add to your predicted score.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recommendations.map((rec) => (
              <div key={`${rec.subjectId}:${rec.topicId}`} style={styles.recCard}>
                <div style={{ width: 4, alignSelf: "stretch", borderRadius: 4, background: rec.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#231F1B" }}>{rec.topicName} <span style={{ color: "#8A8172", fontSize: 13, fontFamily: "var(--font-body)" }}>· {rec.subjectName}</span></div>
                  <div style={{ fontSize: 13, color: "#6E655A", marginTop: 4 }}>{rec.reason}</div>
                  <div style={{ fontSize: 12.5, color: rec.color, marginTop: 6, fontWeight: 500 }}>+{rec.gain} points if mastered</div>
                </div>
                <button style={{ ...styles.smallButton, borderColor: rec.color, color: rec.color, whiteSpace: "nowrap" }} onClick={() => onPractice(rec.subjectId, rec.topicId)}>
                  Practice now
                </button>
              </div>
            ))}
          </div>
          {timeInsight && (
            <div style={styles.insightBox}>{timeInsight}</div>
          )}
        </>
      )}

      <div style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "36px 0 16px", color: "#231F1B" }}>Subjects</div>
      <div style={styles.subjectGrid}>
        {SUBJECTS.map((subject) => {
          const score = subjectScore(progress, subject);
          const Icon = ICONS[subject.icon];
          return (
            <div key={subject.id} style={styles.subjectCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: subject.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={subject.color} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#231F1B" }}>{subject.name}</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={styles.barTrack}>
                  <div style={{ ...styles.barFill, width: `${score ?? 0}%`, background: subject.color }} />
                </div>
                <div style={{ fontSize: 13, color: "#8A8172", marginTop: 6 }}>
                  {score === null ? "No practice yet" : `${score}/100 predicted`}
                </div>
              </div>
              <button
                style={{ ...styles.smallButton, borderColor: subject.color, color: subject.color }}
                onClick={() => onOpenSubject(subject.id)}
              >
                Open subject
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function readinessMessage(score) {
  if (score >= 430) return "Strong footing — you're around recent public-university cutoff territory. Keep sharpening weaker topics.";
  if (score >= 300) return "You're past the national 50% passing mark. A few more focused sessions could push you toward university cutoff range.";
  if (score >= 150) return "You're building a base. Prioritize subjects and topics you haven't attempted yet.";
  return "Early days — pick one topic and start practicing to build momentum.";
}

function SubjectView({ subject, progress, onBack, onPractice }) {
  const Icon = ICONS[subject.icon];
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}><ArrowLeft size={16} /> Dashboard</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 28px" }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: subject.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={subject.color} />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, margin: 0, color: "#231F1B" }}>{subject.name}</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {subject.topics.map((topic) => {
          const stat = topicStats(progress, subject.id, topic.id);
          const mastery = topicMastery(stat);
          const attempts = stat.correct + stat.wrong;
          const currentScore = subjectScore(progress, subject) ?? 0;
          const projected = mastery !== 1 ? projectedScoreIfMastered(progress, subject, topic.id) : null;
          const showProjection = projected !== null && projected > currentScore;
          return (
            <div key={topic.id} style={styles.topicRow}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#231F1B", marginBottom: 6 }}>{topic.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "#8A8172" }}>
                  <span><Target size={12} style={{ verticalAlign: -2 }} /> {mastery === null ? "Not attempted" : `${Math.round(mastery * 100)}% accuracy`}</span>
                  {attempts > 0 && <span><Clock size={12} style={{ verticalAlign: -2 }} /> {Math.round(stat.minutes)} min</span>}
                </div>
                {mastery !== null && (
                  <div style={{ ...styles.barTrack, marginTop: 8, height: 5 }}>
                    <div style={{ ...styles.barFill, width: `${mastery * 100}%`, background: subject.color, height: 5 }} />
                  </div>
                )}
                {showProjection && (
                  <div style={{ fontSize: 12.5, color: subject.color, marginTop: 8, fontWeight: 500 }}>
                    Master this topic → {subject.name} could reach ~{projected}/100
                  </div>
                )}
              </div>
              <button style={{ ...styles.smallButton, borderColor: subject.color, color: subject.color, whiteSpace: "nowrap" }}
                onClick={() => onPractice(subject.id, topic.id)}>
                {attempts > 0 ? "Practice again" : "Start practicing"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuizView({ view, subject, onSelect, onNext, onBack }) {
  const topic = subject.topics.find((t) => t.id === view.topicId);
  const questions = view.questions || topic.questions;
  const question = questions[view.qIndex];
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}><ArrowLeft size={16} /> {topic.name}</button>
      <div style={{ fontSize: 13, color: "#8A8172", margin: "24px 0 10px" }}>Question {view.qIndex + 1} of {questions.length}</div>
      <div style={styles.barTrack}>
        <div style={{ ...styles.barFill, width: `${((view.qIndex) / questions.length) * 100}%`, background: subject.color }} />
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#231F1B", margin: "28px 0 24px", lineHeight: 1.4 }}>
        {question.q}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt, idx) => {
          let border = "#E4DCC8", bg = "#FFFFFF";
          if (view.revealed) {
            if (idx === question.correct) { border = "#1F4D3D"; bg = "#1F4D3D10"; }
            else if (idx === view.selected) { border = "#8B3A3A"; bg = "#8B3A3A10"; }
          }
          return (
            <button
              key={idx}
              disabled={view.revealed}
              onClick={() => onSelect(idx)}
              style={{ ...styles.option, borderColor: border, background: bg, cursor: view.revealed ? "default" : "pointer" }}
            >
              <span>{opt}</span>
              {view.revealed && idx === question.correct && <CheckCircle2 size={18} color="#1F4D3D" />}
              {view.revealed && idx === view.selected && idx !== question.correct && <XCircle size={18} color="#8B3A3A" />}
            </button>
          );
        })}
      </div>

      {view.revealed && (
        <div style={{ marginTop: 20, padding: 16, background: "#F7F3EA", borderRadius: 10, fontSize: 14, color: "#5A5348", lineHeight: 1.5 }}>
          {question.exp}
        </div>
      )}

      {view.revealed && (
        <button style={{ ...styles.primaryButton, marginTop: 24, background: subject.color }} onClick={() => onNext(subject, topic)}>
          {view.qIndex + 1 >= questions.length ? "See results" : "Next question"}
        </button>
      )}
    </div>
  );
}

function SummaryView({ view, subject, topic, onDone }) {
  const correctCount = view.answers.filter(Boolean).length;
  const total = view.answers.length;
  const pct = Math.round((correctCount / total) * 100);
  return (
    <div style={{ ...styles.container, textAlign: "center", paddingTop: 60 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#8A8172" }}>{topic.name}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 56, color: subject.color, margin: "12px 0" }}>{correctCount}/{total}</div>
      <div style={{ color: "#6E655A", fontSize: 16, marginBottom: 32 }}>
        {pct >= 80 ? "Excellent grasp of this topic." : pct >= 50 ? "Decent, worth another round soon." : "This topic needs more practice — that's exactly what this session found."}
      </div>
      <button style={{ ...styles.primaryButton, background: subject.color, maxWidth: 240, margin: "0 auto" }} onClick={onDone}>
        Back to {subject.name}
      </button>
    </div>
  );
}

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
:root { --font-display: 'Spectral', serif; --font-body: 'IBM Plex Sans', sans-serif; }
button { font-family: var(--font-body); }
`;

const styles = {
  page: { minHeight: "100vh", background: "#F7F3EA", fontFamily: "'IBM Plex Sans', sans-serif" },
  container: { maxWidth: 720, margin: "0 auto", padding: "32px 24px 60px" },
  heroCard: { background: "#FFFFFF", border: "1px solid #E4DCC8", borderRadius: 16, padding: "28px 32px", display: "flex" },
  subjectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 14 },
  subjectCard: { background: "#FFFFFF", border: "1px solid #E4DCC8", borderRadius: 14, padding: 18 },
  barTrack: { width: "100%", height: 7, borderRadius: 10, background: "#EDE6D6", overflow: "hidden" },
  barFill: { height: 7, borderRadius: 10, transition: "width 0.4s ease" },
  smallButton: { border: "1.5px solid", background: "transparent", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  exportButton: { border: "1px solid #E4DCC8", background: "#FFFFFF", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500, color: "#6E655A", cursor: "pointer" },
  backButton: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#8A8172", fontSize: 14, cursor: "pointer", padding: 0 },
  topBar: { maxWidth: 720, margin: "0 auto", padding: "18px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },
  rolePills: { display: "flex", gap: 4, background: "#EDE6D6", borderRadius: 10, padding: 3 },
  rolePill: { border: "none", background: "transparent", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, color: "#8A8172", cursor: "pointer" },
  rolePillActive: { background: "#FFFFFF", color: "#231F1B", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" },
  sharingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFFFFF", border: "1px solid #E4DCC8", borderRadius: 10, padding: "12px 16px", marginBottom: 20 },
  recCard: { background: "#FFFFFF", border: "1px solid #E4DCC8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "stretch", gap: 12 },
  insightBox: { marginTop: 14, padding: "14px 16px", background: "#FBF3E4", border: "1px solid #E9DAB8", borderRadius: 10, fontSize: 13.5, color: "#6E5A2E", lineHeight: 1.5 },
  topicRow: { background: "#FFFFFF", border: "1px solid #E4DCC8", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16 },
  option: { border: "1.5px solid", borderRadius: 10, padding: "14px 16px", fontSize: 15, color: "#231F1B", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" },
  primaryButton: { width: "100%", border: "none", borderRadius: 10, padding: "14px", color: "#FFFFFF", fontSize: 15, fontWeight: 500, cursor: "pointer" },
};