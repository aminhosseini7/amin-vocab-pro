// ===============================
// ابزارهای مشترک
// ===============================

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ---------------------------
// وضعیت آزمون تعیین سطح (Placement)
// ---------------------------

const placementDone = localStorage.getItem("placement_done");
const placementCard = document.getElementById("placement-card");
const placementBtn = document.getElementById("placement-btn");

if (placementCard) {
  placementCard.style.display = placementDone ? "none" : "block";
}

if (placementBtn) {
  placementBtn.addEventListener("click", () => {
    window.location.href = "grammar-placement.html";
  });
}

// ---------------------------
// سکشن آزمون روزانه
// ---------------------------

const dailyTestStatusEl = document.getElementById("daily-test-status");
const dailyTestBtn = document.getElementById("daily-test-btn");

const today = todayStr();
const dailyTestDate = localStorage.getItem("daily_test_date");
const dailyFocusTopic = localStorage.getItem("daily_focus_topic");
const hasTodayFocus = dailyTestDate === today && !!dailyFocusTopic;

const DAILY_FOCUS_LABELS = {
  tense: "زمان‌ها (Tenses – مثل گذشته ساده، حال کامل و ...)",
  sv: "تطابق فاعل و فعل (He goes / They go و ...)",
  prep: "حروف اضافه (in / on / at / for / since و ...)",
  article: "حروف تعریف (a / an / the و ...)",
  wordOrder: "ترتیب کلمات در جمله (جای قیدها، فاعل، فعل و ...)",
  general: "مرور کلی گرامر (زمان‌ها + حروف اضافه + ساختارهای پایه)."
};

if (dailyTestStatusEl) {
  if (hasTodayFocus) {
    let txt = "آزمون روزانهٔ امروز را انجام داده‌ای.";
    if (DAILY_FOCUS_LABELS[dailyFocusTopic]) {
      txt += " تمرکز پیشنهادی امروز: " + DAILY_FOCUS_LABELS[dailyFocusTopic];
    }
    dailyTestStatusEl.textContent = txt;
  } else {
    dailyTestStatusEl.textContent =
      "هنوز آزمون امروز را نداده‌ای. با یک تست ۵ سؤالی، مبحث مناسب امروز انتخاب می‌شود.";
  }
}

if (dailyTestBtn) {
  dailyTestBtn.addEventListener("click", () => {
    window.location.href = "grammar-daily-test.html";
  });
}

// ---------------------------
// سطح کاربر و توضیح سطح
// ---------------------------

const API_URL = "https://grammar-backend.vercel.app/api/grammar";

let userLevel = localStorage.getItem("grammar_level") || "B1";

const userLevelEl = document.getElementById("user-level");
const levelDescEl = document.getElementById("level-desc");

if (userLevelEl) userLevelEl.textContent = userLevel;

const levelDescriptions = {
  A2: "سطح پایه – نیاز به یادگیری ساختار جمله و زمان‌های ساده.",
  B1: "سطح متوسط – نیاز به تقویت زمان‌ها و جمله‌سازی.",
  B2: "سطح نسبتا پیشرفته – نیاز به ساختارهای پیچیده‌تر.",
  C1: "سطح پیشرفته – تمرکز روی نوشتن آکادمیک و ظرافت‌های گرامری."
};

if (levelDescEl) {
  levelDescEl.textContent = levelDescriptions[userLevel] || "";
}

// ---------------------------
// آمار و تاریخچه در LocalStorage
// ---------------------------

const STATS_KEY = "grammar_stats_v1";
const HISTORY_KEY = "grammar_history_v1";

function loadStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (!raw) {
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
        other: 0
      }
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
        other: 0
      }
    };
  }
}

function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

let stats = loadStats();
let history = loadHistory();

// ---------------------------
// دسته‌بندی نوع خطا
// ---------------------------

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
    en.includes(" in ") ||
    en.includes(" on ") ||
    en.includes(" at ") ||
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

  if (en.includes("word order") || fa.includes("ترتیب کلمات")) {
    return "wordOrder";
  }

  return "other";
}

