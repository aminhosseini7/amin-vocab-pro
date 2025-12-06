// ---------------------------
// Grammar Learning Path – Dashboard + AI
// ---------------------------

// کارت تعیین سطح
const placementDone = localStorage.getItem("placement_done");
const placementCard = document.getElementById("placement-card");
const placementBtn = document.getElementById("placement-btn");

if (!placementDone) {
  // اگر کاربر هنوز آزمون تعیین سطح را انجام نداده
  if (placementCard) placementCard.style.display = "block";
} else {
  if (placementCard) placementCard.style.display = "none";
}

if (placementBtn) {
  placementBtn.addEventListener("click", () => {
    window.location.href = "grammar-placement.html";
  });
}

// آدرس بک‌اند شما (همانی که روی Vercel ساختیم)
const API_URL = "https://grammar-backend.vercel.app/api/grammar";

// سطح پیش‌فرض (در صورت نبودن، B1)
let userLevel = localStorage.getItem("grammar_level") || "B1";

// المان‌ها
const userLevelEl = document.getElementById("user-level");
const levelDescEl = document.getElementById("level-desc");
const lessonBoxEl = document.getElementById("lesson-box");
const practiceStatusEl = document.getElementById("practice-status");
const aiResultEl = document.getElementById("ai-result");
const statTotalEl = document.getElementById("stat-total");
const statTodayEl = document.getElementById("stat-today");
const statLastDateEl = document.getElementById("stat-last-date");
const weakPointsListEl = document.getElementById("weak-points-list");
const historyListEl = document.getElementById("history-list");

// نمایش سطح
if (userLevelEl) userLevelEl.textContent = userLevel;

const levelDescriptions = {
  "A2": "نیاز به یادگیری پایه‌های جمله‌سازی و زمان‌های ساده.",
  "B1": "سطح متوسط – نیاز به تقویت زمان‌ها، جملات مرکب و دقت گرامری.",
  "B2": "نوشتن روان – تمرکز روی ساختارهای پیچیده‌تر و دقت بالا.",
  "C1": "پیشرفته – تمرکز روی نوشتن آکادمیک و سبک‌سازی.",
};
if (levelDescEl) {
  levelDescEl.textContent = levelDescriptions[userLevel] || "";
}

// ---------------------------
// ساختار آمار و تاریخچه در LocalStorage
// ---------------------------

const STATS_KEY = "grammar_stats_v1";
const HISTORY_KEY = "grammar_history_v1";

// خواندن آمار
function loadStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (!raw) {
    return {
      totalChecks: 0,
      todayChecks: 0,
      lastDate: null,
      // شمارش خطاها بر اساس دسته‌بندی ساده
      categories: {
        tense: 0,
        sv: 0,
        prep: 0,
        article: 0,
        wordOrder: 0,
        other: 0,
      },
    };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {
      totalChecks: 0,
      todayChecks: 0,
      lastDate: null,
      categories: {
        tense: 0,
        sv: 0,
        prep: 0,
        article: 0,
        wordOrder: 0,
        other: 0,
      },
    };
  }
}

// ذخیره آمار
function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// خواندن تاریخچه
function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// ذخیره تاریخچه
function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

let stats = loadStats();
let history = loadHistory();

// ---------------------------
// کمک‌تابع‌ها
// ---------------------------

// گرفتن تاریخ امروز به شکل YYYY-MM-DD
function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// طبقه‌بندی خطاها بر اساس متن توضیح انگلیسی/فارسی
function categorizeError(errorsFa, errorsEn) {
  const fa = (errorsFa || "").toLowerCase();
  const en = (errorsEn || "").toLowerCase();

  if (
    en.includes("tense") ||
    en.includes("present simple") ||
    en.includes("present perfect") ||
    en.includes("past simple") ||
    en.includes("continuous") ||
    fa.includes("زمان فعل")
  ) {
    return "tense";
  }

  if (
    en.includes("subject-verb agreement") ||
    en.includes("plural") ||
    en.includes("singular") ||
    fa.includes("فعل جمع") ||
    fa.includes("فعل مفرد")
  ) {
    return "sv";
  }

  if (
    en.includes("preposition") ||
    en.includes("in ") ||
    en.includes("on ") ||
    en.includes("at ") ||
    fa.includes("حرف اضافه")
  ) {
    return "prep";
  }

  if (
    en.includes("article") ||
    en.includes("a/an") ||
    en.includes("the ") ||
    fa.includes("حرف تعریف")
  ) {
    return "article";
  }

  if (
    en.includes("word order") ||
    fa.includes("ترتیب کلمات")
  ) {
    return "wordOrder";
  }

  return "other";
}

// نام فارسی دسته‌ها
const CATEGORY_LABELS = {
  tense: "زمان‌ها (Tenses)",
  sv: "تطابق فاعل و فعل (Subject–Verb Agreement)",
  prep: "حرف اضافه (Prepositions)",
  article: "حروف تعریف (Articles)",
  wordOrder: "ترتیب کلمات (Word Order)",
  other: "سایر خطاها",
};

// ---------------------------
// به‌روزرسانی UI آمار و نقاط ضعف و تاریخچه
// ---------------------------

