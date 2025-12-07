/* =======================================
   Grammar Placement Test – Frontend Only
   ======================================= */

// ---------- سوالات گرامر (همان قبلی) ----------

const grammarQuestions = [
  {
    text: "کدام جمله صحیح است؟",
    choices: [
      "He go to school every day.",
      "He goes to school every day.",
      "He going to school every day."
    ],
    correct: 1
  },
  {
    text: "جای خالی را پر کنید:\nI ____ football yesterday.",
    choices: ["play", "played", "playing"],
    correct: 1
  },
  {
    text: "اشتباه جمله را درست کنید:\nShe don't like coffee.",
    choices: [
      "She doesn't like coffee.",
      "She didn't like coffee.",
      "She don't likes coffee."
    ],
    correct: 0
  },
  {
    text: "کدام زمان مناسب است؟\nI ____ here for 5 years.",
    choices: ["am living", "live", "have lived"],
    correct: 2
  },
  {
    text: "Choose correct:\nThey ____ to Canada next month.",
    choices: ["are going", "go", "going"],
    correct: 0
  },
  {
    text: "کدام جمله صحیح است؟",
    choices: [
      "I am agree with you.",
      "I agree with you.",
      "I agreeing with you."
    ],
    correct: 1
  },
  {
    text: "جای خالی را پر کنید:\nHe has been ____ for two hours.",
    choices: ["study", "studied", "studying"],
    correct: 2
  },
  {
    text: "Choose correct preposition:\nI was born ____ 1995.",
    choices: ["at", "in", "on"],
    correct: 1
  },
  {
    text: "کدام ساختار درست است؟",
    choices: [
      "I have saw him yesterday.",
      "I saw him yesterday.",
      "I have seen him yesterday."
    ],
    correct: 1
  },
  {
    text: "Choose correct:\nShe is better ____ math.",
    choices: ["in", "at", "on"],
    correct: 1
  }
];

let grammarIndex = 0;
let grammarScore = 0;
let selectedChoice = null;

// ---------- نوشتاری ----------

const writingTasks = [
  "Write two simple sentences about yourself.",
  "Write one sentence in past simple about something you did yesterday.",
  "Write 2–3 sentences about your hobbies."
];

let writingIndex = 0;
let writingAnswers = [];

// ---------- عناصر DOM ----------

const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const writingScreen = document.getElementById("writing-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");

const qTitle = document.getElementById("q-title");
const qText = document.getElementById("q-text");
const qChoices = document.getElementById("q-choices");
const qProgress = document.getElementById("q-progress");

const wTitle = document.getElementById("w-title");
const wText = document.getElementById("w-text");
const wAnswer = document.getElementById("w-answer");

const levelBox = document.getElementById("level-box");
const finishBtn = document.getElementById("finish-btn");

// ---------- شروع آزمون ----------

document.getElementById("start-btn").onclick = () => {
  welcomeScreen.style.display = "none";
  questionScreen.style.display = "block";
  loadGrammarQuestion();
};

