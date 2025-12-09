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
  // ترجیحاً بر اساس id، اگر نبود، بر اساس خود کلمه
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

// state یک آبجکت گلوبال است که در storage.js لود می‌شود
function getWordState(state, w) {
  const key = wordKeyFromObj(w);
  if (!state[key]) {
    state[key] = defaultWordState();
  }

  const s = state[key];

  // مایگریشن: اگر قبلاً باگ داشتیم و همه را hard=true ذخیره کرده بودیم
  // ولی هنوز اصلاً دیده نشده‌اند، اینجا آن را اصلاح می‌کنیم.
  if (s.seen === 0 && s.correct === 0 && s.wrong === 0 && s.hard) {
    s.hard = false;
  }

  return s;
}

// ===================== طبقه‌بندی لغت =====================
// خروجی: "new" | "hard" | "known" | "learning"

function classifyWord(s) {
  if (!s) return "new";

  // لغت کاملاً جدید
  if (s.seen === 0) return "new";

  // اگر کاربر خودش hard را زده یا زیاد خطا داشته
  if (s.hard || s.wrong >= 2) return "hard";

  // اگر چند بار درست پشت سر هم جواب داده
  if (s.correct >= 3 && s.wrong === 0) return "known";

  // بقیه در حال یادگیری
  return "learning";
}

// ===================== به‌روزرسانی SRS =====================
// الگوریتم ساده‌شده‌ی SM-2

function updateSRSState(s, grade) {
  // grade: از 0 تا 5 – در این پروژه:
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
