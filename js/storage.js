// ===== کل state لغات =====
const AMIN_STATE_KEY = "amin_vocab_state_v1";

// ===== متای روزانه (تایمر و هدف‌ها) =====
const AMIN_META_KEY = "amin_vocab_meta_v1";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// --- state لغات ---

function loadState() {
  try {
    const raw = localStorage.getItem(AMIN_STATE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.log("loadState error", e);
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(AMIN_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log("saveState error", e);
  }
}

function getWordState(state, wordObj) {
  const id = wordObj.id;
  if (!state[id]) {
    state[id] = {
      seen: 0,
      correct: 0,
      wrong: 0,
      reps: 0,
      interval: 0,
      ef: 2.5,
      nextReview: 0,
      hard: false,
      lastSeen: 0
    };
  }
  return state[id];
}

function classifyWord(ws) {
  if (ws.hard) return "hard";
  if (ws.correct >= 3 && ws.correct >= ws.wrong) return "known";
  if (ws.seen > 0) return "learning";
  return "new";
}

// --- متای روزانه (تایمر/هدف) ---

function loadMeta() {
  try {
    const raw = localStorage.getItem(AMIN_META_KEY);
    if (!raw) {
      const m = {
        date: todayStr(),
        secondsToday: 0,
        learnedToday: 0,
        hardMasteredToday: 0
      };
      localStorage.setItem(AMIN_META_KEY, JSON.stringify(m));
      return m;
    }
    const m = JSON.parse(raw);
    if (!m.date || m.date !== todayStr()) {
      return {
        date: todayStr(),
        secondsToday: 0,
        learnedToday: 0,
        hardMasteredToday: 0
      };
    }
    if (typeof m.secondsToday !== "number") m.secondsToday = 0;
    if (typeof m.learnedToday !== "number") m.learnedToday = 0;
    if (typeof m.hardMasteredToday !== "number") m.hardMasteredToday = 0;
    return m;
  } catch (e) {
    console.log("loadMeta error", e);
    return {
      date: todayStr(),
      secondsToday: 0,
      learnedToday: 0,
      hardMasteredToday: 0
    };
  }
}

function saveMeta(meta) {
  try {
    localStorage.setItem(AMIN_META_KEY, JSON.stringify(meta));
  } catch (e) {
    console.log("saveMeta error", e);
  }
}

// --- پخش تلفظ انگلیسی (TTS) ---

function speakTextEn(text) {
  try {
    if (!("speechSynthesis" in window)) {
      console.log("SpeechSynthesis not supported in this browser.");
      return;
    }
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.pitch = 1.0;

    // لغو تلفظ قبلی
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.log("TTS error:", e);
  }
}
