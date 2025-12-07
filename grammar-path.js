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

function daysBetween(d1, d2) {
  if (!d1 || !d2) return 0;
  const [y1, m1, day1] = d1.split("-").map(Number);
  const [y2, m2, day2] = d2.split("-").map(Number);
  const dt1 = new Date(y1, m1 - 1, day1);
  const dt2 = new Date(y2, m2 - 1, day2);
  const diffMs = dt2 - dt1;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
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

const dailyFocusTopic = localStorage.getItem("daily_focus_topic");
const hasFocusTopic = !!dailyFocusTopic;
const lastDailyDate = localStorage.getItem("daily_test_date");

const DAILY_FOCUS_LABELS = {
  tense: "زمان‌ها (Tenses – مثل گذشته ساده، حال کامل و ...)",
  sv: "تطابق فاعل و فعل (He goes / They go و ...)",
  prep: "حروف اضافه (in / on / at / for / since و ...)",
  article: "حروف تعریف (a / an / the و ...)",
  wordOrder: "ترتیب کلمات در جمله (جای قیدها، فاعل، فعل و ...)",
  general: "مرور کلی گرامر (زمان‌ها + حروف اضافه + ساختارهای پایه)."
};

if (dailyTestStatusEl) {
  if (hasFocusTopic) {
    let txt = "آخرین آزمون روزانه را انجام داده‌ای.";
    if (lastDailyDate) {
      txt += ` (تاریخ: ${lastDailyDate})`;
    }
    if (DAILY_FOCUS_LABELS[dailyFocusTopic]) {
      txt += " – تمرکز پیشنهادی: " + DAILY_FOCUS_LABELS[dailyFocusTopic];
    }
    dailyTestStatusEl.textContent = txt;
  } else {
    dailyTestStatusEl.textContent =
      "هنوز آزمون روزانه‌ای ذخیره نشده. با یک تست ۵ سؤالی، مبحث مناسب برای تمرین انتخاب می‌شود.";
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
// آمار، استریک، تاریخچه در LocalStorage
// ---------------------------

const STATS_KEY = "grammar_stats_v1";
const HISTORY_KEY = "grammar_history_v1";

function createEmptyStats() {
  return {
    totalChecks: 0,
    todayChecks: 0,
    lastDate: null,
    points: 0,
    streakCurrent: 0,
    streakBest: 0,
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

function normalizeStats(obj) {
  const base = createEmptyStats();
  if (!obj || typeof obj !== "object") return base;

  base.totalChecks = typeof obj.totalChecks === "number" ? obj.totalChecks : 0;
  base.todayChecks = typeof obj.todayChecks === "number" ? obj.todayChecks : 0;
  base.lastDate = obj.lastDate || null;
  base.points = typeof obj.points === "number" ? obj.points : 0;
  base.streakCurrent =
    typeof obj.streakCurrent === "number" ? obj.streakCurrent : 0;
  base.streakBest = typeof obj.streakBest === "number" ? obj.streakBest : 0;

  const cats = obj.categories || {};
  for (const key of Object.keys(base.categories)) {
    base.categories[key] =
      typeof cats[key] === "number" ? cats[key] : 0;
  }

  return base;
}

function loadStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (!raw) {
    return createEmptyStats();
  }
  try {
    const obj = JSON.parse(raw);
    return normalizeStats(obj);
  } catch {
    return createEmptyStats();
  }
}

function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
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
// به‌روزرسانی UI آمار، استریک، نقاط ضعف، تاریخچه
// ---------------------------

const statTotalEl = document.getElementById("stat-total");
const statTodayEl = document.getElementById("stat-today");
const statLastDateEl = document.getElementById("stat-last-date");
const weakPointsListEl = document.getElementById("weak-points-list");
const historyListEl = document.getElementById("history-list");
const streakCurrentEl = document.getElementById("streak-current");
const streakBestEl = document.getElementById("streak-best");
const grammarPointsEl = document.getElementById("grammar-points");

function updateStatsUI() {
  if (statTotalEl) statTotalEl.textContent = stats.totalChecks;
  if (statTodayEl) statTodayEl.textContent = stats.todayChecks;
  if (statLastDateEl) statLastDateEl.textContent = stats.lastDate || "-";
  if (streakCurrentEl) streakCurrentEl.textContent = stats.streakCurrent || 0;
  if (streakBestEl) streakBestEl.textContent = stats.streakBest || 0;
  if (grammarPointsEl) grammarPointsEl.textContent = stats.points || 0;

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

  const totalErrors = items.reduce((sum, [, c]) => sum + c, 0);

  items.forEach(([cat, count], index) => {
    const li = document.createElement("li");
    const label = CATEGORY_LABELS[cat] || cat;
    const ratio =
      stats.totalChecks > 0
        ? Math.round((count / stats.totalChecks) * 100)
        : Math.round((count / totalErrors) * 100);

    li.classList.add("weak-item");
    if (index === 0) li.classList.add("weak-top");

    const row = document.createElement("div");
    row.className = "weak-row";

    const nameSpan = document.createElement("span");
    nameSpan.className = "weak-name";
    nameSpan.textContent = label;

    const countSpan = document.createElement("span");
    countSpan.className = "weak-count";
    countSpan.textContent = `${count} خطا (${ratio}٪)`;

    row.appendChild(nameSpan);
    row.appendChild(countSpan);

    const bar = document.createElement("div");
    bar.className = "weak-bar";

    const barFill = document.createElement("div");
    barFill.className = "weak-bar-fill";
    barFill.style.width = `${Math.min(ratio, 100)}%`;

    bar.appendChild(barFill);

    li.appendChild(row);
    li.appendChild(bar);
    weakPointsListEl.appendChild(li);
  });
}

function updateHistoryUI() {
  if (!historyListEl) return;

  historyListEl.innerHTML = "";

  if (history.length === 0) {
    historyListEl.textContent = "هنوز جمله‌ای ثبت نشده است.";
    return;
  }

  const recent = history.slice(-150).reverse();

  for (const item of recent) {
    const div = document.createElement("div");
    const catKey = item.category || "other";
    const label = CATEGORY_LABELS[catKey] || "نامشخص";

    div.className = "history-item";
    if (catKey === "tense") div.classList.add("cat-tense");
    else if (catKey === "sv") div.classList.add("cat-sv");
    else if (catKey === "prep") div.classList.add("cat-prep");
    else if (catKey === "article") div.classList.add("cat-article");
    else if (catKey === "wordOrder") div.classList.add("cat-wordOrder");

    const header = document.createElement("div");
    header.className = "history-header";

    const badge = document.createElement("span");
    badge.className = "history-badge";
    badge.textContent = label;

    const dateEl = document.createElement("div");
    dateEl.className = "history-date";
    dateEl.textContent = item.date || "-";

    header.appendChild(badge);
    header.appendChild(dateEl);

    const body = document.createElement("div");
    body.className = "history-body";

    const origLabel = document.createElement("div");
    origLabel.className = "history-label";
    origLabel.textContent = "جملهٔ شما:";

    const origText = document.createElement("div");
    origText.className = "history-text";
    origText.textContent = item.text;

    const corrLabel = document.createElement("div");
    corrLabel.className = "history-label";
    corrLabel.style.marginTop = "4px";
    corrLabel.textContent = "نسخهٔ تصحیح‌شده:";

    const corrText = document.createElement("div");
    corrText.className = "history-corrected";
    corrText.textContent = item.corrected;

    body.appendChild(origLabel);
    body.appendChild(origText);
    body.appendChild(corrLabel);
    body.appendChild(corrText);

    div.appendChild(header);
    div.appendChild(body);

    historyListEl.appendChild(div);
  }
}

updateStatsUI();
updateHistoryUI();

// ---------------------------
// ثبت یک چک جدید (هم برای آزاد، هم هدایت‌شده)
// ---------------------------

function registerCheck(text, corrected, errorsFa, errorsEn, source) {
  const todayLocal = todayStr();
  const prevDate = stats.lastDate;

  // استریک و todayChecks
  if (!prevDate) {
    stats.streakCurrent = 1;
    stats.streakBest = 1;
    stats.todayChecks = 1;
    stats.lastDate = todayLocal;
  } else if (prevDate === todayLocal) {
    stats.todayChecks += 1;
    // استریک همون مقدار قبلی می‌مونه
  } else {
    const diff = daysBetween(prevDate, todayLocal);
    if (diff === 1) {
      stats.streakCurrent = (stats.streakCurrent || 0) + 1;
    } else {
      stats.streakCurrent = 1;
    }
    if (!stats.streakBest || stats.streakCurrent > stats.streakBest) {
      stats.streakBest = stats.streakCurrent;
    }
    stats.todayChecks = 1;
    stats.lastDate = todayLocal;
  }

  // مجموع چک‌ها
  stats.totalChecks += 1;

  // امتیاز: آزاد ۵، هدایت‌شده ۸
  const basePoints = source === "guided" ? 8 : 5;
  stats.points = (stats.points || 0) + basePoints;

  // دسته خطا
  const cat = categorizeError(errorsFa, errorsEn);
  if (!stats.categories[cat]) stats.categories[cat] = 0;
  stats.categories[cat] += 1;

  // تاریخچه
  history.push({
    text,
    corrected,
    category: cat,
    date: todayLocal,
    source
  });
  if (history.length > 150) {
    history = history.slice(history.length - 150);
  }

  saveStats(stats);
  saveHistory(history);

  updateStatsUI();
  updateHistoryUI();
}

// ---------------------------
// درس امروز بر اساس سطح + آخرین آزمون روزانه (درسنامه متنی)
// ---------------------------

const lessonBoxEl = document.getElementById("lesson-box");
const practiceStatusEl = document.getElementById("practice-status");

function generateLesson(level, focusTopic) {
  // فوکوس‌های آزمون روزانه
  if (focusTopic === "tense") {
    return `🎯 مبحث امروز: زمان‌ها (Tenses – مخصوصاً Present Perfect vs Past Simple)

[۱] توضیح ساده:
- Past Simple: دربارهٔ یک عمل تمام‌شده در گذشته، با زمان مشخص.
  مثال: I moved to Tehran in 2019.
- Present Perfect: دربارهٔ تجربه یا اثری که تا الان ادامه دارد / نتیجه‌اش الان مهم است.
  مثال: I have lived in Tehran for 5 years.

الگو:
- Past Simple: Subject + V2 (went, saw, studied)
- Present Perfect: Subject + have/has + V3 (been, seen, studied)

[۲] مثال‌های درست و غلط:
- ❌ I have seen him yesterday.
- ✅ I saw him yesterday.
(چون "yesterday" زمان دقیق است، Past Simple می‌خواهیم.)

- ❌ I live here since 2020.
- ✅ I have lived here since 2020.

[۳] تمرین ۱ – تشخیص:
به این جملات فکر کن و تصمیم بگیر Past Simple بهتر است یا Present Perfect:
1) ... last year
2) ... three times in my life
3) ... in 2010
4) ... already

[۴] تمرین ۲ – تبدیل:
جملات زیر را یک‌بار با Past Simple و یک‌بار با Present Perfect بنویس:
- (a) I / live / here / 5 years
- (b) She / study / English / 2 years
- (c) We / visit / Paris / 3 times

[۵] تمرین ۳ – جمله‌نویسی:
۳ جمله دربارهٔ تجربه‌های زندگی‌ات با Present Perfect بنویس.
مثلاً:
I have visited ...
I have never ...
I have been ...

💡 پیشنهاد:
هر جمله‌ای که می‌نویسی را در تمرین هدایت‌شده یا بخش «📝 جمله بنویس» وارد کن و با هوش مصنوعی تصحیح کن.`;
  }

  if (focusTopic === "prep") {
    return `🎯 مبحث امروز: حروف اضافهٔ زمان و مکان (in / on / at / for / since)

[۱] خلاصه کاربرد:
- in: سال، ماه، فصل، زمان‌های کلی
  in 1995, in July, in the morning
- on: روز هفته، تاریخ، روز خاص
  on Monday, on 21st March, on my birthday
- at: ساعت، لحظه‌های خاص
  at 7 o'clock, at night, at the weekend (در بعضی لهجه‌ها)

- for: مدت زمان
  for three years, for a long time
- since: نقطه شروع زمان
  since 2020, since last week

[۲] مثال درست/غلط:
- ❌ I was born at 1995.
- ✅ I was born in 1995.

- ❌ I have lived here since three years.
- ✅ I have lived here for three years.
- ✅ I have lived here since 2020.

[۳] تمرین ۱ – جای خالی:
سعی کن جای خالی را با in / on / at / for / since پر کنی:
1) I was born ___ 1995.
2) She usually studies English ___ the evening.
3) We have been friends ___ ten years.
4) He has worked here ___ 2018.
5) The meeting is ___ Monday.

[۴] تمرین ۲ – جمله‌سازی:
۵ جمله با in, on, at دربارهٔ برنامه روزانه‌ات بنویس.
۳ جمله با for و since دربارهٔ چیزهایی که مدت‌دار هستند بنویس.

[۵] تمرین ۳ – جمله‌نویسی و تصحیح:
جملاتت را یکی‌یکی در تمرین هدایت‌شده یا بخش «📝 جمله بنویس» اضافه کن.`;
  }

  if (focusTopic === "sv") {
    return `🎯 مبحث امروز: تطابق فاعل و فعل (Subject–Verb Agreement)

[۱] قاعدهٔ پایه:
- I / you / we / they → فعل ساده (go, work, play)
- he / she / it → فعل + s (goes, works, plays)

مثال:
She works in a bank.
They work in a bank.

[۲] مثال درست/غلط:
- ❌ He go to school every day.
- ✅ He goes to school every day.

- ❌ They is very tired.
- ✅ They are very tired.

[۳] تمرین ۱ – انتخاب:
برای هر جمله یکی از فعل‌ها را انتخاب کن:
1) He (work / works) in a factory.
2) They (live / lives) in London.
3) My sister (study / studies) medicine.
4) I (want / wants) a coffee.

[۴] تمرین ۲ – بازنویسی:
جملات زیر را طوری بازنویسی کن که از نظر فاعل/فعل درست شوند:
1) She don’t like tea.
2) My friend live in Paris.
3) The students has an exam.

[۵] تمرین ۳ – جمله‌نویسی:
۵ جمله با he/she/it بنویس (همه با s)،
۵ جمله با I/you/we/they (بدون s).`;
  }

  if (focusTopic === "article") {
    return `🎯 مبحث امروز: حروف تعریف (Articles – a / an / the / صفر)

[۱] خلاصه:
- a: قبل از اسم مفرد قابل‌شمار، با صدای consonant
  a car, a book
- an: قبل از اسم مفرد قابل‌شمار، با صدای vowel
  an apple, an engineer
- the: وقتی چیز مشخص است یا قبلاً اشاره شده
  I bought a car. The car is red.
- صفر: وقتی به طور کلی صحبت می‌کنیم
  I like music. Life is short.

[۲] مثال درست/غلط:
- ❌ I have cat.
- ✅ I have a cat.
- ❌ She is an university student.
- ✅ She is a university student. (صدای you = consonant)

[۳] تمرین ۱ – انتخاب:
1) I saw ___ interesting movie.
2) ___ sun is very bright today.
3) He plays ___ guitar.
4) She is ___ honest person.

[۴] تمرین ۲ – بازنویسی:
جملات زیر را درست کن:
1) I bought new phone. Phone is very fast.
2) The life is hard.
3) I have an car.

[۵] تمرین ۳ – جمله‌نویسی:
۳ جمله با a/an،
۳ جمله با the،
۲ جمله بدون هیچ حرف تعریفی (مثل music, life, love).`;
  }

  if (focusTopic === "wordOrder") {
    return `🎯 مبحث امروز: ترتیب کلمات (Word Order – قیدهای بسامد)

[۱] الگوی پایه:
Subject + (Adverb of frequency) + Main Verb
I always get up at 7.
She usually goes to work by bus.

[۲] مثال درست/غلط:
- ❌ Always I am tired in the morning.
- ✅ I am always tired in the morning.

[۳] تمرین ۱ – جایگذاری قید:
قیدهای (always, usually, often, sometimes, never) را در جای درست بگذار:
1) I am tired in the morning. (always)
2) She goes to the gym after work. (usually)
3) They eat breakfast. (never)

[۴] تمرین ۲ – جمله‌سازی:
۵ جمله با always/usually/often/sometimes/never بنویس.

[۵] تمرین ۳ – جمله‌نویسی آزاد:
دو سه جملهٔ طولانی بنویس که در آن‌ها از دو قید مختلف استفاده کرده باشی.`;
  }

  // بدون فوکوس خاص → بر اساس سطح
  if (level === "A2") {
    return `📘 درس امروز (A2 – مرور کلی گرامر پایه)

[۱] ساختار جملهٔ ساده:
Subject + Verb + Object
I play football.
She likes tea.

[۲] دو زمان پایه:
- Present Simple: I work, She works
- Past Simple: I worked, She worked

[۳] تمرین:
1) ۵ جملهٔ ساده در زمان حال دربارهٔ روتین روزانه‌ات بنویس.
2) ۵ جملهٔ ساده در زمان گذشته دربارهٔ دیروزت بنویس.`;
  }

  if (level === "B1") {
    return `📘 درس امروز (B1 – Present Perfect vs Present Perfect Continuous)

[۱] توضیح:
- Present Perfect: روی نتیجه/تجربه تمرکز دارد.
  I have learned English for three years.
- Present Perfect Continuous: روی «فرایند» و مدت انجام کار تأکید دارد.
  I have been learning English for three years.

[۲] الگو:
- have/has + V3
- have/has + been + V-ing

[۳] مثال:
- I have read this book. (نتیجه: کتاب را تمام کرده‌ام)
- I have been reading this book all day. (فرایند: در حال خواندن بودم)

[۴] تمرین ۱ – تشخیص:
تصمیم بگیر برای هر موقعیت کدام زمان بهتر است:
1) تأکید روی «مدتِ کار خواندن»، نه تمام‌شدن آن.
2) تأکید روی این‌که «کار تمام شده» و الان اثرش مهم است.`;
  }

  if (level === "B2") {
    return `📘 درس امروز (B2 – Relative Clauses)

[۱] مفهوم:
از who/which/that برای توضیح بیشتر دربارهٔ اسم استفاده می‌کنیم.
مثال:
The man who lives next door is a doctor.
The book that I bought yesterday is interesting.`;
  }

  // C1 یا سایر
  return `📘 درس امروز (C1 – Linking Words & Style)

[۱] چند Linking word مهم:
however, although, in addition, moreover, nevertheless, on the other hand

[۲] تمرین:
۱) یک پاراگراف ۶–۸ جمله‌ای در مورد یک موضوع (مثلاً «یادگیری زبان انگلیسی») بنویس.
۲) سعی کن حداقل از ۴–۵ linking word مختلف استفاده کنی.`;
}

// ---------------------------
// برنامهٔ تمرین هدایت‌شده (step by step)
// ---------------------------

function buildGuidedPlan(level, focusTopic) {
  if (focusTopic === "tense") {
    return {
      title: "زمان‌ها – Past vs Present Perfect",
      steps: [
        {
          id: "tense_1",
          title: "Past Simple – زمان مشخص",
          instruction:
            "یک جمله دربارهٔ تجربه‌ای در گذشته بنویس که زمان آن مشخص است (yesterday, last year, in 2019 ...)\nمثال الهام‌بخش: I visited Istanbul last year."
        },
        {
          id: "tense_2",
          title: "Present Perfect – تجربهٔ کلی",
          instruction:
            "یک جمله دربارهٔ تجربه‌ای بنویس که مهم است تا الان چه‌کار کرده‌ای (بدون زمان دقیق).\nمثال: I have visited many countries."
        },
        {
          id: "tense_3",
          title: "Present Perfect – مدت زمان (for)",
          instruction:
            "یک جمله بنویس که در آن از for برای مدت زمان استفاده کنی.\nمثال: I have lived in Tehran for five years."
        },
        {
          id: "tense_4",
          title: "Present Perfect – نقطهٔ شروع (since)",
          instruction:
            "یک جمله بنویس که در آن از since برای نقطهٔ شروع استفاده کنی.\nمثال: I have worked here since 2020."
        }
      ]
    };
  }

  if (focusTopic === "prep") {
    return {
      title: "حروف اضافه – in / on / at / for / since",
      steps: [
        {
          id: "prep_1",
          title: "in + سال/ماه",
          instruction:
            "یک جمله بنویس که در آن از in + سال یا in + ماه استفاده‌شود.\nمثال: I was born in 1995."
        },
        {
          id: "prep_2",
          title: "برنامه روزانه با on/at",
          instruction:
            "یک جمله دربارهٔ برنامهٔ روزانه‌ات بنویس با on (روز) و at (ساعت).\nمثال: I go to the gym on Mondays at 7 p.m."
        },
        {
          id: "prep_3",
          title: "for – مدت زمان",
          instruction:
            "یک جمله بنویس که در آن از for برای مدت استفاده کنی.\nمثال: I have studied English for three years."
        },
        {
          id: "prep_4",
          title: "since – نقطه شروع",
          instruction:
            "یک جمله بنویس که در آن از since برای نقطهٔ شروع استفاده کنی.\nمثال: I have been here since 2020."
        }
      ]
    };
  }

  if (focusTopic === "sv") {
    return {
      title: "تطابق فاعل و فعل",
      steps: [
        {
          id: "sv_1",
          title: "he/she/it + s",
          instruction:
            "یک جمله با فاعل he/she/it بنویس که فعلش s بگیرد.\nمثال: She works in a bank."
        },
        {
          id: "sv_2",
          title: "I/you/we/they بدون s",
          instruction:
            "یک جمله با we یا they بنویس که فعل s نگیرد.\nمثال: They live in London."
        },
        {
          id: "sv_3",
          title: "ترکیبی مفرد + جمع",
          instruction:
            "یک جمله طولانی‌تر بنویس که هم فاعل مفرد داشته باشد هم جمع.\nمثال: My brother works in a bank and my parents live in another city."
        }
      ]
    };
  }

  if (focusTopic === "article") {
    return {
      title: "حروف تعریف – a/an/the",
      steps: [
        {
          id: "art_1",
          title: "a / an",
          instruction:
            "یک جمله با a یا an بنویس.\nمثال: I bought a new phone."
        },
        {
          id: "art_2",
          title: "a/an + the",
          instruction:
            "دو جمله پشت سر هم بنویس؛ اولی با a/an و دومی با the.\nمثال: I bought a car. The car is very fast."
        },
        {
          id: "art_3",
          title: "بدون حرف تعریف",
          instruction:
            "یک جمله دربارهٔ مفهوم کلی مثل life یا music بنویس.\nمثال: Life is beautiful."
        }
      ]
    };
  }

  if (focusTopic === "wordOrder") {
    return {
      title: "ترتیب کلمات و قیدهای بسامد",
      steps: [
        {
          id: "wo_1",
          title: "always / usually",
          instruction:
            "یک جمله بنویس که در آن از always یا usually در جای درست استفاده شود.\nمثال: I usually drink coffee in the morning."
        },
        {
          id: "wo_2",
          title: "never / sometimes",
          instruction:
            "یک جمله با never یا sometimes بنویس.\nمثال: I never eat fast food."
        },
        {
          id: "wo_3",
          title: "دو قید در یک جمله",
          instruction:
            "یک جمله طولانی‌تر بنویس که در آن از دو قید مختلف استفاده کرده باشی.\nمثال: I usually get up at 7, but I sometimes sleep until 9 on Fridays."
        }
      ]
    };
  }

  // بدون فوکوس خاص → طبق سطح
  if (level === "A2") {
    return {
      title: "جمله‌سازی پایه",
      steps: [
        {
          id: "A2_1",
          title: "حال ساده",
          instruction:
            "یک جمله ساده در زمان حال دربارهٔ روتین روزانه‌ات بنویس.\nمثال: I go to work at 8."
        },
        {
          id: "A2_2",
          title: "گذشته ساده",
          instruction:
            "یک جمله دربارهٔ دیروزت در زمان گذشته بنویس.\nمثال: I watched a movie yesterday."
        }
      ]
    };
  }

  if (level === "B1") {
    return {
      title: "Present Perfect / Continuous",
      steps: [
        {
          id: "B1_pp_1",
          title: "Present Perfect – تجربه",
          instruction:
            "یک جمله با Present Perfect دربارهٔ تجربه‌ای در زندگی‌ات بنویس.\nمثال: I have visited three countries."
        },
        {
          id: "B1_pp_2",
          title: "Present Perfect Continuous – مدت زمان",
          instruction:
            "یک جمله با Present Perfect Continuous دربارهٔ کاری که مدتی انجام می‌دهی بنویس.\nمثال: I have been studying English for three years."
        }
      ]
    };
  }

  if (level === "B2" || level === "C1") {
    return {
      title: "جملات پیچیده‌تر",
      steps: [
        {
          id: "B2_rel_1",
          title: "Relative Clause",
          instruction:
            "یک جمله بنویس که در آن از who/which/that استفاده کرده باشی.\nمثال: The book that I bought yesterday is very interesting."
        },
        {
          id: "B2_link_2",
          title: "Linking word",
          instruction:
            "یک جمله بنویس که در آن از however / although / in addition و... استفاده کنی.\nمثال: I was very tired; however, I finished my work."
        }
      ]
    };
  }

  // حالت عمومی
  return {
    title: "تمرین عمومی جمله‌نویسی",
    steps: [
      {
        id: "GEN_1",
        title: "جملهٔ آزاد",
        instruction:
          "یک جمله دربارهٔ امروزت بنویس. بعد با هوش مصنوعی آن را چک کن و ببین چه نکاتی می‌گوید."
      }
    ]
  };
}

// ---------------------------
// دکمه شروع تمرین روزانه + تمرین هدایت‌شده
// ---------------------------

const startPracticeBtn = document.getElementById("start-practice");

const guidedContainer = document.getElementById("guided-container");
const guidedHeader = document.getElementById("guided-header");
const guidedInstructionEl = document.getElementById("guided-instruction");
const guidedInput = document.getElementById("guided-input");
const guidedCheckBtn = document.getElementById("guided-check-btn");
const guidedResultEl = document.getElementById("guided-result");
const guidedNextBtn = document.getElementById("guided-next-btn");

let guidedPlan = null;
let guidedIndex = 0;

function renderGuidedStep() {
  if (!guidedContainer || !guidedPlan) return;
  const steps = guidedPlan.steps || [];
  if (!steps.length) {
    guidedContainer.style.display = "none";
    return;
  }

  const step = steps[guidedIndex];
  guidedContainer.style.display = "block";
  guidedHeader.textContent = `تمرین ${guidedIndex + 1} از ${
    steps.length
  } – ${step.title}`;
  guidedInstructionEl.textContent = step.instruction;
  guidedInput.value = "";
  guidedResultEl.textContent = "";
  guidedNextBtn.style.display = "none";
}

if (startPracticeBtn) {
  startPracticeBtn.addEventListener("click", () => {
    const lesson = generateLesson(
      userLevel,
      hasFocusTopic ? dailyFocusTopic : null
    );
    if (lessonBoxEl) {
      lessonBoxEl.textContent = lesson;
    }
    if (practiceStatusEl) {
      if (hasFocusTopic && DAILY_FOCUS_LABELS[dailyFocusTopic]) {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس نتیجهٔ آخرین آزمون روزانه تنظیم شد (" +
          DAILY_FOCUS_LABELS[dailyFocusTopic] +
          ").";
      } else {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس سطح کلی فعلی شما تنظیم شد.";
      }
    }

    guidedPlan = buildGuidedPlan(
      userLevel,
      hasFocusTopic ? dailyFocusTopic : null
    );
    guidedIndex = 0;
    renderGuidedStep();
  });
}

// ---------------------------
// جمله‌نویسی آزاد + اتصال به بک‌اند
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

      registerCheck(
        text,
        data.corrected,
        data.errors_explained_fa,
        data.errors_explained_en,
        "free"
      );
    } catch (e) {
      if (aiResultEl) {
        aiResultEl.textContent =
          "ارتباط با سرور یا اینترنت ناموفق بود. بعداً دوباره تلاش کن.";
      }
    }
  });
}

// ---------------------------
// بررسی تمرین هدایت‌شده
// ---------------------------

if (guidedCheckBtn) {
  guidedCheckBtn.addEventListener("click", async () => {
    if (!guidedPlan) return;
    const text = guidedInput ? guidedInput.value.trim() : "";
    if (!text) return;

    if (guidedResultEl) {
      guidedResultEl.textContent = "در حال تحلیل این تمرین...";
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level: userLevel })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        if (guidedResultEl) {
          guidedResultEl.textContent =
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
      `.trim();

      guidedResultEl.textContent = resultText;

      registerCheck(
        text,
        data.corrected,
        data.errors_explained_fa,
        data.errors_explained_en,
        "guided"
      );

      if (guidedNextBtn) {
        const stepsLen = guidedPlan.steps?.length || 1;
        guidedNextBtn.style.display = "inline-block";
        guidedNextBtn.textContent =
          guidedIndex === stepsLen - 1
            ? "اتمام تمرین امروز 🎉"
            : "تمرین بعدی ⏭️";
      }
    } catch (e) {
      if (guidedResultEl) {
        guidedResultEl.textContent =
          "ارتباط با سرور یا اینترنت ناموفق بود. بعداً دوباره تلاش کن.";
      }
    }
  });
}

if (guidedNextBtn) {
  guidedNextBtn.addEventListener("click", () => {
    if (!guidedPlan) return;
    const steps = guidedPlan.steps || [];
    if (guidedIndex < steps.length - 1) {
      guidedIndex += 1;
      renderGuidedStep();
    } else {
      guidedNextBtn.style.display = "none";
      guidedResultEl.textContent +=
        "\n\n✅ تمرین هدایت‌شدهٔ امروز تمام شد. آفرین!";
    }
  });
}


// ---------------------------
// دکمه‌های 🎙️ – تبدیل گفتار به متن (Speaking ساده)
// ---------------------------

const voiceBtn = document.getElementById("voice-btn");
const guidedVoiceBtn = document.getElementById("guided-voice-btn");

// تابع کوچک برای تمیز کردن متن ویس و اضافه‌کردن علائم نگارشی
function autoPunctuate(raw) {
  if (!raw) return "";

  let text = raw.trim();

  // جایگزینی کلمات نشانه‌گذاری → علامت
  function replaceWord(str, word, symbol) {
    const re = new RegExp("\\b" + word + "\\b", "gi");
    return str.replace(re, symbol);
  }

  text = replaceWord(text, "question mark", "?");
  text = replaceWord(text, "comma", ",");
  text = replaceWord(text, "dot", ".");
  text = replaceWord(text, "full stop", ".");
  text = replaceWord(text, "period", ".");

  // فاصله‌های اضافی قبل از علامت‌ها را حذف کنیم
  text = text.replace(/\s+([,.!?])/g, "$1");

  // اگر آخر متن هیچ .?! نداشت → خودش اضافه کن (؟ یا .)
  if (!/[.!?]$/.test(text)) {
    const firstWord = text.split(/\s+/)[0].toLowerCase();

    const questionStarters = [
      "why",
      "what",
      "when",
      "where",
      "who",
      "how",
      "do",
      "does",
      "did",
      "is",
      "are",
      "can",
      "could",
      "would",
      "should",
      "will"
    ];

    if (questionStarters.includes(firstWord)) {
      text = text + "?";
    } else {
      text = text + ".";
    }
  }

  // اول جمله را بزرگ‌حرف کنیم (اختیاری ولی قشنگ‌تره)
  text = text.replace(/^([a-z])/, (m) => m.toUpperCase());

  return text;
}

(function initSpeech() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    // اگر پشتیبانی نشود، دکمه‌ها را مخفی کن
    if (voiceBtn) voiceBtn.style.display = "none";
    if (guidedVoiceBtn) guidedVoiceBtn.style.display = "none";
    return;
  }

  let currentTarget = null;
  let currentButton = null;
  const rec = new SpeechRecognition();
  rec.lang = "en-US";
  rec.interimResults = false;

  function startRec(target, buttonEl) {
    currentTarget = target;
    currentButton = buttonEl;
    if (currentButton) {
      currentButton.textContent = "🎙️ ضبط...";
    }
    try {
      rec.start();
    } catch (e) {
      // اگر هم‌زمان دوبار start بشود، اینجا می‌افتد؛ لازم نیست کاری کنیم
    }
  }

  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const processed = autoPunctuate(transcript);

    if (currentTarget) {
      // اگر دوست داشتی متن قبلی حفظ شود، می‌تونی این خط را عوض کنی به +=
      currentTarget.value = processed;
    }
  };

  rec.onend = () => {
    if (currentButton) {
      currentButton.textContent = "🎙️";
    }
    currentTarget = null;
    currentButton = null;
  };

  rec.onerror = () => {
    if (currentButton) currentButton.textContent = "🎙️";
  };

  if (voiceBtn) {
    voiceBtn.addEventListener("click", () => {
      const ta = document.getElementById("user-sentence");
      if (!ta) return;
      startRec(ta, voiceBtn);
    });
  }

  if (guidedVoiceBtn) {
    guidedVoiceBtn.addEventListener("click", () => {
      if (!guidedInput) return;
      startRec(guidedInput, guidedVoiceBtn);
    });
  }
})();
