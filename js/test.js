// js/test.js
// کوییز لغت فقط از کلمات سخت + نمایش توضیح وقتی جواب غلط است

let aminTestState = loadState();
const ALL_WORDS = VOCAB || [];

let HARD_WORDS = [];
let quizAnswer = null;
let quizLocked = false;

// ------------------ کمک‌تابع‌ها ------------------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// فقط کلمات «سخت» را از روی وضعیت SRS انتخاب می‌کند
function recomputeHardWords() {
  HARD_WORDS = ALL_WORDS.filter((w) => {
    const s = getWordState(aminTestState, w);
    return classifyWord(s) === "hard";
  });
}

// جعبهٔ توضیحات را پر می‌کند (برای جواب غلط)
function renderExplanation(word) {
  const explEl = document.getElementById("quizExplanation");
  if (!explEl || !word) return;

  explEl.style.display = "block";
  explEl.innerHTML =
    "<b>معنی:</b> " +
    (word.meaning_fa || "-") +
    "<br><br><b>مثال (English):</b> " +
    (word.example_en || "-") +
    "<br><br><b>کاربرد:</b> " +
    (word.usage_fa || "-") +
    "<br><br><b>نکته:</b> " +
    (word.note || "-");
}

// ------------------ ساخت سؤال جدید ------------------

function newQuiz() {
  const wordEl = document.getElementById("quizWord");
  const optionsEl = document.getElementById("quizOptions");
  const statsEl = document.getElementById("quizStats");
  const explEl = document.getElementById("quizExplanation");

  if (!wordEl || !optionsEl || !statsEl) return;

  // ریست متن و توضیح
  statsEl.textContent = "";
  if (explEl) {
    explEl.style.display = "none";
    explEl.innerHTML = "";
  }

  // لیست کلمات سخت را به‌روز کن
  recomputeHardWords();

  // اگر هنوز لغت سختی نداریم:
  if (!HARD_WORDS.length) {
    quizLocked = true;
    quizAnswer = null;
    wordEl.textContent = "فعلاً لغت سختی نداری 👌";
    optionsEl.innerHTML =
      "<p style='font-size:14px;line-height:1.7'>اول در بخش «یادگیری» چند لغت را با دکمه ⭐ سخت علامت بزن یا با جواب‌های غلط، سخت شوند؛ بعد برگرد اینجا تست بده.</p>";
    return;
  }

  quizLocked = false;

  // انتخاب یک لغت سخت به‌صورت تصادفی
  const idx = Math.floor(Math.random() * HARD_WORDS.length);
  const w = HARD_WORDS[idx];
  quizAnswer = w;
  wordEl.textContent = w.word;

  // ساخت ۳ گزینه‌ی دیگر از بین همهٔ لغات
  const options = [w];
  while (options.length < 4 && options.length < ALL_WORDS.length) {
    const candidate = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    if (!options.includes(candidate)) options.push(candidate);
  }
  shuffle(options);

  // رندر گزینه‌ها
  optionsEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.meaning_fa || "";
    btn.dataset.wordId = String(opt.id);
    btn.style.margin = "6px 4px";
    btn.onclick = () => chooseOption(opt, btn);
    optionsEl.appendChild(btn);
  });
}

// ------------------ انتخاب گزینه ------------------

function chooseOption(opt, clickedBtn) {
  if (quizLocked || !quizAnswer) return;
  quizLocked = true;

  const statsEl = document.getElementById("quizStats");
  const optionsEl = document.getElementById("quizOptions");
  const buttons = Array.from(optionsEl.querySelectorAll("button"));

  const ws = getWordState(aminTestState, quizAnswer);
  ws.seen += 1;
  ws.lastSeen = Date.now();

  // همه‌ی دکمه‌ها را غیرفعال و به رنگ پایه برگردان
  buttons.forEach((b) => {
    b.disabled = true;
    b.style.background = "#4c1d95"; // رنگ بنفش پیش‌فرض
  });

  if (opt.id === quizAnswer.id) {
    // جواب درست
    ws.correct += 1;
    updateSRSState(ws, 5);
    statsEl.textContent = "آفرین! درست جواب دادی 🎉";
  } else {
    // جواب غلط → کلمه سخت می‌شود + توضیح
    ws.wrong += 1;
    ws.hard = true;
    updateSRSState(ws, 2);
    statsEl.textContent =
      "اشتباه بود. جواب صحیح با سبز مشخص شد و توضیحات زیر را بخوان 👇";
    renderExplanation(quizAnswer);
  }

  // فقط گزینهٔ درست سبز شود
  buttons.forEach((b) => {
    const isCorrect =
      String(b.dataset.wordId) === String(quizAnswer.id);
    if (isCorrect) {
      b.style.background = "#16a34a"; // سبز
    }
  });

  // اگر جواب غلط بود، گزینهٔ انتخاب‌شده قرمز شود
  if (opt.id !== quizAnswer.id) {
    clickedBtn.style.background = "#dc2626"; // قرمز
  }

  saveState(aminTestState);
}

// ------------------ init ------------------

document.addEventListener("DOMContentLoaded", () => {
  newQuiz();

  const nextBtn = document.getElementById("btnNewQuiz");
  if (nextBtn) {
    nextBtn.onclick = newQuiz;
  }

  const speakBtn = document.getElementById("btnSpeakTest");
  if (speakBtn) {
    speakBtn.onclick = () => {
      if (quizAnswer && quizAnswer.word) {
        speakTextEn(quizAnswer.word);
      }
    };
  }
});
