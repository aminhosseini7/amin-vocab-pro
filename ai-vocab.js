// ============================
// API تنظیمات
// ============================

const API_URL = "https://grammar-backend.vercel.app/api/grammar";

// ============================
// انتخاب لغت
// ============================

const wordInput = document.getElementById("word-input");
const loadWordBtn = document.getElementById("load-word-btn");
const wordStatus = document.getElementById("word-status");

// بخش‌ها
const exampleSection = document.getElementById("example-section");
const sentenceSection = document.getElementById("sentence-section");
const storySection = document.getElementById("story-section");

// باکس‌های خروجی
const exampleBox = document.getElementById("example-box");

// ============================
// مرحله A – تولید مثال‌های هوشمند
// ============================

async function generateExamples(word) {
  exampleBox.textContent = "در حال ساخت مثال‌ها...";

  const prompt = `
I am Amin. I am 29. I am from Iran. My goal is migrating to Sydney University.

Please generate 3 examples for the vocabulary "${word}":

1) A2-level example.
2) B1/B2 example.
3) A personalized example about Amin’s life goals (Sydney, migration, supply chain, data analysis).

Return result as:
A2:
...
B1/B2:
...
Personal:
...
  `.trim();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: prompt, level: "B2" })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      exampleBox.textContent = "خطا در دریافت مثال‌ها:\n" + JSON.stringify(data, null, 2);
      return;
    }

    exampleBox.textContent = data.corrected;  // خود مدل متن تولید می‌کند
  } catch (e) {
    exampleBox.textContent = "خطا در اتصال به سرور.";
  }
}

// ============================
// مرحله B – جمله‌سازی و بررسی
// ============================

const sentenceInput = document.getElementById("sentence-input");
const sentenceCheckBtn = document.getElementById("sentence-check-btn");
const sentenceResult = document.getElementById("sentence-result");

sentenceCheckBtn.addEventListener("click", async () => {
  const text = sentenceInput.value.trim();
  if (!text) return;

  sentenceResult.textContent = "در حال بررسی جمله...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      sentenceResult.textContent = "خطا:\n" + JSON.stringify(data, null, 2);
      return;
    }

    const resultText = `
جملهٔ تصحیح‌شده:
${data.corrected}

توضیح (فارسی):
${data.errors_explained_fa}

Explanation:
${data.errors_explained_en}

مثال‌ها:
${(data.examples || []).join("\n")}

تمرین بیشتر:
${data.suggested_practice}
    `.trim();

    sentenceResult.textContent = resultText;

  } catch (e) {
    sentenceResult.textContent = "خطا در اتصال.";
  }
});

// ============================
// مرحله C – داستان کوتاه
// ============================

const storyBtn = document.getElementById("story-btn");
const storyBox = document.getElementById("story-box");

storyBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) return;

  storyBox.textContent = "در حال ساخت داستان...";

  const prompt = `
Write a short story (5-7 sentences) that includes the word "${word}".
The story should be simple, natural, and suitable for an intermediate learner.
Use a friendly tone.

Amin is 29, from Iran, interested in migrating to Sydney University and working in supply chain / data analysis. You can include these facts.

Return only the story.
  `.trim();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: prompt, level: "B1" })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      storyBox.textContent = "خطا:\n" + JSON.stringify(data, null, 2);
      return;
    }

    storyBox.textContent = data.corrected;
  } catch (e) {
    storyBox.textContent = "خطا در اتصال.";
  }
});

// ============================
// فعال شدن همه‌ی بخش‌ها پس از انتخاب لغت
// ============================

loadWordBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (!word) {
    wordStatus.textContent = "لطفاً ابتدا یک لغت وارد کن.";
    return;
  }

  wordStatus.textContent = `لغت انتخاب‌شده: ${word}`;

  exampleSection.style.display = "block";
  sentenceSection.style.display = "block";
  storySection.style.display = "block";

  generateExamples(word);
});

// ============================
// 🎙 Voice Input + Auto-Punctuation
// ============================

const sentenceVoiceBtn = document.getElementById("sentence-voice-btn");

function autoPunctuate(raw) {
  if (!raw) return "";
  let text = raw.trim();

  function replaceWord(str, word, symbol) {
    const re = new RegExp("\\b" + word + "\\b", "gi");
    return str.replace(re, symbol);
  }

  text = replaceWord(text, "comma", ",");
  text = replaceWord(text, "dot", ".");
  text = replaceWord(text, "question mark", "?");
  text = replaceWord(text, "period", ".");

  text = text.replace(/\s+([,.!?])/g, "$1");

  if (!/[.!?]$/.test(text)) {
    const first = text.split(/\s+/)[0].toLowerCase();

    const Q = ["why", "what", "how", "when", "where", "do", "does", "did", "is", "are", "can"];
    if (Q.includes(first)) text += "?";
    else text += ".";
  }

  text = text.replace(/^([a-z])/, (m) => m.toUpperCase());

  return text;
}

(function initSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (sentenceVoiceBtn) sentenceVoiceBtn.style.display = "none";
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "en-US";
  rec.interimResults = false;

  sentenceVoiceBtn.addEventListener("click", () => {
    sentenceVoiceBtn.textContent = "🎙 ضبط...";
    try { rec.start(); } catch {}
  });

  rec.onresult = (e) => {
    const processed = autoPunctuate(e.results[0][0].transcript);
    sentenceInput.value = processed;
  };

  rec.onend = () => {
    sentenceVoiceBtn.textContent = "🎙";
  };
})();
