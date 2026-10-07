export const CHARTS = [
  {
    name: "Terminal-Bench Science 0.1",
    note: "Tests whether agents can finish scientific research workflows with code and terminal tools: analyzing data, running simulations and fitting models. Astra reaches 64.6%, ahead of Claude Fable 5.1 at 52.6%, at roughly 31% lower estimated API cost.",
    bars: [
      { name: "GPT‑6 Astra", v: 64.6, hero: true },
      { name: "Fable 5.1", v: 52.6 },
      { name: "Opus 5", v: 30.0 },
      { name: "GPT‑5.6 Sol", v: 22.4 },
      { name: "Fable 5", v: 21.4 },
    ],
  },
  {
    name: "ARC-AGI-3",
    note: "An interactive reasoning benchmark of novel environments. Astra scores 99.9%, versus 30.2% for Claude Opus 5 and 17.8% for GPT‑5.6 Sol.",
    bars: [
      { name: "GPT‑6 Astra", v: 99.9, hero: true },
      { name: "Opus 5", v: 30.2 },
      { name: "GPT‑5.6 Sol", v: 17.8 },
    ],
  },
  {
    name: "FrontierMath Tier 4 (v2)",
    note: "Research-level mathematics problems. Astra scores 97.6%, compared with 90.2% for Claude Fable 5 and 83.0% for GPT‑5.6 Sol.",
    bars: [
      { name: "GPT‑6 Astra", v: 97.6, hero: true },
      { name: "Fable 5", v: 90.2 },
      { name: "Fable 5.1", v: 87.8 },
      { name: "GPT‑5.6 Sol", v: 83.0 },
      { name: "Opus 5", v: 73.2 },
    ],
  },
  {
    name: "Terminal-Bench 4.0",
    note: "Complex terminal tasks across software engineering, system configuration and data analysis. Astra reaches 57.9%, against 37.3% for GPT‑5.6 Sol and 55.8% for Claude Fable 5.1.",
    bars: [
      { name: "GPT‑6 Astra", v: 57.9, hero: true },
      { name: "Fable 5.1", v: 55.8 },
      { name: "Opus 5", v: 52.6 },
      { name: "Fable 5", v: 44.5 },
      { name: "GPT‑5.6 Sol", v: 37.3 },
      { name: "Gemini 3.8 Flash", v: 19.1 },
    ],
  },
  {
    name: "AutomationBench",
    note: "Business automation tasks. Astra scores 41.4%, more than double the 18.1% of GPT‑5.6 Sol.",
    bars: [
      { name: "GPT‑6 Astra", v: 41.4, hero: true },
      { name: "Fable 5.1", v: 31.4 },
      { name: "Opus 5", v: 26.9 },
      { name: "GPT‑5.6 Sol", v: 18.1 },
      { name: "Fable 5", v: 17.4 },
    ],
  },
];

export const MODELS = [
  "GPT‑6 Astra",
  "GPT‑5.6 Sol",
  "Claude Fable 5.1",
  "Claude Fable 5",
  "Claude Opus 5",
  "Gemini 3.8 Flash",
];

const n = null;

