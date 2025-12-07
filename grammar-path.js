// ===============================
// ابزارهای پایه
// ===============================

const API_URL = "https://grammar-backend.vercel.app/api/grammar";

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ===============================
// سطح کاربر
// ===============================

let userLevel = localStorage.getItem("grammar_level") || "B1";

const userLevelEl = document.getElementById("user-level");
const levelDescEl = document.getElementById("level-desc");

if (userLevelEl) userLevelEl.textContent = userLevel;

const LEVEL_DESCRIPTIONS = {
  A2: "سطح پایه – نیاز به یادگیری ساختار جمله و زمان‌های ساده.",
  B1: "سطح متوسط – نیاز به تقویت زمان‌ها و جمله‌سازی.",
  B2: "سطح نسبتاً پیشرفته – تمرکز روی ساختارهای پیچیده‌تر و متنوع‌تر.",
  C1: "سطح پیشرفته – تمرکز روی نوشتن آکادمیک و ظرافت‌های گرامری."
};

if (levelDescEl) {
  levelDescEl.textContent = LEVEL_DESCRIPTIONS[userLevel] || "";
}

// ===============================
// آمار ساده (کل جملات، امروز، آخرین تمرین)
// ===============================

const STATS_KEY = "grammar_stats_simple_v1";

function defaultStats() {
  return {
    totalChecks: 0,
    todayChecks: 0,
    lastDate: null
  };
}

function loadStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (!raw) return defaultStats();
  try {
    const obj = JSON.parse(raw);
    return {
      totalChecks: obj.totalChecks || 0,
      todayChecks: obj.todayChecks || 0,
      lastDate: obj.lastDate || null
    };
  } catch {
    return defaultStats();
  }
}

function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

let stats = loadStats();

const statTotalEl = document.getElementById("stat-total");
const statTodayEl = document.getElementById("stat-today");
const statLastDateEl = document.getElementById("stat-last-date");

function updateStatsUI() {
  if (statTotalEl) statTotalEl.textContent = stats.totalChecks;
  if (statTodayEl) statTodayEl.textContent = stats.todayChecks;
  if (statLastDateEl) statLastDateEl.textContent = stats.lastDate || "-";
}

updateStatsUI();

function registerCheck() {
  const today = todayStr();
  if (stats.lastDate === today) {
    stats.todayChecks += 1;
  } else {
    stats.todayChecks = 1;
    stats.lastDate = today;
  }
  stats.totalChecks += 1;
  saveStats(stats);
  updateStatsUI();
}

// ===============================
// تعیین مبحث امروز (بر اساس آزمون روزانه اگر وجود داشته باشد)
// ===============================

const dailyFocusTopic = localStorage.getItem("daily_focus_topic");
// اگر از grammar-daily-test چیزی ذخیره شده باشد، اینجا استفاده می‌کنیم.
// مقادیر ممکن: "tense", "prep", "sv", "article", "wordOrder", "general" یا null.

// ===============================
// تولید درس امروز (فقط متن، بدون تمرین)
// ===============================

