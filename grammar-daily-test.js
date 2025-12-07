// ================================
// Daily Grammar Test – 5 Questions
// ================================

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const dailyQuestions = [
  {
    text: "کدام جمله صحیح است؟ (زمان حال ساده – Present Simple)",
    choices: [
      "He go to school every day.",
      "He goes to school every day.",
      "He going to school every day."
    ],
    correct: 1,
    category: "sv" // Subject–Verb agreement
  },
  {
    text: "کدام گزینه از نظر زمان (Present Perfect) درست است؟",
    choices: [
      "I am learning English since three years.",
      "I have learned English since three years.",
      "I have been learning English for three years."
    ],
    correct: 2,
    category: "tense"
  },
  {
    text: "حرف اضافهٔ مناسب را انتخاب کن:\nI was born ____ 1995.",
    choices: ["at", "in", "on"],
    correct: 1,
    category: "prep"
  },
  {
    text: "کدام جمله از نظر حروف تعریف (Articles) درست است؟",
    choices: [
      "I bought a new car. The car is red.",
      "I bought new car. Car is red.",
      "I bought an new car. The car is red."
    ],
    correct: 0,
    category: "article"
  },
  {
    text: "کدام جمله ترتیب کلمات درستی دارد؟ (Word Order)",
    choices: [
      "Always I am tired in the morning.",
      "I am always tired in the morning.",
      "I tired am always in the morning."
    ],
    correct: 1,
    category: "wordOrder"
  }
];

let currentIndex = 0;
let selectedChoice = null;

let wrongCounts = {
  tense: 0,
  sv: 0,
  prep: 0,
  article: 0,
  wordOrder: 0
};

const qTitle = document.getElementById("q-title");
const qText = document.getElementById("q-text");
const qChoices = document.getElementById("q-choices");
const qProgress = document.getElementById("q-progress");
const nextBtn = document.getElementById("next-btn");

const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");
const focusBox = document.getElementById("focus-box");
const backBtn = document.getElementById("back-btn");

const FOCUS_DESCRIPTIONS = {
  tense: "زمان‌ها (Tenses): امروز بهتر است روی Present Perfect، Past Simple و تفاوت since/for تمرکز کنی.",
  sv: "تطابق فاعل و فعل (Subject–Verb Agreement): امروز روی he/she/it + فعل s دار و تفاوت آن با I/you/they تمرکز کن.",
  prep: "حروف اضافه (Prepositions): امروز روی in / on / at و چند ترکیب پرکاربرد دیگر تمرکز کن.",
  article: "حروف تعریف (Articles): امروز روی a / an / the و اینکه کجا از هیچ حرف تعریفی استفاده نکنیم تمرکز کن.",
  wordOrder: "ترتیب کلمات (Word Order): امروز جایگاه قیدها (always, usually, often) و ترتیب فاعل/فعل را تمرین کن.",
  general: "نتایج کلی خوب بود؛ می‌توانی یک مرور کلی روی زمان‌ها، حروف اضافه و ساختار جمله داشته باشی."
};

function loadQuestion() {
  const q = dailyQuestions[currentIndex];
  qTitle.textContent = `سؤال ${currentIndex + 1} از ${dailyQuestions.length}`;
  qText.textContent = q.text;
  qProgress.style.width = `${(currentIndex / dailyQuestions.length) * 100}%`;

  qChoices.innerHTML = "";
  selectedChoice = null;

  q.choices.forEach((choice, idx) => {
    const div = document.createElement("div");
    div.className = "choice-option";
    div.textContent = choice;
    div.onclick = () => {
      selectedChoice = idx;
      document
        .querySelectorAll(".choice-option")
        .forEach(el => el.classList.remove("choice-selected"));
      div.classList.add("choice-selected");
    };
    qChoices.appendChild(div);
  });
}

nextBtn.addEventListener("click", () => {
  if (selectedChoice === null) return;

  const q = dailyQuestions[currentIndex];
  if (selectedChoice !== q.correct) {
    wrongCounts[q.category] = (wrongCounts[q.category] || 0) + 1;
  }

  currentIndex++;

  if (currentIndex < dailyQuestions.length) {
    loadQuestion();
  } else {
    finishTest();
  }
});

function finishTest() {
  const today = todayStr();
  localStorage.setItem("daily_test_date", today);

  let maxCat = "general";
  let maxVal = 0;
  for (const [cat, val] of Object.entries(wrongCounts)) {
    if (val > maxVal) {
      maxVal = val;
      maxCat = cat;
    }
  }

  localStorage.setItem("daily_focus_topic", maxCat);

  testScreen.style.display = "none";
  resultScreen.style.display = "block";

  const totalWrong = Object.values(wrongCounts).reduce((a, b) => a + b, 0);

  let lines = [];

  if (totalWrong === 0) {
    lines.push("تقریباً همهٔ پاسخ‌هایت درست بود 👏");
    lines.push("به همین دلیل، تمرکز امروز را «مرور کلی گرامر» در نظر می‌گیریم.");
  } else {
    lines.push(`از ۵ سؤال، ${totalWrong} سؤال را اشتباه پاسخ دادی.`);
    lines.push("");
    lines.push("توزیع خطاها بر اساس دسته‌ها:");

    for (const [cat, val] of Object.entries(wrongCounts)) {
      if (val > 0) {
        let label = "";
        if (cat === "tense") label = "زمان‌ها (Tenses)";
        else if (cat === "sv") label = "تطابق فاعل و فعل";
        else if (cat === "prep") label = "حروف اضافه";
        else if (cat === "article") label = "حروف تعریف";
        else if (cat === "wordOrder") label = "ترتیب کلمات";

        lines.push(`- ${label}: ${val} سؤال اشتباه`);
      }
    }

    lines.push("");
    if (maxCat !== "general") {
      lines.push("بیشترین خطا در این بخش بوده است، بنابراین:");
    }
  }

  const desc = FOCUS_DESCRIPTIONS[maxCat] || FOCUS_DESCRIPTIONS.general;
  lines.push("");
  lines.push("🎯 تمرکز پیشنهادی امروز:");
  lines.push(desc);

  focusBox.textContent = lines.join("\n");
}

backBtn.addEventListener("click", () => {
  window.location.href = "grammar-path.html";
});

loadQuestion();