export const TABLES = [
  {
    tab: "Computer use",
    rows: [
      { b: "Agents' Last Exam", v: [59.3, 53.6, n, 48.7, 55.5, n] },
      { b: "OSWorld 2.0 (offline set, partial score)", v: [72.6, 65.7, n, n, 70.2, n] },
      { b: "ScreenSpot-Pro (no tools)", v: [92.7, 76.9, n, 87.3, n, n] },
    ],
  },
  {
    tab: "Professional",
    rows: [
      { b: "AutomationBench", v: [41.4, 18.1, 31.4, 17.4, 26.9, n] },
      { b: "BenchCAD", v: [95.9, 83.3, 84.3, 67.5, 82.1, n] },
      { b: "BrowseComp", v: [91.5, 90.4, n, 87.4, 90.8, n] },
      { b: "OpenScore String Quartets (1 − OMR-NED)", v: [0.84, 0.19, n, n, n, n], u: "", d: 2 },
      { b: "Internal Design Tasks", v: [50.0, 47.4, n, 35.8, n, n] },
      { b: "Internal Data Science Tasks", v: [40.9, 30.5, n, 34.7, n, n] },
      { b: "Artificial Analysis Intelligence Index v4.1.1", v: [61.2, 60.9, 65.7, 62.1, 63.1, 58.7], u: "" },
    ],
  },
  {
    tab: "Coding",
    rows: [
      { b: "Terminal-Bench 4.0", v: [57.9, 37.3, 55.8, 44.5, 52.6, 19.1] },
      { b: "DeepSWE v1.1", v: [74.1, 72.7, 67.4, 69.9, 73.7, 73.8] },
      { b: "FrontierCode 1.1 Extended (score)", v: [64.5, 60.6, 63.6, 64.9, 63.6, 56.3] },
      { b: "FrontierCode 1.1 Main (score)", v: [53.3, 47.5, 50.9, 53.5, 53.4, 43.6] },
      { b: "Internal Database Migration Tasks", v: [63.9, 42.7, 57.8, 50.3, n, n] },
      { b: "Artificial Analysis Coding Agent Index v1.4", v: [67.0, 65.1, n, 67.2, 68.1, 61.2], u: "" },
    ],
  },
  {
    tab: "Academic",
    rows: [
      { b: "Terminal-Bench Science 0.1", v: [64.6, 22.4, 52.6, 21.4, 30.0, n] },
      { b: "FrontierMath Tier 4 (v2)", v: [97.6, 83.0, 87.8, 90.2, 73.2, n] },
      { b: "GPQA Diamond", v: [96.0, 94.6, 93.7, 92.6, 93.7, 95.3] },
      { b: "Humanity's Last Exam (w/ tools)", v: [57.2, n, 65.0, 63.8, 63.6, n] },
    ],
  },
  {
    tab: "Science and health",
    rows: [
      { b: "GeneBench Pro", v: [37.1, 32.3, n, n, n, n] },
      { b: "MedChemBench (Internal)", v: [49.3, 47.4, n, n, n, n] },
      { b: "LifeSciBench", v: [60.3, 59.9, n, n, n, n] },
      { b: "HealthBench Professional (length-adjusted)", v: [63.4, 60.5, 58.1, 60.9, 56.4, 52.1] },
    ],
  },
  {
    tab: "Cybersecurity",
    rows: [
      { b: "ExploitBench", v: [100.0, 78.5, n, n, 70.0, n] },
      { b: "ExploitGym", v: [42.4, 30.3, 30.4, 28.4, 22.0, n] },
      { b: "ExploitBench (June–Aug 2026)", v: [39.0, 5.5, n, n, n, n] },
      { b: "SRE-Bench", v: [88.0, 55.9, n, n, 12.5, n] },
      { b: "SEC-Bench Pro", v: [85.4, 79.1, n, n, n, n] },
    ],
  },
  {
    tab: "Alignment",
    rows: [
      { b: "Internal computer use safety benchmark (lower is better)", v: [2.4, 22.0, 9.5, 18.3, 11.5, n], low: true },
      { b: "Same, with AutoReview (lower is better)", v: [1.8, 4.3, n, n, n, n], low: true },
      { b: "Internal circumvention benchmark (lower is better)", v: [0.0, 0.29, n, n, n, n], low: true, d: 2 },
      { b: "ExploitGym honeypot (lower is better)", v: [0.0, 48.2, n, n, n, n], low: true },
      { b: "Impossible ExploitGym", v: [100.0, n, n, n, n, n] },
      { b: "Internal hallucination benchmark (lower is better)", v: [4.2, 12.2, n, n, n, n], low: true },
    ],
  },
  {
    tab: "Long context",
    rows: [
      { b: "OpenAI MRCR v2 8-needle 256K–512K", v: [100.0, 91.5, n, n, n, n] },
      { b: "OpenAI MRCR v2 8-needle 512K–1M", v: [96.3, 73.8, n, n, n, n] },
    ],
  },
  {
    tab: "Abstract reasoning",
    rows: [
      { b: "ARC-AGI-3", v: [99.9, 17.8, n, n, 30.2, n] },
      { b: "ARC-AGI-2", v: [95.0, 92.5, 90.0, 89.2, 90.4, n] },
      { b: "ARC-AGI-1", v: [98.5, 97.5, 97.5, 98.5, 97.5, n] },
    ],
  },
];

