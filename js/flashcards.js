// js/flashcards.js
// فلش‌کارت روزانه با SRS + فیلتر درس + حفظ فیلتر فقط برای همین صفحه

// Auto-generated from vocab_ALL_1-471_merged.xlsx
let words = (typeof VOCAB !== "undefined" ? VOCAB.slice() : []);

// وضعیت SRS
let aminState = loadState();
let meta = loadMeta();

// اهداف روزانه
const DAILY_TIME_GOAL_MIN = 30;   // ۳۰ دقیقه
const DAILY_NEW_WORD_GOAL = 20;   // ۲۰ لغت جدید
const DAILY_HARD_GOAL = 5;        // ۵ لغت سخت

// کلید ذخیره فیلتر درس فقط برای صفحه‌ی فلش‌کارت
const MAIN_LESSON_FILTER_KEY = "amin_main_lesson_filter_v1";

// فیلتر فعلی درس در این صفحه
let currentLessonFilterMain = "all";

// ---------------------- ذخیره / لود فیلتر درس ----------------------

function saveMainLessonFilter(val) {
  try {
    currentLessonFilterMain = val || "all";
    localStorage.setItem(MAIN_LESSON_FILTER_KEY, currentLessonFilterMain);
  } catch (e) {
    console.warn("Cannot save main lesson filter:", e);
  }
}

function loadMainLessonFilter() {
  try {
    const v = localStorage.getItem(MAIN_LESSON_FILTER_KEY);
    return v || "all";
  } catch (e) {
    console.warn("Cannot load main lesson filter:", e);
    return "all";
  }
}

// --------------------------- شافل اولیه -----------------------------

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(words);

// وضعیت
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
//            محاسبه ترتیب نمایش SRS (با فیلتر درس)
// ===================================================================

function computeDueOrder() {
  const now = Date.now();
  const lessonFilter = currentLessonFilterMain || "all";
  const due = [];
  const rest = [];

  for (let w of words) {
    // اگر فیلتر درس فعال است، لغات درس‌های دیگر را رد کن
    if (lessonFilter !== "all") {
      const wl = (w.lesson != null ? String(w.lesson) : "");
      if (wl !== String(lessonFilter)) continue;
    }

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
    // اگر در این درس لغتی پیدا نشد، حداقل همه لغات آن درس (یا همه) را استفاده کن
    const allFiltered = words.filter(w => {
      if (lessonFilter === "all") return true;
      const wl = (w.lesson != null ? String(w.lesson) : "");
      return wl === String(lessonFilter);
    });
    dueOrder = allFiltered.length ? allFiltered.slice() : words.slice();
    shuffleArray(dueOrder);
  }
}

// ===================================================================
//                  آپدیت جعبه آمار
// ===================================================================

function updateStatsBox() {
  const total = words.length;
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
  statsEl.innerHTML =
    "کل لغات: " + total +
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
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= dueOrder.length) currentIndex = 0;

  const w = dueOrder[currentIndex];

  document.getElementById("wordBox").textContent = w ? w.word : "...";

  const box = document.getElementById("meaningBox");
  box.style.display = "none";
  box.innerHTML = "";
  document.getElementById("showMeaningBtn").style.display = "inline-block";

  updateStatsBox();
}

// ===================================================================
//                     نمایش معنی (کاملًا آفلاین)
// ===================================================================

function showMeaning() {
  if (!dueOrder.length) return;
  const w = dueOrder[currentIndex];
  if (!w) return;

  const box = document.getElementById("meaningBox");
  const btn = document.getElementById("showMeaningBtn");
  if (!box || !btn) return;

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
  if (!w) return;

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
    computeDueOrder();
    currentIndex = 0;
  }
  renderCurrent();
}

function markHardCurrent() {
  if (!dueOrder.length) return;
  const w = dueOrder[currentIndex];
  if (!w) return;

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
  // ۱) فیلتر ذخیره‌شده را برای این صفحه لود کن
  currentLessonFilterMain = loadMainLessonFilter();

  const lessonSelect = document.getElementById("lessonFilterMain");
  if (lessonSelect) {
    // اگر option متناظر وجود دارد، همان را انتخاب کن
    if ([...lessonSelect.options].some(opt => opt.value === currentLessonFilterMain)) {
      lessonSelect.value = currentLessonFilterMain;
    } else {
      currentLessonFilterMain = "all";
      lessonSelect.value = "all";
    }

    // هر بار تغییر، فقط برای همین صفحه ذخیره کن
    lessonSelect.addEventListener("change", () => {
      const val = lessonSelect.value || "all";
      saveMainLessonFilter(val);
      currentIndex = 0;
      dueOrder = [];
      computeDueOrder();
      renderCurrent();
    });
  }

  // ۲) SRS را با فیلتر فعلی بساز و فلش‌کارت را نمایش بده
  computeDueOrder();
  renderCurrent();
  startTimer();

  // ۳) اتصال دکمه‌ها
  document.getElementById("showMeaningBtn").onclick = showMeaning;
  document.getElementById("btnKnow").onclick = () => answerCurrent(true);
  document.getElementById("btnDontKnow").onclick = () => answerCurrent(false);
  document.getElementById("btnHard").onclick = markHardCurrent;
  document.getElementById("btnPrev").onclick = () => { currentIndex--; renderCurrent(); };
  document.getElementById("btnNext").onclick = () => { currentIndex++; renderCurrent(); };

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