function loadGrammarQuestion() {
  const q = grammarQuestions[grammarIndex];

  qTitle.textContent = `سؤال ${grammarIndex + 1} از 10`;
  qText.textContent = q.text;
  qProgress.style.width = `${(grammarIndex / grammarQuestions.length) * 100}%`;

  qChoices.innerHTML = "";
  selectedChoice = null;

  q.choices.forEach((c, idx) => {
    const div = document.createElement("div");
    div.className = "choice-option";
    div.textContent = c;
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

document.getElementById("next-question-btn").onclick = () => {
  if (selectedChoice === null) return;

  if (selectedChoice === grammarQuestions[grammarIndex].correct) {
    grammarScore++;
  }

  grammarIndex++;

  if (grammarIndex < grammarQuestions.length) {
    loadGrammarQuestion();
  } else {
    questionScreen.style.display = "none";
    writingScreen.style.display = "block";
    loadWritingTask();
  }
};

// ---------- بخش نوشتاری ----------

function loadWritingTask() {
  wTitle.textContent = `بخش نوشتاری – سؤال ${writingIndex + 1} از 3`;
  wText.textContent = writingTasks[writingIndex];
  wAnswer.value = "";
}

document.getElementById("next-writing-btn").onclick = () => {
  if (wAnswer.value.trim().length < 3) return;

  writingAnswers.push(wAnswer.value.trim());
  writingIndex++;

  if (writingIndex < writingTasks.length) {
    loadWritingTask();
  } else {
    // شبیه لودینگ، ولی تصمیم‌گیری لوکال است
    writingScreen.style.display = "none";
    loadingScreen.style.display = "block";
    setTimeout(finishPlacement, 600); // کمی تأخیر برای حس بهتر
  }
};

// ---------- تعیین سطح لوکال ----------

function finishPlacement() {
  // نمره 0 تا 10
  const score = grammarScore;
  const percent = Math.round((score / 10) * 100);

  // طول نوشتاری به‌عنوان تخمین خیلی ساده
  const totalWords = writingAnswers
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  let level = "B1";
  let strengths = [];
  let weaknesses = [];
  let recommendation = "";

  if (score <= 3) {
    level = "A2";
    strengths = [
      "آشنایی اولیه با ساختار جملهٔ ساده انگلیسی.",
      "توانایی نوشتن چند جملهٔ کوتاه دربارهٔ خودت."
    ];
    weaknesses = [
      "نیاز به یادگیری زمان‌های پایه (Present Simple, Past Simple).",
      "نیاز به تمرین روی حروف اضافه و ساختار کامل جمله (فاعل + فعل + مفعول)."
    ];
    recommendation =
      "از درس‌های سطح A2 شروع کن: ساختار جمله، زمان حال ساده و گذشتهٔ ساده، و جملات روزمره. سعی کن هر روز چند جمله کوتاه دربارهٔ خودت بنویسی.";
  } else if (score <= 7) {
    level = "B1";
    strengths = [
      "درک کلی خوبی از زمان‌های ساده و ساختارهای پایه داری.",
      "می‌توانی دربارهٔ خودت و علایقت چند جمله بنویسی."
    ];
    weaknesses = [
      "نیاز به دقت بیشتر در زمان‌ها (به‌خصوص Present Perfect و ترکیب since/for).",
      "نیاز به تقویت جمله‌های طولانی‌تر و استفاده از because, although, when و غیره."
    ];
    recommendation =
      "روی درس‌های سطح B1 تمرکز کن: مرور زمان‌ها، جملات مرکب، و نوشتن پاراگراف‌های کوتاه. هر روز یک متن ۳–۵ جمله‌ای بنویس و با AI تصحیح کن.";
  } else if (score <= 9) {
    level = "B2";
    strengths = [
      "تسلط خوبی بر زمان‌های اصلی و ساختار جمله داری.",
      "می‌توانی ایده‌هایت را نسبتاً روان به انگلیسی بنویسی."
    ];
    weaknesses = [
      "نیاز به تمرین روی ساختارهای پیچیده‌تر (Relative clauses, Conditionals).",
      "نیاز به دقت بیشتر در حروف اضافه و انتخاب واژهٔ دقیق."
    ];
    recommendation =
      "از درس‌های سطح B2 استفاده کن: جملات موصولی، شرطی‌ها، و Linking words. سعی کن متن‌های تحلیلی‌تر بنویسی و دقت واژگانی را بالا ببری.";
  } else {
    level = "C1";
    strengths = [
      "درک بالایی از گرامر و ساختارهای پیچیده داری.",
      "توانایی نوشتن متن‌های نسبتاً طولانی و منسجم."
    ];
    weaknesses = [
      "نیاز به ظرافت بیشتر در سبک نوشتن (رسمی/غیررسمی) و انتخاب واژه‌های دقیق.",
      "نیاز به تمرین روی متن‌های آکادمیک و essay."
    ];
    recommendation =
      "از درس‌های سطح C1 استفاده کن: سبک نوشتن، linking devices پیشرفته، و essay writing. روی coherence و cohesion متن‌هایت کار کن.";
  }

  // نمایش نتیجه
  loadingScreen.style.display = "none";
  resultScreen.style.display = "block";

  const summaryText = `
نمرهٔ گرامر (سؤالات تستی): ${score} از 10 (${percent}%)

برآورد سطح کلی: ${level}

نقاط قوت:
- ${strengths.join("\n- ")}

نقاط قابل بهبود:
- ${weaknesses.join("\n- ")}

پیشنهاد مسیر یادگیری:
${recommendation}
  `.trim();

  levelBox.textContent = summaryText;

  // ذخیره در LocalStorage برای داشبورد
  localStorage.setItem("grammar_level", level);
  localStorage.setItem("placement_done", "true");
}

// دکمه پایان → برگشت به داشبورد گرامر
if (finishBtn) {
  finishBtn.addEventListener("click", () => {
    window.location.href = "grammar-path.html";
  });
}