function updateStatsUI() {
  if (statTotalEl) statTotalEl.textContent = stats.totalChecks;
  if (statTodayEl) statTodayEl.textContent = stats.todayChecks;
  if (statLastDateEl) statLastDateEl.textContent = stats.lastDate || "-";

  // ساخت لیست نقاط ضعف
  const items = Object.entries(stats.categories)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]); // بیشترین خطا در بالا

  if (!weakPointsListEl) return;

  weakPointsListEl.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "هنوز داده‌ای برای تحلیل وجود ندارد. چند جمله بنویس تا خطاها تحلیل شوند.";
    weakPointsListEl.appendChild(li);
    return;
  }

  for (const [cat, count] of items) {
    const li = document.createElement("li");
    const label = CATEGORY_LABELS[cat] || cat;
    li.textContent = `${label}: ${count} خطا`;
    weakPointsListEl.appendChild(li);
  }
}

function updateHistoryUI() {
  if (!historyListEl) return;

  historyListEl.innerHTML = "";

  if (history.length === 0) {
    historyListEl.textContent = "هنوز جمله‌ای ثبت نشده است.";
    return;
  }

  // آخرین ۳۰ مورد
  const recent = history.slice(-30).reverse();

  for (const item of recent) {
    const div = document.createElement("div");
    div.className = "history-item";

    const orig = document.createElement("div");
    orig.className = "orig";
    orig.textContent = "جمله شما: " + item.text;

    const corr = document.createElement("div");
    corr.className = "corr";
    corr.textContent = "تصحیح: " + item.corrected;

    const cat = document.createElement("div");
    cat.className = "cat";
    const label = CATEGORY_LABELS[item.category] || "نامشخص";
    cat.textContent = "دسته خطا: " + label;

    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.textContent = "تاریخ: " + (item.date || "-");

    div.appendChild(orig);
    div.appendChild(corr);
    div.appendChild(cat);
    div.appendChild(dateEl);

    historyListEl.appendChild(div);
  }
}

// بارگذاری UI اولیه
updateStatsUI();
updateHistoryUI();

// ---------------------------
// تولید درس روزانه ساده (بعداً می‌توانیم AIی‌اش کنیم)
// ---------------------------

function generateLesson(level) {
  if (level === "A2") {
    return `درس امروز (A2):
- Present Simple و Present Continuous
- مثال:
  I play football.
  I am playing football.
- نکته: برای کاری که همین الان در حال انجام است، از am/is/are + فعل ing استفاده کن.`;
  }

  if (level === "B1") {
    return `درس امروز (B1):
- Present Perfect vs Present Perfect Continuous
- مثال:
  I have lived here for 5 years.
  I have been living here for 5 years.
- نکته: برای مدت زمان از for و برای نقطهٔ شروع از since استفاده کن.`;
  }

  if (level === "B2") {
    return `درس امروز (B2):
- جملات موصولی (Relative clauses: who / which / that)
- مثال:
  The book that I bought yesterday was great.
- نکته: از that می‌توانی برای توصیف اشیا و افراد استفاده کنی.`;
  }

  return `درس امروز (پیشرفته – C1):
- Linking words: however, although, moreover, in addition
- تمرکز: نوشتن متن‌های آکادمیک با ساختار منسجم.`;
}

// شروع تمرین روزانه
const startPracticeBtn = document.getElementById("start-practice");
if (startPracticeBtn) {
  startPracticeBtn.addEventListener("click", () => {
    const lesson = generateLesson(userLevel);
    if (lessonBoxEl) {
      lessonBoxEl.textContent = lesson;
    }
    if (practiceStatusEl) {
      practiceStatusEl.textContent = "تمرین امروز فعال شد ✔";
    }
  });
}

// ---------------------------
// بررسی جمله با هوش مصنوعی
// ---------------------------

const checkBtn = document.getElementById("check-btn");
if (checkBtn) {
  checkBtn.addEventListener("click", async () => {
    const textArea = document.getElementById("user-sentence");
    const text = textArea ? textArea.value.trim() : "";

    if (!text) return;

    if (aiResultEl) aiResultEl.textContent = "در حال تحلیل...";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text, level: userLevel }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        if (aiResultEl) {
          aiResultEl.textContent =
            "خطا در پاسخ سرور:\n" + JSON.stringify(data, null, 2);
        }
        return;
      }

      const resultText = `
جملهٔ تصحیح‌شده:
${data.corrected}

توضیح خطاها (فارسی):
${data.errors_explained_fa}

Explanation (English):
${data.errors_explained_en}

مثال‌های پیشنهادی:
${Array.isArray(data.examples) ? data.examples.join("\n") : ""}

تمرین پیشنهادی:
${data.suggested_practice}
      `.trim();

      if (aiResultEl) aiResultEl.textContent = resultText;

      // به‌روزرسانی آمار
      const today = todayStr();

      stats.totalChecks += 1;
      if (stats.lastDate === today) {
        stats.todayChecks += 1;
      } else {
        stats.todayChecks = 1;
        stats.lastDate = today;
      }

      const cat = categorizeError(
        data.errors_explained_fa,
        data.errors_explained_en
      );
      if (!stats.categories[cat]) {
        stats.categories[cat] = 0;
      }
      stats.categories[cat] += 1;

      saveStats(stats);

      // ثبت در تاریخچه
      history.push({
        text,
        corrected: data.corrected,
        category: cat,
        date: today,
      });
      // فقط آخرین 100 تا را نگه داریم
      if (history.length > 100) {
        history = history.slice(history.length - 100);
      }
      saveHistory(history);

      // به‌روزرسانی UI
      updateStatsUI();
      updateHistoryUI();

    } catch (e) {
      if (aiResultEl) {
        aiResultEl.textContent =
          "ارتباط با سرور یا اینترنت ناموفق بود. بعداً دوباره تلاش کن.";
      }
    }
  });
}