function generateLessonText(level, focus) {
  // اگر آزمون روزانه مبحث داده، از آن استفاده کن
  if (focus === "tense") {
    return `🎯 مبحث امروز: زمان‌ها (Tenses – مخصوصاً Past Simple vs Present Perfect)

[۱] ایدهٔ کلی:
- Past Simple: برای کاری که در زمان مشخصی در گذشته تمام شده.
  مثال: I moved to Tehran in 2019.
- Present Perfect: برای تجربه یا اثری که تا الان مهم است.
  مثال: I have lived in Tehran for 5 years.

[۲] ساختار:
- Past Simple: Subject + V2 (went, saw, studied)
- Present Perfect: Subject + have/has + V3 (been, seen, studied)

[۳] نکته:
اگر از واژه‌هایی مثل yesterday, last year, in 2010 استفاده کنی → Past Simple مناسب‌تر است.
اگر بخواهی مدت‌زمان را بگویی (for, since) → معمولاً Present Perfect مناسب است.`;
  }

  if (focus === "prep") {
    return `🎯 مبحث امروز: حروف اضافهٔ زمان و مکان (in / on / at / for / since)

[۱] زمان:
- in: سال، ماه، فصل → in 1995, in July
- on: روز هفته و تاریخ → on Monday, on 21st March
- at: ساعت و لحظه‌های خاص → at 7 o'clock, at night

[۲] مدت و نقطه شروع:
- for: مدت زمان → for three years
- since: نقطهٔ شروع → since 2020

[۳] نکته:
«since سه سال» اشتباه است؛
یا بگو since 2020 یا بگو for three years.`;
  }

  if (focus === "sv") {
    return `🎯 مبحث امروز: تطابق فاعل و فعل (Subject–Verb Agreement)

[۱] قاعدهٔ ساده:
- I / you / we / they → فعل بدون s → work, like, play
- he / she / it → فعل با s → works, likes, plays

[۲] مثال:
She works in a bank.
They work in a bank.

[۳] نکته:
در حال ساده (Present Simple) با he/she/it فراموش نکن s اضافه شود.`;
  }

  if (focus === "article") {
    return `🎯 مبحث امروز: حروف تعریف (a / an / the / صفر)

[۱] a / an:
- a: قبل از صدای consonant → a car, a book
- an: قبل از صدای vowel → an apple, an engineer

[۲] the:
وقتی دربارهٔ چیز مشخص صحبت می‌کنی یا قبلش اشاره شده است:
I bought a car. The car is red.

[۳] بدون حرف تعریف:
برای حرف‌زدن کلی دربارهٔ مفاهیم:
I like music. Life is short.`;
  }

  if (focus === "wordOrder") {
    return `🎯 مبحث امروز: ترتیب کلمات و قیدهای بسامد (always, usually, often, sometimes, never)

[۱] ساختار پایه:
Subject + (Adverb of frequency) + Verb
I always get up at 7.
She usually goes to work by bus.

[۲] نکته:
در جمله‌های be (am/is/are) قید بعد از be می‌آید:
I am always tired in the morning.`;
  }

  // اگر فوکوس نداریم، بر اساس سطح کلی
  if (level === "A2") {
    return `📘 درس امروز (A2 – جملهٔ ساده و حال/گذشته ساده)

[۱] ساختار پایه:
Subject + Verb + Object
I play football.
She likes tea.

[۲] دو زمان مهم:
- Present Simple: I work, she works
- Past Simple: I worked, she worked`;
  }

  if (level === "B1") {
    return `📘 درس امروز (B1 – Present Perfect vs Present Perfect Continuous)

[۱] Present Perfect:
روی نتیجه و تجربه تأکید دارد.
I have learned English for three years.

[۲] Present Perfect Continuous:
روی فرایند و ادامه داشتن کار تأکید دارد.
I have been learning English for three years.`;
  }

  if (level === "B2") {
    return `📘 درس امروز (B2 – Relative Clauses)

[۱] Relative clause:
برای توضیح بیشتر دربارهٔ یک اسم استفاده می‌شود.
The man who lives next door is a doctor.
The book that I bought yesterday is interesting.`;
  }

  // C1 و بقیه
  return `📘 درس امروز (C1 – Linking Words)

[۱] نمونه‌ها:
however, although, in addition, moreover, nevertheless, on the other hand

[۲] استفاده:
برای اتصال جمله‌ها و طبیعی‌تر و حرفه‌ای‌تر کردن متن.`;
}

// ===============================
// تمرین هدایت‌شونده مرحله‌به‌مرحله
// ===============================

