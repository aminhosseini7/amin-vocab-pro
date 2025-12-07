// ============ Flashcards main logic ============

let aminState = loadState();
let meta = loadMeta();

// 🎯 اهداف روزانه
const DAILY_TIME_GOAL_MIN = 30;   // ۳۰ دقیقه مطالعه
const DAILY_NEW_WORD_GOAL = 20;   // ۲۰ لغت جدید
const DAILY_HARD_GOAL = 5;        // ۵ لغت سخت

// 🔗 آدرس بک‌اند هوش مصنوعی واژگان
const VOCAB_AI_URL = "https://grammar-backend.vercel.app/api/vocab";

// گرفتن معنی از هوش مصنوعی برای یک واژه
async function fetchAiMeaning(word) {
  const res = await fetch(VOCAB_AI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word })
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    console.error("AI vocab error:", data);
    throw new Error("AI error");
  }

  // انتظار داریم ساختار این‌طوری باشد:
  // { fa: "...", example: "...", usage: "...", hint: "..." }
  return {
    fa: data.fa || "",
    example: data.example || "",
    usage: data.usage || "",
    hint: data.hint || ""
  };
}

// کپی از لیست لغات و شافل
let words = (VOCAB || []).slice();

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(words);

let currentIndex = 0;
let dueOrder = [];
let timerLastTick = null;

// --------- متای امروز ---------

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

// --------- ترتیب نمایش (SRS + شافل) ---------

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

// --------- آمار ---------

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
  const hardGoalText = "لغات سختِ یادگرفته‌شده امروز: " +
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

// --------- رندر فلش‌کارت ---------

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

// --------- نمایش معنی (با هوش مصنوعی + فallback) ---------

async function showMeaning() {
  if (!dueOrder.length) return;

  const w = dueOrder[currentIndex];
  const box = document.getElementById("meaningBox");
  box.style.display = "block";

  // متن موقت
  box.textContent = "در حال گرفتن معنی از هوش مصنوعی...";

  let ai = null;

  try {
    ai = await fetchAiMeaning(w.word);
  } catch (e) {
    console.warn("AI vocab fetch failed, using local data if available.", e);
  }

  const fa = (ai && ai.fa) || w.meaning_fa || "";
  const example = (ai && ai.example) || w.example_en || "";
  const usage = (ai && ai.usage) || w.usage_fa || "";
  const hint = (ai && ai.hint) || w.note || "";

  if (!fa && !example && !usage && !hint) {
    box.textContent =
      "خطا در ارتباط با اینترنت یا سرور. لطفاً بعداً دوباره امتحان کن.";
  } else {
    box.innerHTML =
      "<b>معنی:</b> " + fa +
      "<br><br><b>مثال (EN):</b> " + example +
      "<br><br><b>کاربرد:</b> " + usage +
      "<br><br><b>نکته:</b> " + hint;
  }

  document.getElementById("showMeaningBtn").style.display = "none";
}

// --------- پاسخ کاربر ---------

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

// --------- تایمر ---------

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

// --------- init ---------

document.addEventListener("DOMContentLoaded", () => {
  computeDueOrder();
  renderCurrent();
  startTimer();

  document.getElementById("showMeaningBtn").onclick = () => {
    // چون showMeaning الان async است، این‌طوری صدا می‌زنیم
    showMeaning();
  };
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
