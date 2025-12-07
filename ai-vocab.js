// ai-vocab.js
import WORD_LIST from "./data/word_list.js";

// ---------------------------
// تنظیمات API
// ---------------------------

// برای واژگان (fa, example, usage, hint)
const API_URL_VOCAB = "https://grammar-backend.vercel.app/api/vocab";

// برای جمله‌سازی و داستان (می‌توانی همین /api/grammar را هم استفاده کنی)
const API_URL_GRAMMAR = "https://grammar-backend.vercel.app/api/grammar";

// ---------------------------
// عناصر UI
// ---------------------------
const currentWordEl = document.getElementById("current-word");
const wordMetaEl = document.getElementById("word-meta");
const wordStatusEl = document.getElementById("word-status");

const prevWordBtn = document.getElementById("prev-word-btn");
const nextWordBtn = document.getElementById("next-word-btn");
const randomWordBtn = document.getElementById("random-word-btn");

const generateWordAiBtn = document.getElementById("generate-word-ai-btn");
const exampleBox = document.getElementById("example-box");

const sentenceInput = document.getElementById("sentence-input");
const sentenceCheckBtn = document.getElementById("sentence-check-btn");
const sentenceResult = document.getElementById("sentence-result");

const storyBtn = document.getElementById("story-btn");
const storyBox = document.getElementById("story-box");

// ---------------------------
// وضعیت فعلی واژه
// ---------------------------

let currentIndex = 0;

function loadInitialIndex() {
  const raw = localStorage.getItem("ai_vocab_index");
  if (!raw) return 0;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 0 || n >= WORD_LIST.length) return 0;
  return n;
}

function saveIndex() {
  localStorage.setItem("ai_vocab_index", String(currentIndex));
}

function clampIndex() {
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= WORD_LIST.length) currentIndex = WORD_LIST.length - 1;
}

function renderCurrentWord() {
  clampIndex();
  const word = WORD_LIST[currentIndex] || "...";

  currentWordEl.textContent = word;
  wordMetaEl.textContent = `واژه ${currentIndex + 1} از ${WORD_LIST.length}`;

  exampleBox.textContent = "برای این واژه هنوز چیزی تولید نشده است.";
  sentenceInput.value = "";
  sentenceResult.textContent = "";
  storyBox.textContent = "";

  wordStatusEl.textContent = "";
}

// مقدار اولیه
currentIndex = loadInitialIndex();
renderCurrentWord();

// ---------------------------
// جابه‌جایی بین واژه‌ها
// ---------------------------

prevWordBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    saveIndex();
    renderCurrentWord();
  }
});

nextWordBtn.addEventListener("click", () => {
  if (currentIndex < WORD_LIST.length - 1) {
    currentIndex += 1;
    saveIndex();
    renderCurrentWord();
  }
});

randomWordBtn.addEventListener("click", () => {
  currentIndex = Math.floor(Math.random() * WORD_LIST.length);
  saveIndex();
  renderCurrentWord();
});

// ---------------------------
// A) تولید معنی + مثال + usage + hint
// ---------------------------

async function fetchVocabAI(word) {
  // فرض: backend تو یک endpoint /api/vocab دارد که JSON زیر را برمی‌گرداند:
  // { fa, example, usage, hint }
  const res = await fetch(API_URL_VOCAB, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word })
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "API error");
  }
  return data;
}

generateWordAiBtn.addEventListener("click", async () => {
  const word = WORD_LIST[currentIndex];
  if (!word) return;

  exampleBox.textContent = "در حال تولید با هوش مصنوعی...";

  try {
    const data = await fetchVocabAI(word);

    // انتظار داریم data مثل:
    // { fa: "...", example: "...", usage: "...", hint: "..." }

    exampleBox.textContent = `
🔵 ${word}

📘 معنی (فارسی):
${data.fa || "-"}

✏ مثال (English):
${data.example || "-"}

📌 کاربرد:
${data.usage || "-"}

💡 راهنمای حفظ:
${data.hint || "-"}
    `.trim();
  } catch (e) {
    exampleBox.textContent =
      "خطا در پاسخ سرور یا تنظیمات بک‌اند. بعداً دوباره تلاش کن.\n" +
      (e.message || "");
  }
});

// ---------------------------
// B) جمله‌سازی و تصحیح با واژه فعلی
// ---------------------------

async function fetchSentenceAI(sentence) {
  // اینجا از /api/grammar استفاده می‌کنیم؛
  // backend تو باید چیزی شبیه { corrected, errors_explained_fa, errors_explained_en } بدهد.
  const res = await fetch(API_URL_GRAMMAR, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: sentence, level: "B1" })
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "API error");
  }
  return data;
}

sentenceCheckBtn.addEventListener("click", async () => {
  const sentence = sentenceInput.value.trim();
  if (!sentence) return;

  sentenceResult.textContent = "در حال تحلیل جمله...";

  try {
    const data = await fetchSentenceAI(sentence);

    const text = `
✔ جملهٔ تصحیح‌شده:
${data.corrected}

🇮🇷 توضیح خطاها:
${data.errors_explained_fa || "-"}

🇬🇧 Explanation:
${data.errors_explained_en || "-"}
    `.trim();

    sentenceResult.textContent = text;
  } catch (e) {
    sentenceResult.textContent =
      "خطا در پاسخ سرور یا تنظیمات بک‌اند.\n" + (e.message || "");
  }
});

// ---------------------------
// C) داستان کوتاه با واژه فعلی
// ---------------------------

async function fetchStoryAI(word) {
  const prompt = `
Write a short story in simple English (5–7 sentences) using the word "${word}" at least 3 times.
The story should be suitable for an intermediate learner.
Return only the story text.
  `.trim();

  const res = await fetch(API_URL_GRAMMAR, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: prompt, level: "B2" })
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "API error");
  }
  // فرض: backend متن را در فیلد corrected برمی‌گرداند
  return data.corrected || JSON.stringify(data);
}

storyBtn.addEventListener("click", async () => {
  const word = WORD_LIST[currentIndex];
  if (!word) return;

  storyBox.textContent = "در حال ساخت داستان...";

  try {
    const story = await fetchStoryAI(word);
    storyBox.textContent = story;
  } catch (e) {
    storyBox.textContent =
      "خطا در پاسخ سرور یا تنظیمات بک‌اند.\n" + (e.message || "");
  }
});