function buildGuidedExercises(level, focus) {
  // مجموعه تمرین‌های مخصوص هر مبحث/سطح
  if (focus === "tense") {
    return [
      {
        title: "تمرین ۱ – گذشتهٔ ساده (زمان مشخص)",
        prompt:
          "یک جمله دربارهٔ کاری که در زمان مشخصی در گذشته انجام دادی بنویس.\nمثال الهام‌بخش: I visited Istanbul last year."
      },
      {
        title: "تمرین ۲ – Present Perfect (تجربه)",
        prompt:
          "یک جمله با Present Perfect دربارهٔ تجربه‌ای در زندگی‌ات بنویس.\nمثال: I have visited many countries."
      },
      {
        title: "تمرین ۳ – مدت زمان (for)",
        prompt:
          "یک جمله با for بنویس که نشان دهد کاری را چه‌مدت انجام داده‌ای.\nمثال: I have lived in Tehran for five years."
      },
      {
        title: "تمرین ۴ – نقطه شروع (since)",
        prompt:
          "یک جمله با since بنویس که نقطه شروع را نشان دهد.\nمثال: I have worked here since 2020."
      }
    ];
  }

  if (focus === "prep") {
    return [
      {
        title: "تمرین ۱ – in + سال",
        prompt:
          "یک جمله بنویس که از in + سال استفاده کنی.\nمثال: I was born in 1995."
      },
      {
        title: "تمرین ۲ – on + روز",
        prompt:
          "یک جمله دربارهٔ برنامهٔ هفتگی‌ات با on بنویس.\nمثال: I go to the gym on Mondays."
      },
      {
        title: "تمرین ۳ – at + ساعت",
        prompt:
          "یک جمله با at + ساعت بنویس.\nمثال: I usually have dinner at 8 p.m."
      },
      {
        title: "تمرین ۴ – for / since",
        prompt:
          "یک جمله با for و یک جمله با since بنویس.\nمثال: I have studied English for three years. / I have studied English since 2020."
      }
    ];
  }

  if (focus === "sv") {
    return [
      {
        title: "تمرین ۱ – he/she/it + s",
        prompt:
          "یک جمله با فاعل he, she یا it بنویس که فعل آن s بگیرد.\nمثال: She works in a bank."
      },
      {
        title: "تمرین ۲ – we/they بدون s",
        prompt:
          "یک جمله با we یا they بنویس که فعل آن s نگیرد.\nمثال: They live in London."
      },
      {
        title: "تمرین ۳ – جملهٔ ترکیبی",
        prompt:
          "یک جمله بنویس که هم فاعل مفرد داشته باشد هم جمع.\nمثال: My brother works in a bank and my parents live in another city."
      }
    ];
  }

  if (focus === "article") {
    return [
      {
        title: "تمرین ۱ – a / an",
        prompt:
          "یک جمله با a و یک جمله با an بنویس.\nمثال: I bought a new phone. / She is an engineer."
      },
      {
        title: "تمرین ۲ – a/an → the",
        prompt:
          "دو جمله پشت‌سر هم بنویس: اولی با a/an و دومی با the.\nمثال: I bought a car. The car is very fast."
      },
      {
        title: "تمرین ۳ – بدون حرف تعریف",
        prompt:
          "یک جمله دربارهٔ یک مفهوم کلی (life, music, love و...) بدون حرف تعریف بنویس.\nمثال: Life is beautiful."
      }
    ];
  }

  if (focus === "wordOrder") {
    return [
      {
        title: "تمرین ۱ – always / usually",
        prompt:
          "یک جمله با always یا usually در جای درست بنویس.\nمثال: I usually drink coffee in the morning."
      },
      {
        title: "تمرین ۲ – never / sometimes",
        prompt:
          "یک جمله با never یا sometimes بنویس.\nمثال: I never eat fast food."
      },
      {
        title: "تمرین ۳ – دو قید در یک جمله",
        prompt:
          "یک جمله طولانی‌تر بنویس که در آن از دو قید مختلف استفاده کرده باشی.\nمثال: I usually get up at 7, but I sometimes sleep until 9 on Fridays."
      }
    ];
  }

  // اگر فوکوس خاص نداریم → بر اساس سطح
  if (level === "A2") {
    return [
      {
        title: "تمرین ۱ – حال ساده",
        prompt:
          "یک جمله ساده در زمان حال دربارهٔ روتین روزانه‌ات بنویس.\nمثال: I go to work at 8."
      },
      {
        title: "تمرین ۲ – گذشته ساده",
        prompt:
          "یک جمله در زمان گذشته دربارهٔ دیروزت بنویس.\nمثال: I watched a movie yesterday."
      }
    ];
  }

  if (level === "B1") {
    return [
      {
        title: "تمرین ۱ – Present Perfect (تجربه)",
        prompt:
          "یک جمله با Present Perfect دربارهٔ یک تجربه مهم بنویس.\nمثال: I have visited three countries."
      },
      {
        title: "تمرین ۲ – Present Perfect Continuous (مدت)",
        prompt:
          "یک جمله با Present Perfect Continuous دربارهٔ کاری که مدتی است انجام می‌دهی بنویس.\nمثال: I have been studying English for three years."
      }
    ];
  }

  if (level === "B2" || level === "C1") {
    return [
      {
        title: "تمرین ۱ – Relative Clause",
        prompt:
          "یک جمله بنویس که در آن از who, which یا that استفاده کرده باشی.\nمثال: The book that I bought yesterday is very interesting."
      },
      {
        title: "تمرین ۲ – Linking Word",
        prompt:
          "یک جمله طولانی بنویس که در آن از however یا although یا in addition استفاده کرده باشی."
      }
    ];
  }

  // حالت عمومی
  return [
    {
      title: "تمرین ۱ – جملهٔ آزاد",
      prompt:
        "یک جمله دربارهٔ امروزت بنویس و بعد با دکمهٔ «بررسی» آن را چک کن."
    }
  ];
}