export const COMPUTER_USE = [
  { title: "Circuit board", caption: "A 15-second condensed playback of Astra laying out a printed circuit board in KiCad: placing components and routing copper from a schematic. Full run: 2 min 54 sec." },
  { title: "Excel competition", caption: "Astra working through a spreadsheet challenge inside Excel." },
  { title: "Game development", caption: "Astra building and testing a playable game." },
  { title: "Filling in a Form 1040", caption: "Astra completing a tax form step by step on screen." },
  { title: "Frontend quality assurance", caption: "Astra clicking through a site it built to confirm every feature works." },
  { title: "Power BI", caption: "Astra assembling a dashboard in Power BI." },
  { title: "Car transmission", caption: "Astra producing a mechanical model of a car transmission." },
  { title: "Formatting a legal document", caption: "Astra applying consistent styles to a long legal document." },
];

export const LIFE_TASKS = [
  { title: "Pediatrician search", caption: "Astra researching and comparing local pediatricians." },
  { title: "Apartment hunting", caption: "Astra browsing listings and shortlisting apartments." },
  { title: "DMV appointment", caption: "Astra finding and booking an appointment." },
  { title: "Low-carb snacks", caption: "Astra searching for snack options that fit a diet." },
  { title: "Kindergarten analysis", caption: "Astra comparing kindergartens against stated priorities." },
];

export const PROFESSIONAL = [
  { title: "Gaia presentation", caption: "Astra builds a slideshow about GPT‑Gaia, a fictional model, using a few slides from OpenAI's template while keeping the right tone and layout." },
  { title: "Spreadsheet", caption: "A structured spreadsheet that follows an existing template." },
  { title: "Document styling", caption: "A document that matches the writing and visual style of the source." },
];

export const CREATIVE = [
  { title: "Unreal Engine walkthrough", caption: "Astra models a house in Blender and turns it into a walkable Unreal Engine 5 scene, so designers and clients can explore the layout before it is built." },
  { title: "Blender model", caption: "A 3D model built from a short brief." },
  { title: "Stills", caption: "Rendered stills with stronger visual judgment." },
  { title: "Kart Racer Game", caption: "A game with vivid graphics, engaging gameplay and accurate motion, made in minutes. Credit: Pietro Schirano." },
  { title: "Spaceship", caption: "A spaceship render built from a prompt." },
];

export const COLLAB = [
  { title: "Career website", caption: "Astra asks a focused question before building, then proceeds." },
  { title: "College search", caption: "Astra fills routine gaps itself and asks only when the answer could change the outcome." },
  { title: "Grocery list", caption: "Astra adapts the list as new requirements arrive." },
];

export const SCIENCE = [
  { title: "Sequencing quality", caption: "Astra navigates scientific software to inspect sequencing quality and visualize genetic variation." },
  { title: "Cell-tracking workflow", caption: "Astra works directly in specialized software to explore results." },
];

export const SAFETY = [
  { title: "Circumventing auto-review", caption: "Tests how models respond to auto-review denials in knowledge-work tasks. Astra never attempted to get around the denial." },
  { title: "ExploitGym honeypot", caption: "Astra took the honeypot in 0.0% of runs, versus 48.2% for GPT‑5.6 Sol." },
];

export const CODING_QUOTES = [
  { who: "John Crepezzi", role: "AI Assistants, Jane Street", text: "Jane Street reports state-of-the-art results on its internal coding benchmarks and a clear step forward in trading intuition evaluations over GPT‑5.6 Sol. Developers find Astra easier to follow, and its code needs fewer iterations to reach production quality." },
  { who: "Fabian Hedin", role: "CTO & Co-founder, Lovable", text: "Lovable's first-generation eval put Astra well ahead of GPT‑5.6 Sol at low, medium and high effort. More effort buys more iterations on a fresh build, more browser-based verification, and a lean toward running code over applying patches." },
];
