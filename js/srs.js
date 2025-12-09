// js/srs.js
// منطق SRS و طبقه‌بندی لغت‌ها

// ===================== کمک‌تابع‌ها =====================

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// کلید یکتا برای هر لغت در state
// ✅ فقط و فقط خود کلمه را کلید می‌کنیم (ساده و پایدار)
function wordKeyFromObj(w) {
  if (w && typeof w.word === "string") return w.word;
  if (w && typeof w.id !== "undefined") return String(w.id);
  return String(w);
}

function defaultWordState() {
  return {
    seen: 0,
    correct: 0,
    wrong: 0,
    hard: false,
    lastSeen: 0,
    interval: 0,
    ef: 2.5,
    reps: 0,
    nextReview: 0
  };
}

// state در storage.js لود/ذخیره می‌شود
function getWordState(state, w) {
  const key = wordKeyFromObj(w);

  // اگر قبلاً با فرمت دیگری ذخیره شده بود، اینجا مایگریت می‌کنیم
  if (!state[key]) {
    let migrated = false;

    // ۱) حالت قدیمی "w:word"
    if (w && typeof w.word === "string") {
      const legacyKey1 = `w:${w.word}`;
      if (state[legacyKey1]) {
        state[key] = state[legacyKey1];
        delete state[legacyKey1];
        migrated = true;
      }
    }

    // ۲) حالت قدیمی id خالی
    if (!migrated && w && typeof w.id !== "undefined") {
      const legacyKey2 = String(w.id);
      if (state[legacyKey2]) {
        state[key] = state[legacyKey2];
        delete state[legacyKey2];
        migrated = true;
      }
    }

    // اگر هیچ نسخهٔ قدیمی نبود → حالت جدید
    if (!migrated) {
      state[key] = defaultWordState();
    }
  }

  const s = state[key];

  // اگر قبلاً همه را hard=true ذخیره کرده بودیم ولی اصلاً دیده نشده
  if (s.seen === 0 && s.correct === 0 && s.wrong === 0 && s.hard) {
    s.hard = false;
  }

  return s;
}

// ===================== طبقه‌بندی لغت =====================
// فقط سه حالت: "new" | "hard" | "known"

function classifyWord(s) {
  if (!s) return "new";

  // کاملاً جدید
  if (s.seen === 0) return "new";

  // هر لغتی که حداقل یک‌بار غلط خورده یا عمداً سخت شده → سخت
  if (s.hard || s.wrong >= 1) return "hard";

  // اگر حداقل یک‌بار درست جواب داده شده و غلطی هم نخورده → بلد
  if (s.correct >= 1 && s.wrong === 0) return "known";

  // بقیه را جدید حساب کنیم
  return "new";
}

// ===================== به‌روزرسانی SRS =====================
// الگوریتم ساده‌شده‌ی SM-2

function updateSRSState(s, grade) {
  // grade: از 0 تا 5
  // در پروژه ما:
  // 5 = بلد بودم
  // 2 = بلد نبودم / سخت

  const now = Date.now();

  if (grade >= 3) {
    // پاسخ خوب
    if (s.reps === 0) {
      s.interval = 1; // ۱ روز
    } else if (s.reps === 1) {
      s.interval = 3; // ۳ روز
    } else {
      s.interval = Math.round(s.interval * s.ef);
    }
    s.reps += 1;

    const newEf =
      s.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    s.ef = Math.max(1.3, Math.min(newEf, 2.8));
  } else {
    // پاسخ ضعیف
    s.reps = 0;
    s.interval = 1;
    s.ef = Math.max(1.3, s.ef - 0.2);
  }

  s.nextReview = now + s.interval * 24 * 60 * 60 * 1000;
  s.lastSeen = now;
}