// ===============================
// اتصال به UI: درسنامه + تمرین هدایت‌شونده
// ===============================

const startPracticeBtn = document.getElementById("start-practice");
const practiceStatusEl = document.getElementById("practice-status");
const lessonBoxEl = document.getElementById("lesson-box");

const exerciseTextEl = document.getElementById("exercise-text");
const guidedInput = document.getElementById("guided-input");
const guidedCheckBtn = document.getElementById("guided-check-btn");
const guidedResultEl = document.getElementById("guided-result");
const guidedNextBtn = document.getElementById("guided-next-btn");

let guidedExercises = [];
let guidedIndex = 0;

function renderCurrentExercise() {
  if (!guidedExercises.length) {
    exerciseTextEl.textContent =
      "هنوز تمرینی بارگذاری نشده است. روی «شروع درس و تمرین امروز» بزن.";
    guidedInput.value = "";
    guidedResultEl.textContent = "";
    guidedNextBtn.style.display = "none";
    return;
  }

  const ex = guidedExercises[guidedIndex];
  exerciseTextEl.textContent = `تمرین ${guidedIndex + 1} از ${
    guidedExercises.length
  }\n${ex.title}\n\n${ex.prompt}`;
  guidedInput.value = "";
  guidedResultEl.textContent = "";
  guidedNextBtn.style.display = "none";
}

if (startPracticeBtn) {
  startPracticeBtn.addEventListener("click", () => {
    const lesson = generateLessonText(userLevel, dailyFocusTopic || null);
    if (lessonBoxEl) {
      lessonBoxEl.textContent = lesson;
    }

    if (practiceStatusEl) {
      if (dailyFocusTopic) {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس نتیجهٔ آخرین آزمون روزانه تنظیم شده است.";
      } else {
        practiceStatusEl.textContent =
          "تمرین امروز بر اساس سطح کلی فعلی شما تنظیم شده است.";
      }
    }

    guidedExercises = buildGuidedExercises(userLevel, dailyFocusTopic || null);
    guidedIndex = 0;
    renderCurrentExercise();
  });
}

// ===============================
// بررسی تمرین هدایت‌شونده با هوش مصنوعی
// ===============================

