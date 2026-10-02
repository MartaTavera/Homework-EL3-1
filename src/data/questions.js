// ─────────────────────────────────────────────────────────────────────────
// FRACTION CIRCLES, FRACTION OF AN AMOUNT, LONG DIVISION,
// MULTIPLY/DIVIDE BY 10/100/1000 (single section, no images)
// ─────────────────────────────────────────────────────────────────────────
//
// FRACTION DISPLAY
// `frac(numerator, denominator)` renders a fraction with a horizontal bar,
// embedded directly into question `text` / `explanation` strings.
//
// FRACTION CIRCLES
// `fracCircle(totalSlices, shadedSlices, options)` renders an inline SVG pie
// circle with `shadedSlices` of `totalSlices` equal wedges filled in.
//
// Both rely on the app already rendering `text`, `hint`, `explanation` and
// `displayAnswer` via dangerouslySetInnerHTML (App.jsx, HintBox.jsx,
// FeedbackBox.jsx, ResultsTable.jsx).

// ─── Helpers ────────────────────────────────────────────────────────────

function frac(num, denom) {
  return `<span class="frac"><span class="num">${num}</span><span class="denom">${denom}</span></span>`;
}

function fracCircle(total, shaded, opts = {}) {
  const { size = 140, color = "#6366f1", empty = "#e2e8f0", stroke = "#1e293b" } = opts;
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
  let paths = "";
  for (let i = 0; i < total; i++) {
    const a0 = (i / total) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2;
    const x0 = (cx + r * Math.cos(a0)).toFixed(2);
    const y0 = (cy + r * Math.sin(a0)).toFixed(2);
    const x1 = (cx + r * Math.cos(a1)).toFixed(2);
    const y1 = (cy + r * Math.sin(a1)).toFixed(2);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const fill = i < shaded ? color : empty;
    paths += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;margin:12px auto;">${paths}</svg>`;
}

// ─── Questions ─────────────────────────────────────────────────────────

export const questions = [

  // ═══════════════════════════════════════════════════════════════════
  // 1. Fraction circles — 2 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "C1",
    sec: "A",
    marks: 1,
    type: "choice",
    text: `What fraction of the circle is shaded?\n\n${fracCircle(4, 3)}\n\nTick (✓) the correct answer.`,
    options: ["1/4", "2/4", "3/4", "4/4"],
    answer: "3/4",
    displayAnswer: "3/4",
    hint: "Count how many equal parts the circle is split into. Then count how many of those parts are shaded.",
    explanation: "The circle is split into 4 equal parts, and 3 of them are shaded, so the shaded fraction is 3/4."
  },

  {
    id: "C2",
    sec: "A",
    marks: 2,
    type: "multi",
    text: `${fracCircle(8, 4)}\n\nTick ALL the fractions below that are equal to the amount shaded.`,
    options: ["1/2", "4/8", "3/8", "5/8"],
    answer: ["1/2", "4/8"],
    displayAnswer: "1/2, 4/8",
    hint: "The circle is split into 8 equal parts, with 4 shaded. Can you simplify 4/8?",
    explanation: `4 out of 8 parts are shaded, so the fraction shown is 4/8. This simplifies to 1/2, since dividing both the numerator and denominator by 4 gives 1/2.\n\n${fracCircle(2, 1)}\n\nBoth circles show the same amount shaded — just split into a different number of equal parts.`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. Fraction of an amount — 5 questions (gentle progression)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "A1",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Work out ${frac(1, 3)} of 12.`,
    answer: 4,
    displayAnswer: "4",
    hint: "Divide 12 by the denominator (3).",
    explanation: "12 ÷ 3 = 4"
  },

  {
    id: "A2",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Work out ${frac(1, 4)} of 24.`,
    answer: 6,
    displayAnswer: "6",
    hint: "Divide 24 by the denominator (4).",
    explanation: "24 ÷ 4 = 6"
  },

  {
    id: "A3",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Work out ${frac(1, 5)} of 35.`,
    answer: 7,
    displayAnswer: "7",
    hint: "Divide 35 by the denominator (5).",
    explanation: "35 ÷ 5 = 7"
  },

  {
    id: "A4",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Work out ${frac(2, 3)} of 18.`,
    answer: 12,
    displayAnswer: "12",
    hint: "First divide 18 by the denominator (3). Then multiply your answer by the numerator (2).",
    explanation: "18 ÷ 3 = 6, then 6 × 2 = 12"
  },

  {
    id: "A5",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Work out ${frac(3, 4)} of 28.`,
    answer: 21,
    displayAnswer: "21",
    hint: "First divide 28 by the denominator (4). Then multiply your answer by the numerator (3).",
    explanation: "28 ÷ 4 = 7, then 7 × 3 = 21"
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. Long division, no remainder — 3 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "D1",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 456 ÷ 24",
    answer: 19,
    displayAnswer: "19",
    hint: "How many times does 24 go into 456? Try building up: 24 × 10 = 240, 24 × 20 = 480.",
    explanation: "24 × 19 = 456, so 456 ÷ 24 = 19"
  },

  {
    id: "D2",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 2688 ÷ 24",
    answer: 112,
    displayAnswer: "112",
    hint: "Try building up in chunks: 24 × 100 = 2400. How much is left to divide?",
    explanation: "24 × 100 = 2400, leaving 288. 24 × 12 = 288. 100 + 12 = 112, so 2688 ÷ 24 = 112"
  },

  {
    id: "D3",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 3822 ÷ 42",
    answer: 91,
    displayAnswer: "91",
    hint: "Try building up in chunks: 42 × 90 = 3780. How much is left to divide?",
    explanation: "42 × 90 = 3780, leaving 42. 42 × 1 = 42. 90 + 1 = 91, so 3822 ÷ 42 = 91"
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. Multiply / divide by 10, 100, 1000 — 5 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "M1",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 34 × 10",
    answer: 340,
    displayAnswer: "340",
    hint: "Multiplying by 10 moves every digit one place to the left.",
    explanation: "34 × 10 = 340"
  },

  {
    id: "M2",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 6.2 × 100",
    answer: 620,
    displayAnswer: "620",
    hint: "Multiplying by 100 moves every digit two places to the left.",
    explanation: "6.2 × 100 = 620"
  },

  {
    id: "M3",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 0.45 × 1000",
    answer: 450,
    displayAnswer: "450",
    hint: "Multiplying by 1000 moves every digit three places to the left.",
    explanation: "0.45 × 1000 = 450"
  },

  {
    id: "M4",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 870 ÷ 10",
    answer: 87,
    displayAnswer: "87",
    hint: "Dividing by 10 moves every digit one place to the right.",
    explanation: "870 ÷ 10 = 87"
  },

  {
    id: "M5",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Work out 3400 ÷ 100",
    answer: 34,
    displayAnswer: "34",
    hint: "Dividing by 100 moves every digit two places to the right.",
    explanation: "3400 ÷ 100 = 34"
  }

];

export default questions;