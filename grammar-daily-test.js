// ========================================
// Daily Grammar Test – Hybrid (AI + Local)
// حالت C: ترکیبی از AI و بانک سؤال داخلی
// ========================================

// کمک برای تاریخ امروز (برای ذخیره در localStorage)
function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// سطح فعلی کاربر (اگر تعیین سطح کرده باشد)
const userLevel = localStorage.getItem("grammar_level") || "B1";

// آدرس API فرضی برای دریافت سؤالات روزانه از بک‌اند
// اگر بعداً در بک‌اندت این endpoint را بسازی، خودبه‌خود فعال می‌شود.
const DAILY_API_URL =
  "https://grammar-backend.vercel.app/api/daily-questions";

// ---------------------------------------
// بانک بزرگ سؤال داخلی (fallback + تصادفی)
// هر سؤال: text, choices[], correct, category, level
// ---------------------------------------

const DAILY_QUESTION_BANK = [
  // ===== A2 =====
  {
    level: "A2",
    category: "sv",
    text: "کدام جمله صحیح است؟ (Present Simple)",
    choices: [
      "He go to school every day.",
      "He goes to school every day.",
      "He going to school every day."
    ],
    correct: 1
  },
  {
    level: "A2",
    category: "tense",
    text: "جای خالی را پر کن:\nI ____ football yesterday.",
    choices: ["play", "played", "playing"],
    correct: 1
  },
  {
    level: "A2",
    category: "prep",
    text: "حرف اضافهٔ درست:\nShe is sitting ____ the chair.",
    choices: ["in", "on", "at"],
    correct: 1
  },
  {
    level: "A2",
    category: "article",
    text: "کدام درست است؟",
    choices: [
      "I have cat.",
      "I have a cat.",
      "I have an cat."
    ],
    correct: 1
  },
  {
    level: "A2",
    category: "wordOrder",
    text: "ترتیب درست کدام است؟",
    choices: [
      "Always I am happy.",
      "I always am happy.",
      "I am always happy."
    ],
    correct: 2
  },

  // ===== B1 =====
  {
    level: "B1",
    category: "tense",
    text: "کدام گزینه از نظر زمان (Present Perfect) درست است؟",
    choices: [
      "I am learning English since three years.",
      "I have learned English since three years.",
      "I have been learning English for three years."
    ],
    correct: 2
  },
  {
    level: "B1",
    category: "sv",
    text: "کدام جمله صحیح است؟",
    choices: [
      "They was very tired.",
      "They were very tired.",
      "They be very tired."
    ],
    correct: 1
  },
  {
    level: "B1",
    category: "prep",
    text: "حرف اضافهٔ مناسب:\nI was born ____ 1995.",
    choices: ["at", "in", "on"],
    correct: 1
  },
  {
    level: "B1",
    category: "article",
    text: "کدام جمله از نظر حروف تعریف درست است؟",
    choices: [
      "I bought a new car. The car is red.",
      "I bought new car. Car is red.",
      "I bought an new car. The car is red."
    ],
    correct: 0
  },
  {
    level: "B1",
    category: "wordOrder",
    text: "ترتیب کلمات درست کدام است؟",
    choices: [
      "Always I drink coffee in the morning.",
      "I drink always coffee in the morning.",
      "I always drink coffee in the morning."
    ],
    correct: 2
  },

  // ===== B2 =====
  {
    level: "B2",
    category: "tense",
    text: "کدام جمله از نظر زمان صحیح‌تر و طبیعی‌تر است؟",
    choices: [
      "I have seen him yesterday.",
      "I saw him yesterday.",
      "I have saw him yesterday."
    ],
    correct: 1
  },
  {
    level: "B2",
    category: "sv",
    text: "جملهٔ درست: (Subject–Verb Agreement)",
    choices: [
      "Neither of them are ready.",
      "Neither of them is ready.",
      "Neither of them be ready."
    ],
    correct: 1
  },
  {
    level: "B2",
    category: "prep",
    text: "حرف اضافهٔ مناسب:\nHe is interested ____ politics.",
    choices: ["in", "on", "about"],
    correct: 0
  },
  {
    level: "B2",
    category: "article",
    text: "کدام استفاده از حروف تعریف درست است؟",
    choices: [
      "The life is short.",
      "Life is short.",
      "A life is short."
    ],
    correct: 1
  },
  {
    level: "B2",
    category: "wordOrder",
    text: "ترتیب درست قید:",
    choices: [
      "I completely agree with you.",
      "I agree completely with you.",
      "هر دو جملهٔ بالا می‌توانند درست باشند."
    ],
    correct: 2
  },

  // ===== C1 =====
  {
    level: "C1",
    category: "tense",
    text: "کدام جمله از نظر زمانی و معنایی مناسب‌تر است؟",
    choices: [
      "By next year, I will finish my thesis.",
      "By next year, I will have finished my thesis.",
      "By next year, I have finished my thesis."
    ],
    correct: 1
  },
  {
    level: "C1",
    category: "sv",
    text: "کدام گزینه از نظر تطابق فاعل و فعل صحیح است؟",
    choices: [
      "A number of students is missing.",
      "A number of students are missing.",
      "A number of students be missing."
    ],
    correct: 1
  },
  {
    level: "C1",
    category: "prep",
    text: "حرف اضافهٔ دقیق‌تر در متن آکادمیک:",
    choices: ["in regard of", "with regard to", "in regarding"],
    correct: 1
  },
  {
    level: "C1",
    category: "article",
    text: "کدام جمله در متن آکادمیک طبیعی‌تر است؟",
    choices: [
      "The globalization has many effects.",
      "Globalization has many effects.",
      "A globalization has many effects."
    ],
    correct: 1
  },
  {
    level: "C1",
    category: "wordOrder",
    text: "کدام جمله از نظر ترتیب کلمات و سبک رسمی مناسب‌تر است؟",
    choices: [
      "Only rarely we observe such behavior.",
      "Rarely only we observe such behavior.",
      "Only rarely do we observe such behavior."
    ],
    correct: 2
  }
];