if (guidedCheckBtn) {
  guidedCheckBtn.addEventListener("click", async () => {
    const text = guidedInput.value.trim();
    if (!text) return;

    guidedResultEl.textContent = "در حال تحلیل این تمرین...";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level: userLevel })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        guidedResultEl.textContent =
          "خطا در پاسخ سرور:\n" + JSON.stringify(data, null, 2);
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
      registerCheck();

      if (guidedIndex < guidedExercises.length - 1) {
        guidedNextBtn.textContent = "تمرین بعدی ➡";
        guidedNextBtn.style.display = "inline-block";
      } else {
        guidedNextBtn.textContent = "اتمام تمرین امروز 🎉";
        guidedNextBtn.style.display = "inline-block";
      }
    } catch (e) {
      guidedResultEl.textContent =
        "ارتباط با سرور یا اینترنت ناموفق بود. بعداً دوباره تلاش کن.";
    }
  });
}

if (guidedNextBtn) {
  guidedNextBtn.addEventListener("click", () => {
    if (guidedIndex < guidedExercises.length - 1) {
      guidedIndex += 1;
      renderCurrentExercise();
    } else {
      guidedResultEl.textContent +=
        "\n\n✅ تمرین هدایت‌شوندهٔ امروز تمام شد. آفرین!";
      guidedNextBtn.style.display = "none";
    }
  });
}

// ===============================
// جمله آزاد + بررسی با AI
// ===============================

const freeInput = document.getElementById("user-sentence");
const freeCheckBtn = document.getElementById("check-btn");
const freeResultEl = document.getElementById("ai-result");

if (freeCheckBtn) {
  freeCheckBtn.addEventListener("click", async () => {
    const text = freeInput.value.trim();
    if (!text) return;

    freeResultEl.textContent = "در حال تحلیل جمله...";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, level: userLevel })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        freeResultEl.textContent =
          "خطا در پاسخ سرور:\n" + JSON.stringify(data, null, 2);
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

      freeResultEl.textContent = resultText;
      registerCheck();
    } catch (e) {
      freeResultEl.textContent =
        "ارتباط با سرور یا اینترنت ناموفق بود. بعداً دوباره تلاش کن.";
    }
  });
}

// ===============================
// 🎙 تبدیل گفتار به متن + نگارش خودکار ساده
// ===============================

const voiceBtn = document.getElementById("voice-btn");
const guidedVoiceBtn = document.getElementById("guided-voice-btn");

function autoPunctuate(raw) {
  if (!raw) return "";
  let text = raw.trim();

  // تبدیل کلمات نشانه‌گذاری به علامت
  function replaceWord(str, word, symbol) {
    const re = new RegExp("\\b" + word + "\\b", "gi");
    return str.replace(re, symbol);
  }

  text = replaceWord(text, "question mark", "?");
  text = replaceWord(text, "comma", ",");
  text = replaceWord(text, "dot", ".");
  text = replaceWord(text, "full stop", ".");
  text = replaceWord(text, "period", ".");

  // حذف فاصله اضافی قبل از علامت‌ها
  text = text.replace(/\s+([,.!?])/g, "$1");

  // اگر هیچ .?! در انتها نبود → حدس بزن
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

  // اول جمله را بزرگ کنیم
  text = text.replace(/^([a-z])/, (m) => m.toUpperCase());

  return text;
}

(function initSpeech() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
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
    if (currentButton) currentButton.textContent = "🎙 ضبط...";
    try {
      rec.start();
    } catch (e) {
      // اگر قبلاً در حال ضبط باشد، اینجا خطا می‌دهد که مهم نیست
    }
  }

  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const processed = autoPunctuate(transcript);
    if (currentTarget) {
      currentTarget.value = processed;
    }
  };

  rec.onend = () => {
    if (currentButton) currentButton.textContent = "🎙";
    currentTarget = null;
    currentButton = null;
  };

  rec.onerror = () => {
    if (currentButton) currentButton.textContent = "🎙";
  };

  if (voiceBtn && freeInput) {
    voiceBtn.addEventListener("click", () => {
      startRec(freeInput, voiceBtn);
    });
  }

  if (guidedVoiceBtn && guidedInput) {
    guidedVoiceBtn.addEventListener("click", () => {
      startRec(guidedInput, guidedVoiceBtn);
    });
  }
})();
