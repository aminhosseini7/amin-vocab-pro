//// ---------------------------
// سیستم مسیر یادگیری گرامر
//// ---------------------------

// آدرس بک‌اند شما (همانی که درست کردیم)
const API_URL = "https://grammar-backend.vercel.app/api/grammar";

// سطح پیش‌فرض:
let userLevel = localStorage.getItem("grammar_level") || "B1";

// نمایش سطح روی صفحه:
document.getElementById("user-level").textContent = userLevel;


// توضیح سطح:
const levelDescriptions = {
  "A2": "نیاز به یادگیری پایه‌های جمله‌سازی و زمان‌های ساده.",
  "B1": "سطح متوسط – نیاز به تقویت زمان‌ها و جمله‌سازی.",
  "B2": "قادر به نوشتن روان – نیاز به پیچیده‌سازی متن.",
  "C1": "پیشرفته – تمرکز بر نوشتن آکادمیک.",
};
document.getElementById("level-desc").textContent = levelDescriptions[userLevel];


// ------------------------------
// تولید درس روزانه
// ------------------------------

function generateLesson(level) {
  if (level === "A2") {
    return `درس امروز (A2):
- Present Simple و Continuous
- مثال:
  I play football.
  I am playing football.
- نکته: برای بیان کاری که همین الان رخ می‌دهد از am/is/are + ing استفاده کن.`;
  }

  if (level === "B1") {
    return `درس امروز (B1):
- Present Perfect vs Present Perfect Continuous
- مثال:
  I have lived here for 5 years.
  I have been living here for 5 years.
- نکته: برای مدت زمان → از for و برای نقطه شروع → از since استفاده کن.`;
  }

  if (level === "B2") {
    return `درس امروز (B2):
- Relative clauses: who / which / that
- مثال:
  The book that I bought yesterday was great.
- نکته: از that برای توصیف اشیا و افراد می‌توانی استفاده کنی.`;
  }

  return `درس امروز (پیشرفته): Linking words – however, although, moreover، …`;
}

document.getElementById("start-practice").addEventListener("click", () => {
  const lesson = generateLesson(userLevel);
  document.getElementById("lesson-box").textContent = lesson;

  document.getElementById("practice-status").textContent =
    "تمرین امروز فعال شد ✔";
});


// ------------------------------
// بررسی جمله با هوش مصنوعی
// ------------------------------

document.getElementById("check-btn").addEventListener("click", async () => {
  const text = document.getElementById("user-sentence").value.trim();

  if (!text) return;

  document.getElementById("ai-result").textContent = "در حال تحلیل...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text, level: userLevel }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      document.getElementById("ai-result").textContent =
        "خطا:\n" + JSON.stringify(data, null, 2);
      return;
    }

    const result = `
جملهٔ تصحیح‌شده:
${data.corrected}

توضیح خطاها (فارسی):
${data.errors_explained_fa}

Explanation (English):
${data.errors_explained_en}

مثال‌ها:
${data.examples.join("\n")}

تمرین پیشنهادی:
${data.suggested_practice}
    `;

    document.getElementById("ai-result").textContent = result;

  } catch (e) {
    document.getElementById("ai-result").textContent =
      "ارتباط با سرور ناموفق بود.";
  }
});