const CATEGORY_LABELS = {
  tense: "زمان‌ها (Tenses)",
  sv: "تطابق فاعل و فعل (Subject–Verb Agreement)",
  prep: "حرف اضافه (Prepositions)",
  article: "حروف تعریف (Articles)",
  wordOrder: "ترتیب کلمات (Word Order)",
  other: "سایر خطاها"
};

// ---------------------------
// به‌روزرسانی UI آمار و تاریخچه
// ---------------------------

const statTotalEl = document.getElementById("stat-total");
const statTodayEl = document.getElementById("stat-today");
const statLastDateEl = document.getElementById("stat-last-date");
const weakPointsListEl = document.getElementById("weak-points-list");
const historyListEl = document.getElementById("history-list");

function updateStatsUI() {
  if (statTotalEl) statTotalEl.textContent = stats.totalChecks;
  if (statTodayEl) statTodayEl.textContent = stats.todayChecks;
  if (statLastDateEl) statLastDateEl.textContent = stats.lastDate || "-";

  if (!weakPointsListEl) return;

  weakPointsListEl.innerHTML = "";

  const items = Object.entries(stats.categories)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent =
      "هنوز داده‌ای برای تحلیل وجود ندارد. چند جمله بنویس تا خطاها تحلیل شوند.";
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

updateStatsUI();
updateHistoryUI();

// ---------------------------
// درس امروز بر اساس سطح + نتیجه آزمون روزانه
// ---------------------------

const lessonBoxEl = document.getElementById("lesson-box");
const practiceStatusEl = document.getElementById("practice-status");

function generateLesson(level, focusTopic) {
  if (!focusTopic || focusTopic === "general") {
    // فقط براساس سطح
    if (level === "A2") {
      return `درس امروز (A2 – مرور کلی):
- Present Simple و Present Continuous
- مثال:
  I play football.
  I am playing football.
- تمرین: ۵ جمله دربارهٔ روتین روزانه‌ات با Present Simple بنویس،
  و ۳ جمله دربارهٔ کارهایی که «الان» انجام می‌دهی با Present Continuous.`;
    }
    if (level === "B1") {
      return `درس امروز (B1 – مرور کلی):
- Present Perfect vs Past Simple
- مثال:
  I have lived here for 5 years.
  I moved here in 2019.
- تمرین: ۵ جمله دربارهٔ تجربه‌هایت با Present Perfect بنویس،
  و ۵ جمله با Past Simple.`;
    }
    if (level === "B2") {
      return `درس امروز (B2 – مرور کلی):
- Relative Clauses (who / which / that)
- تمرین: ۵ جمله بساز که در آن‌ها از who / which / that استفاده کنی.`;
    }
    return `درس امروز (C1 – مرور کلی):
- Linking words: however, although, moreover, in addition
- تمرین: یک پاراگراف ۶–۸ جمله‌ای بنویس و حداقل از ۵ linking word مختلف استفاده کن.`;
  }

  // فوکوس از آزمون روزانه
  if (focusTopic === "tense") {
    return `🎯 تمرکز امروز: زمان‌ها (Tenses)

- یادآوری:
  Present Simple: I work / She works
  Past Simple: I worked
  Present Perfect: I have worked
  Present Perfect Continuous: I have been working

- تمرین پیشنهادی:
  1) ۳ جمله با Present Simple دربارهٔ روتین روزانه‌ات بنویس.
  2) ۳ جمله با Past Simple دربارهٔ دیروزت بنویس.
  3) ۳ جمله با Present Perfect یا Present Perfect Continuous دربارهٔ تجربه‌هایت بنویس.`;
  }

  if (focusTopic === "sv") {
    return `🎯 تمرکز امروز: تطابق فاعل و فعل (Subject–Verb Agreement)

- نکته:
  I/you/we/they → فعل بدون s
  he/she/it → فعل با s

- تمرین پیشنهادی:
  1) ۱۰ جمله بنویس که نیمی از آن‌ها با he/she/it و نیمی با I/you/we/they باشد.
  2) دقت کن فعل‌ها در هر جمله درست باشند (با s / بدون s).`;
  }

  if (focusTopic === "prep") {
    return `🎯 تمرکز امروز: حروف اضافه (Prepositions – in / on / at / for / since)

- مثال:
  in 1995, in July, in the morning
  on Monday, on my birthday
  at 5 o'clock, at night
  for three years, since 2020

- تمرین پیشنهادی:
  1) ۵ جمله با in بنویس.
  2) ۵ جمله با on بنویس.
  3) ۵ جمله با for / since بنویس و تفاوت آن‌ها را حس کن.`;
  }

  if (focusTopic === "article") {
    return `🎯 تمرکز امروز: حروف تعریف (Articles – a / an / the / zero article)

- نکات:
  a + اسم مفرد: a car
  an + اسم مفرد با صدای vowel: an apple
  the وقتی قبلاً از چیزی صحبت کرده‌ایم یا مشخص است.

- تمرین پیشنهادی:
  1) ۱۰ اسم انتخاب کن و یک جمله با a/an برای هرکدام بنویس.
  2) ۵ جمله بنویس که جملهٔ دوم با the به همان چیز اشاره کند.`;
  }

  if (focusTopic === "wordOrder") {
    return `🎯 تمرکز امروز: ترتیب کلمات (Word Order)

- الگو:
  Subject + (Adverb of frequency) + Verb
  I always get up at 7.
  She usually goes to work by bus.

- تمرین پیشنهادی:
  1) ۱۰ جمله بنویس که در آن‌ها از always / usually / often / sometimes / never استفاده کنی.
  2) قید را در جای درست (قبل از فعل اصلی) قرار بده.`;
  }

  return `درس امروز (مرور کلی):
- چند موضوع اصلی گرامر را مرور کن: زمان‌ها، حروف اضافه و ساختار جمله.
- چند جمله بنویس و با بخش «جمله بنویس» در همین صفحه تصحیح کن.`;
}

// دکمه شروع تمرین روزانه
const startPracticeBtn = document.getElementById("start-practice");
if (startPracticeBtn) {
  startPracticeBtn.addEventListener("click", () => {
    const lesson = generateLesson(userLevel, hasTodayFocus ? dailyFocusTopic : null);
    if (lessonBoxEl) {
      lessonBoxEl.textContent = lesson;
    }
    if (practiceStatusEl) {
      if (hasTodayFocus && DAILY_FOCUS_LABELS[dailyFocusTopic]) {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس نتیجهٔ آخرین آزمون روزانه تنظیم شد (" +
          DAILY_FOCUS_LABELS[dailyFocusTopic] +
          ").";
      } else {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس سطح کلی فعلی شما تنظیم شد.";
      }
    }
  });
}

// ---------------------------
// بخش «جمله بنویس» و اتصال به بک‌اند هوش مصنوعی
// ---------------------------

const checkBtn = document.getElementById("check-btn");
const aiResultEl = document.getElementById("ai-result");

if (checkBtn) {
  checkBtn.addEventListener("click", async () => {
    const textArea = document.getElementById("user-sentence");
    const text = textArea ? textArea.value.trim() : "";
    if (!text) return;

    if (aiResultEl) aiResultEl.textContent = "در حال تحلیل...";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level: userLevel })
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

      const todayLocal = todayStr();

      stats.totalChecks += 1;
      if (stats.lastDate === todayLocal) {
        stats.todayChecks += 1;
      } else {
        stats.todayChecks = 1;
        stats.lastDate = todayLocal;
      }

      const cat = categorizeError(
        data.errors_explained_fa,
        data.errors_explained_en
      );
      if (!stats.categories[cat]) stats.categories[cat] = 0;
      stats.categories[cat] += 1;

      saveStats(stats);

      history.push({
        text,
        corrected: data.corrected,
        category: cat,
        date: todayLocal
      });
      if (history.length > 100) {
        history = history.slice(history.length - 100);
      }
      saveHistory(history);

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
