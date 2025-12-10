// js/flashcards.js
// فلش‌کارت‌ها + SRS + فیلتر بر اساس درس (از روی فیلدهای VOCAB مثل lesson / unit / group)

// ===================== داده‌های اصلی =====================

const ALL_WORDS = (typeof VOCAB !== "undefined" ? VOCAB.slice() : []);
let words = ALL_WORDS.slice(); // لیست لغات فعال فعلی بر اساس درس انتخاب شده

// وضعیت SRS
let aminState = loadState();
let meta = loadMeta();

// اهداف روزانه
const DAILY_TIME_GOAL_MIN = 30;   // ۳۰ دقیقه
const DAILY_NEW_WORD_GOAL = 20;   // ۲۰ لغت جدید
const DAILY_HARD_GOAL = 5;        // ۵ لغت سخت

// شافل
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ===================== کمک‌تابع‌های درس =====================

// از روی داده‌ها، لیست درس‌ها را می‌سازیم
// اگر در VOCAB فیلدی مثل lesson / unit / group داشته باشی، از همان استفاده می‌شود
function buildLessonsList() {
  const set = new Set();
  for (let w of ALL_WORDS) {
    const lesson = w.lesson || w.unit || w.group;
    if (lesson !== undefined && lesson !== null && lesson !== "") {
      set.add(String(lesson));
    }
  }
  return Array.from(set).sort((a, b) => {
    // سعی در sort عددی اگر ممکن بود
    const na = Number(a), nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return a.localeCompare(b, "fa");
  });
}

// اعمال فیلتر بر اساس درس انتخاب شده
function applyLessonFilter(lessonValue) {
  if (!lessonValue) {
    // همهٔ لغات
    words = ALL_WORDS.slice();
  } else {
    words = ALL_WORDS.filter(w => {
      const l = w.lesson || w.unit || w.group;
      return String(l) === String(lessonValue);
    });
    // اگر به هر دلیل خالی شد، برای اینکه برنامه نخوابد، برگرد به همهٔ لغات
    if (!words.length) {
      words = ALL_WORDS.slice();
    }
  }

  // بعد از تغییر لیست لغات، SRS را دوباره تنظیم کن
  shuffleArray(words);
  computeDueOrder(true); // true یعنی فوراً از روی words جدید محاسبه کن
  currentIndex = 0;
  renderCurrent();
}

// ===================== وضعیت نمایش و SRS =====================

let currentIndex = 0;
let dueOrder = [];
let timerLastTick = null;

// ===================================================================
//            متای امروز
// ===================================================================

function ensureTodayMeta() {
  if (meta.date !== todayStr()) {
    meta = {
      date: todayStr(),
      secondsToday: 0,
      learnedToday: 0,
      hardMasteredToday: 0
    };
    saveMeta(meta);
  }
}

function formatTime(sec) {
  sec = Math.floor(sec);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + (s < 10 ? "0" + s : s);
}

// ===================================================================
//            محاسبه ترتیب نمایش SRS
// ===================================================================

function computeDueOrder(force = false) {
  const now = Date.now();
  const due = [];
  const rest = [];

  // اگر words خالی باشد، حداقل از ALL_WORDS استفاده کن
  const sourceWords = words.length ? words : ALL_WORDS;

  for (let w of sourceWords) {
    const ws = getWordState(aminState, w);
    if (!ws.nextReview || ws.nextReview <= now) {
      due.push(w);
    } else {
      rest.push(w);
    }
  }

  shuffleArray(due);
  shuffleArray(rest);

  if (due.length) {
    dueOrder = due;
  } else if (rest.length) {
    dueOrder = rest;
  } else {
    dueOrder = sourceWords.slice();
    shuffleArray(dueOrder);
  }
}

// ===================================================================
//                  آپدیت جعبه آمار
// ===================================================================

function updateStatsBox() {
  const total = words.length || ALL_WORDS.length;
  let hardCount = 0, knownCount = 0, learningCount = 0;
  const ids = Object.keys(aminState);

  ids.forEach(id => {
    const s = aminState[id];
    const c = classifyWord(s);
    if (c === "hard") hardCount++;
    else if (c === "known") knownCount++;
    else if (c === "learning") learningCount++;
  });

  const seenCount = ids.length;

  ensureTodayMeta();
  const timeText = "زمان امروز: " + formatTime(meta.secondsToday) +
                   " (هدف: " + DAILY_TIME_GOAL_MIN + " دقیقه)";
  const newGoalText = "لغات جدید امروز: " +
        meta.learnedToday + " / " + DAILY_NEW_WORD_GOAL;
  const hardGoalText = "لغات سخت یادگرفته‌شده امروز: " +
        meta.hardMasteredToday + " / " + DAILY_HARD_GOAL;

  const statsEl = document.getElementById("statsBox");
  if (!statsEl) return;

  statsEl.innerHTML =
    "کل لغات (در این فیلتر): " + total +
    " | دیده‌شده: " + seenCount +
    " | سخت: " + hardCount +
    " | بلد: " + knownCount +
    " | در حال یادگیری: " + learningCount +
    "<br>" + timeText +
    "<br>" + newGoalText +
    "<br>" + hardGoalText;
}

// ===================================================================
//                     رندر فلش‌کارت
// ===================================================================

