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

function wordKeyFromObj(w) {
  // ترجیح: id اگر وجود داشت، وگرنه خود کلمه
  if (w && typeof w.id !== "undefined") return String(w.id);
  if (w && typeof w.word === "string") return `w:${w.word}`;
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

// state در storage.js لود می‌شود
function getWordState(state, w) {
  const key = wordKeyFromObj(w);
  if (!state[key]) {
    state[key] = defaultWordState();
  }

  const s = state[key];

  // مایگریشن باگ‌های قدیمی:
  // اگر قبلاً همه را hard=true ذخیره کرده بودیم
  // ولی هنوز اصلاً دیده نشده‌اند، اینجا اصلاح می‌کنیم.
  if (s.seen === 0 && s.correct === 0 && s.wrong === 0 && s.hard) {
    s.hard = false;
  }

  return s;
}

// ===================== طبقه‌بندی لغت =====================
// فقط سه حالت: "new" | "hard" | "known"
// «در حال یادگیری» حذف شد

function classifyWord(s) {
  if (!s) return "new";

  // کاملاً جدید
  if (s.seen === 0) return "new";

  // هر لغتی که حداقل یک‌بار غلط زده شده
  // یا عمداً hard علامت شده → سخت
  if (s.hard || s.wrong >= 1) return "hard";

  // اگر حداقل یک‌بار درست جواب داده شده و غلطی هم نخورده → بلد
  if (s.correct >= 1 && s.wrong === 0) return "known";

  // حالت‌های مرزی را هم به عنوان جدید در نظر بگیر
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
    // پاسخ نسبتاً خوب
    if (s.reps === 0) {
      s.interval = 1; // ۱ روز
    } else if (s.reps === 1) {
      s.interval = 3; // ۳ روز
    } else {
      s.interval = Math.round(s.interval * s.ef);
    }
    s.reps += 1;

    // به‌روزرسانی EF
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
