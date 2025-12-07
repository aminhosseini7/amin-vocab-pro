// ====================== Flashcards main logic ======================

// لیست لغات از vocab.js خوانده می‌شود
let words = (typeof VOCAB !== "undefined" ? VOCAB.slice() : []);

// وضعیت SRS
let aminState = loadState();
let meta = loadMeta();

// اهداف روزانه
const DAILY_TIME_GOAL_MIN = 30;   // ۳۰ دقیقه
const DAILY_NEW_WORD_GOAL = 20;   // ۲۰ لغت جدید
const DAILY_HARD_GOAL = 5;        // ۵ لغت سخت

// شافل اولیه
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
//            محاسبه ترتیب نمایش SRS
// ===================================================================

function computeDueOrder() {
  const now = Date.now();
  const due = [];
  const rest = [];

  for (let w of words) {
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
    dueOrder = words.slice();
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

  document.getElementById("wordBox").textContent = w.word;

  const box = document.getElementById("meaningBox");
  box.style.display = "none";
  box.innerHTML = "";
  document.getElementById("showMeaningBtn").style.display = "inline-block";

  updateStatsBox();
}

// ===================================================================
//                     نمایش معنی
// ===================================================================

function showMeaning() {
  const w = dueOrder[currentIndex];
  const box = document.getElementById("meaningBox");
  box.style.display = "block";
  box.innerHTML =
    "<b>معنی:</b> " + (w.meaning_fa || "") + "<br><br>" +
    "<b>مثال:</b> " + (w.example_en || "") + "<br><br>" +
    "<b>کاربرد:</b> " + (w.usage_fa || "") + "<br><br>" +
    "<b>نکته:</b> " + (w.note || "");
  document.getElementById("showMeaningBtn").style.display = "none";
}

// ===================================================================
//                     پاسخ کاربر
// ===================================================================

function answerCurrent(known) {
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
    computeDueOrder();
    currentIndex = 0;
  }
  renderCurrent();
}

function markHardCurrent() {
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
  computeDueOrder();
  renderCurrent();
  startTimer();

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
        speakTextEn(w.word);
      }
    };
  }
});
