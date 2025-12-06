// ================================
// Daily Grammar Test – 5 Questions
// ================================

// تابع تاریخ امروز
function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// سوالات (همه چندگزینه‌ای؛ هرکدام یک دسته گرامری)
const dailyQuestions = [
  {
    text: "کدام جمله صحیح است؟ (زمان حال ساده – Present Simple)",
    choices: [
      "He go to school every day.",
      "He goes to school every day.",
      "He going to school every day."
    ],
    correct: 1,
    category: "sv" // تطابق فاعل و فعل
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

// شمارش خطا در هر دسته
let wrongCounts = {
  tense: 0,
  sv: 0,
  prep: 0,
  article: 0,
  wordOrder: 0
};

// المان‌ها
const qTitle = document.getElementById("q-title");
const qText = document.getElementById("q-text");
const qChoices = document.getElementById("q-choices");
const qProgress = document.getElementById("q-progress");
const nextBtn = document.getElementById("next-btn");

const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");
const focusBox = document.getElementById("focus-box");
const backBtn = document.getElementById("back-btn");

// توضیح فارسی برای هر دسته
const FOCUS_DESCRIPTIONS = {
  tense: "زمان‌ها (به‌خصوص Present Perfect و ترکیب‌های زمان حال/گذشته). امروز بهتر است روی مرور زمان‌ها تمرکز کنی.",
  sv: "تطابق فاعل و فعل (He goes / They go). امروز روی تفاوت فعل مفرد و جمع تمرکز کن.",
  prep: "حروف اضافه مثل in / on / at / for / since. امروز بهتر است مثال‌های زیادی با این حروف بسازی.",
  article: "حروف تعریف a / an / the. امروز روی اینکه کجا از a/an و کجا از the استفاده می‌شود تمرکز کن.",
  wordOrder: "ترتیب کلمات در جمله (I am always tired...). امروز روی جای قیدها و ترتیب فعل و فاعل تمرکز کن.",
  general: "امروز وضعیت کلی‌ات خوب بود؛ می‌توانی یک مرور کلی روی گرامر (زمان‌ها + حروف اضافه) انجام دهی."
};

// بارگذاری سوال
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

// دکمه بعدی
nextBtn.addEventListener("click", () => {
  if (selectedChoice === null) {
    // هیچ گزینه‌ای انتخاب نشده
    return;
  }

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

// پایان آزمون
function finishTest() {
  // ثبت تاریخ امروز
  const today = todayStr();
  localStorage.setItem("daily_test_date", today);

  // تعیین دسته با بیشترین خطا
  let maxCat = "general";
  let maxVal = 0;
  for (const [cat, val] of Object.entries(wrongCounts)) {
    if (val > maxVal) {
      maxVal = val;
      maxCat = cat;
    }
  }

  localStorage.setItem("daily_focus_topic", maxCat);

  // نمایش نتیجه
  testScreen.style.display = "none";
  resultScreen.style.display = "block";

  const desc = FOCUS_DESCRIPTIONS[maxCat] || FOCUS_DESCRIPTIONS.general;
  focusBox.textContent = desc;
}

// بازگشت به صفحه گرامر
backBtn.addEventListener("click", () => {
  window.location.href = "grammar-path.html";
});

// شروع
loadQuestion();
