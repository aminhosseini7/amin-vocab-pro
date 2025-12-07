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
// اگر دکمه‌ای با این id در HTML تعریف کنی، از همین استفاده می‌شود
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

// الان دیگر تاریخ را چک نمی‌کنیم؛ هر وقت فوکوس وجود داشته باشد از آن استفاده می‌کنیم
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
// درس امروز بر اساس سطح + آخرین آزمون روزانه
// ---------------------------

const lessonBoxEl = document.getElementById("lesson-box");
const practiceStatusEl = document.getElementById("practice-status");

function generateLesson(level, focusTopic) {
  // اگر از آزمون روزانه فوکوس خاص داریم:
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
هر جمله‌ای که می‌نویسی را در بخش «📝 جمله بنویس» همین صفحه وارد کن و با هوش مصنوعی تصحیح کن تا خطاها و توضیحات را ببینی.`;
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
جملاتت را یکی‌یکی در بخش «📝 جمله بنویس» وارد کن و ببین AI چه توضیحی درباره حروف اضافه بهت می‌دهد.`;
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
۵ جمله با I/you/we/they (بدون s).

هر جمله را در بخش «📝 جمله بنویس» وارد کن و نتیجه را ببین.`;
  }

  if (focusTopic === "article") {
    return `🎯 مبحث امروز: حروف تعریف (Articles – a / an / the / صفر)

[۱] خلاصه:
- a: قبل از اسم مفرد قابل‌شمار، با صدای consonant
  a car, a book
- an: قبل از اسم مفرد قابل‌شمار، با صدای vowel (a, e, i, o, u)
  an apple, an engineer
- the: وقتی چیز مشخص است یا قبلاً اشاره شده
  I bought a car. The car is red.
- صفر (هیچ): وقتی به طور کلی صحبت می‌کنیم
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
۳ جمله که در آن‌ها a/an استفاده کنی،
۳ جمله که در آن‌ها the استفاده کنی،
۲ جمله بدون هیچ حرف تعریفی (مثلاً دربارهٔ music, life, love).

باز هم می‌توانی همه را در بخش «📝 جمله بنویس» چک کنی.`;
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
۵ جمله با always/usually/often/sometimes/never بنویس،
سعی کن هر بار قید را جای درست بگذاری.

[۵] تمرین ۳ – جمله‌نویسی آزاد:
دو یا سه جمله طولانی بنویس که در آن‌ها از دو قید مختلف استفاده کرده باشی؛
بعد بفرست برای «📝 جمله بنویس» و ببین AI چه می‌گوید.`;
  }

  // اگر فوکوس خاص نداریم → بر اساس سطح کلی
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
2) ۵ جملهٔ ساده در زمان گذشته دربارهٔ دیروزت بنویس.
3) هر کدام را در «📝 جمله بنویس» بفرست و تصحیح را ببین.`;
  }

  if (level === "B1") {
    return `📘 درس امروز (B1 – مرور Present Perfect vs Present Perfect Continuous)

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
2) تأکید روی این‌که «کار تمام شده» و الان اثرش مهم است.

[۵] تمرین ۲ – بازنویسی:
جملات زیر را یک بار با Present Perfect
و یک بار با Present Perfect Continuous بنویس:
- I / learn English / three years
- She / work here / six months
- They / study / all day

[۶] تمرین ۳ – جمله‌نویسی:
۳ جمله دربارهٔ مهارت‌های خودت با این ساختارها بنویس
و در «📝 جمله بنویس» چک کن.`;
  }

  if (level === "B2") {
    return `📘 درس امروز (B2 – Relative Clauses)

[۱] مفهوم:
از who/which/that برای توضیح بیشتر دربارهٔ اسم استفاده می‌کنیم.
مثال:
The man who lives next door is a doctor.
The book that I bought yesterday is interesting.

[۲] تمرین:
۱) ۵ جمله بساز که در آن‌ها از who استفاده کنی.
۲) ۵ جمله بساز که در آن‌ها از which/that استفاده کنی.
۳) جمله‌ها را در «📝 جمله بنویس» چک کن.`;
  }

  // C1 یا سایر
  return `📘 درس امروز (C1 – Linking Words & Style)

[۱] چند Linking word مهم:
however, although, in addition, moreover, nevertheless, on the other hand

[۲] تمرین:
۱) یک پاراگراف ۶–۸ جمله‌ای در مورد یک موضوع (مثلاً «یادگیری زبان انگلیسی») بنویس.
۲) سعی کن حداقل از ۴–۵ linking word مختلف استفاده کنی.
۳) متن را در چند بخش به «📝 جمله بنویس» بده و خطاها را ببین.`;
}


// دکمه شروع تمرین روزانه
const startPracticeBtn = document.getElementById("start-practice");
if (startPracticeBtn) {
  startPracticeBtn.addEventListener("click", () => {
    const lesson = generateLesson(userLevel, hasFocusTopic ? dailyFocusTopic : null);
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
  });
}

// ---------------------------
// بخش جمله‌نویسی + اتصال به بک‌اند
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