// ---------------------------------------
// انتخاب تصادفی چند سؤال متناسب با سطح
// ---------------------------------------

function pickRandomQuestions(level, count) {
  // سعی می‌کنیم اول سؤالات همان سطح را بگیریم
  let pool = DAILY_QUESTION_BANK.filter(q => q.level === level);

  // اگر خیلی کم بود، از همه سطوح استفاده می‌کنیم
  if (pool.length < count) {
    pool = DAILY_QUESTION_BANK.slice();
  }

  // شافل ساده
  pool.sort(() => Math.random() - 0.5);

  return pool.slice(0, count);
}

// ---------------------------------------
// تلاش برای گرفتن سؤال از AI، وگرنه fallback
// ---------------------------------------

let currentQuestions = [];
let currentIndex = 0;
let selectedChoice = null;

let wrongCounts = {
  tense: 0,
  sv: 0,
  prep: 0,
  article: 0,
  wordOrder: 0
};

// عناصر DOM
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
  tense:
    "زمان‌ها (Tenses): امروز بهتر است روی Present Perfect، Past Simple و تفاوت since/for تمرکز کنی.",
  sv: "تطابق فاعل و فعل (Subject–Verb Agreement): امروز روی he/she/it + فعل s دار و تفاوت آن با I/you/they تمرکز کن.",
  prep:
    "حروف اضافه (Prepositions): امروز روی in / on / at و چند ترکیب پرکاربرد دیگر تمرکز کن.",
  article:
    "حروف تعریف (Articles): امروز روی a/an/the و اینکه کجا از هیچ حرف تعریفی استفاده نکنیم تمرکز کن.",
  wordOrder:
    "ترتیب کلمات (Word Order): امروز جایگاه قیدها (always, usually, often) و ترتیب فاعل/فعل را تمرین کن.",
  general:
    "نتایج کلی خوب بود؛ می‌توانی یک مرور کلی روی زمان‌ها، حروف اضافه و ساختار جمله داشته باشی."
};

// تلاش برای گرفتن سؤالات از بک‌اند
async function loadQuestions() {
  try {
    const res = await fetch(DAILY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: userLevel,
        count: 5
      })
    });

    if (!res.ok) {
      throw new Error("Bad response from AI daily questions API");
    }

    const data = await res.json();

    // انتظار: آرایه‌ای از سؤال‌ها با همان ساختار بانک داخلی
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid daily questions payload");
    }

    // ولیدیشن سبک
    const normalized = data
      .filter(
        q =>
          q &&
          typeof q.text === "string" &&
          Array.isArray(q.choices) &&
          typeof q.correct === "number" &&
          typeof q.category === "string"
      )
      .slice(0, 5);

    if (normalized.length === 0) {
      throw new Error("No valid questions in AI response");
    }

    currentQuestions = normalized;
    console.log("Using AI-generated daily questions.");
  } catch (e) {
    console.warn("AI daily questions failed, fallback to local bank:", e);
    currentQuestions = pickRandomQuestions(userLevel, 5);
  }
}

// نمایش یک سؤال
function renderQuestion() {
  const q = currentQuestions[currentIndex];
  if (!q) return;

  qTitle.textContent = `سؤال ${currentIndex + 1} از ${currentQuestions.length}`;
  qText.textContent = q.text;
  qProgress.style.width = `${
    (currentIndex / currentQuestions.length) * 100
  }%`;

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

// وقتی کاربر روی «سؤال بعدی» می‌زند
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (selectedChoice === null) return;

    const q = currentQuestions[currentIndex];
    if (selectedChoice !== q.correct) {
      const cat = q.category || "other";
      wrongCounts[cat] = (wrongCounts[cat] || 0) + 1;
    }

    currentIndex++;

    if (currentIndex < currentQuestions.length) {
      renderQuestion();
    } else {
      finishTest();
    }
  });
}

// پایان آزمون و تعیین فوکوس
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
    lines.push(`از ${currentQuestions.length} سؤال، ${totalWrong} سؤال را اشتباه پاسخ دادی.`);
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

// دکمه بازگشت به صفحه گرامر
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "grammar-path.html";
  });
}

// شروع اولیه صفحه – گرفتن سؤال‌ها و بعد نمایش
(async function initDailyTest() {
  await loadQuestions();
  currentIndex = 0;
  wrongCounts = {
    tense: 0,
    sv: 0,
    prep: 0,
    article: 0,
    wordOrder: 0
  };
  renderQuestion();
})();