function renderCurrent() {
  if (!dueOrder.length) computeDueOrder();
  if (!dueOrder.length) {
    const wb = document.getElementById("wordBox");
    const mb = document.getElementById("meaningBox");
    if (wb) wb.textContent = "هیچ لغتی پیدا نشد.";
    if (mb) {
      mb.style.display = "block";
      mb.innerHTML = "احتمالاً فیلتر خیلی محدود شده است.";
    }
    return;
  }

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= dueOrder.length) currentIndex = 0;

  const w = dueOrder[currentIndex];

  const wordBox = document.getElementById("wordBox");
  if (wordBox) wordBox.textContent = w.word || "...";

  const box = document.getElementById("meaningBox");
  if (!box) return;

  box.style.display = "none";
  box.innerHTML = "";
  const showBtn = document.getElementById("showMeaningBtn");
  if (showBtn) showBtn.style.display = "inline-block";

  updateStatsBox();
}

// ===================================================================
//                     نمایش معنی (کاملاً آفلاین)
// ===================================================================

function showMeaning() {
  if (!dueOrder.length) return;

  const w = dueOrder[currentIndex];
  const box = document.getElementById("meaningBox");
  const btn = document.getElementById("showMeaningBtn");

  if (!w || !box || !btn) return;

  box.style.display = "block";

  box.innerHTML =
    "📘 معنی:<br>" +
    (w.meaning_fa || "-") +
    "<br><br>✏ مثال (English):<br>" +
    (w.example_en || "-") +
    "<br><br>📌 کاربرد:<br>" +
    (w.usage_fa || "-") +
    "<br><br>💡 نکتهٔ حفظ:<br>" +
    (w.note || "-");

  btn.style.display = "none";
}

// ===================================================================
//                     پاسخ کاربر
// ===================================================================

function answerCurrent(known) {
  if (!dueOrder.length) return;

  const w = dueOrder[currentIndex];
  const ws = getWordState(aminState, w);

  const wasSeenBefore = ws.seen > 0;

  ws.seen += 1;
  ws.lastSeen = Date.now();

  if (known) {
    ws.correct += 1;
    updateSRSState(ws, 5);
  } else {
    ws.wrong += 1;
    ws.hard = true;
    updateSRSState(ws, 2);
  }

  if (known && !wasSeenBefore) {
    ensureTodayMeta();
    meta.learnedToday += 1;
    saveMeta(meta);
  }

  saveState(aminState);

  currentIndex++;
  if (currentIndex >= dueOrder.length) {
    computeDueOrder(true);
    currentIndex = 0;
  }
  renderCurrent();
}

function markHardCurrent() {
  if (!dueOrder.length) return;

  const w = dueOrder[currentIndex];
  const ws = getWordState(aminState, w);
  ws.hard = true;
  saveState(aminState);
  alert("این لغت به لیست سخت‌ها اضافه شد.");
  renderCurrent();
}

// ===================================================================
//                     تایمر
// ===================================================================

function startTimer() {
  ensureTodayMeta();
  timerLastTick = Date.now();

  setInterval(() => {
    const now = Date.now();
    const delta = Math.floor((now - timerLastTick) / 1000);
    if (delta <= 0) return;

    timerLastTick = now;
    ensureTodayMeta();
    meta.secondsToday += delta;
    saveMeta(meta);
    updateStatsBox();
  }, 1000);
}

// ===================================================================
//                     Init
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ۱) لیست درس‌ها را از روی VOCAB بساز و داخل select بریز
  const lessonSelect = document.getElementById("lessonFilter");
  if (lessonSelect) {
    const lessons = buildLessonsList();
    lessons.forEach(ls => {
      const opt = document.createElement("option");
      opt.value = ls;
      // اگر خودت دوست داشتی می‌تونی اینجا فرمت نمایش رو عوض کنی
      opt.textContent = "درس " + ls;
      lessonSelect.appendChild(opt);
    });

    lessonSelect.addEventListener("change", () => {
      const val = lessonSelect.value;
      applyLessonFilter(val);
    });
  }

  // ۲) ترتیب اولیه SRS
  computeDueOrder();
  renderCurrent();
  startTimer();

  // ۳) اتصال دکمه‌ها
  const showBtn = document.getElementById("showMeaningBtn");
  if (showBtn) showBtn.onclick = showMeaning;

  const btnKnow = document.getElementById("btnKnow");
  const btnDontKnow = document.getElementById("btnDontKnow");
  const btnHard = document.getElementById("btnHard");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (btnKnow) btnKnow.onclick = () => answerCurrent(true);
  if (btnDontKnow) btnDontKnow.onclick = () => answerCurrent(false);
  if (btnHard) btnHard.onclick = markHardCurrent;
  if (btnPrev) btnPrev.onclick = () => { currentIndex--; renderCurrent(); };
  if (btnNext) btnNext.onclick = () => { currentIndex++; renderCurrent(); };

  const speakBtn = document.getElementById("btnSpeakFlash");
  if (speakBtn) {
    speakBtn.onclick = () => {
      if (!dueOrder.length) return;
      const w = dueOrder[currentIndex];
      if (w && w.word) {
        try {
          speakTextEn(w.word);
        } catch (e) {
          console.warn("speakTextEn not defined:", e);
        }
      }
    };
  }
});
