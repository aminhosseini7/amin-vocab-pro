import WORD_LIST from "./data/word_list.js";

const API_URL = "https://api-inference.huggingface.co/models/gpt2"; 
// تو بعداً مدل دلخواهت را می‌گذاری

//--------------------------------------------------
// UI Elements
//--------------------------------------------------
const wordInput = document.getElementById("word-input");
const loadWordBtn = document.getElementById("load-word-btn");
const exampleBox = document.getElementById("example-box");
const sentenceInput = document.getElementById("sentence-input");
const sentenceCheckBtn = document.getElementById("sentence-check-btn");
const sentenceResult = document.getElementById("sentence-result");
const storyBtn = document.getElementById("story-btn");
const storyBox = document.getElementById("story-box");

//--------------------------------------------------
// 1) تولید معنی + مثال + توضیح + Hint
//--------------------------------------------------
async function generateWordData(word) {
  const prompt = `
Provide JSON only.

Word: "${word}"

Required fields:
- fa (Persian meaning)
- example (English example)
- usage (short description in English)
- hint (creative mnemonic to remember the word)

Example JSON format:
{
  "fa": "",
  "example": "",
  "usage": "",
  "hint": ""
}
`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await res.json();

  let text = "";

  if (Array.isArray(data) && data[0]?.generated_text) {
    text = data[0].generated_text;
  } else if (data.generated_text) {
    text = data.generated_text;
  } else {
    return null;
  }

  // استخراج بخش JSON
  let start = text.indexOf("{");
  let end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

//--------------------------------------------------
// دکمه شروع تمرین لغت
//--------------------------------------------------
loadWordBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) return;

  exampleBox.textContent = "در حال تولید...";

  const result = await generateWordData(word);

  if (!result) {
    exampleBox.textContent = "خطا در دریافت اطلاعات از هوش مصنوعی.";
    return;
  }

  exampleBox.innerHTML = `
🔵 <b>${word}</b>

📘 معنی:
${result.fa}

✏ مثال:
${result.example}

📌 کاربرد:
${result.usage}

💡 راهنمای حفظ:
${result.hint}
  `;
});

//--------------------------------------------------
// 2) جمله‌سازی و بررسی
//--------------------------------------------------
sentenceCheckBtn.addEventListener("click", async () => {
  const sentence = sentenceInput.value.trim();
  if (!sentence) return;

  sentenceResult.textContent = "در حال بررسی...";

  const prompt = `
Correct the sentence and explain errors:

"${sentence}"

Return JSON:
{
  "corrected": "",
  "fa": "",
  "en": ""
}
`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await res.json();

  let text = "";
  if (Array.isArray(data) && data[0]?.generated_text) text = data[0].generated_text;
  else if (data.generated_text) text = data.generated_text;

  let start = text.indexOf("{");
  let end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    sentenceResult.textContent = "خطا در فرمت پاسخ.";
    return;
  }

  const result = JSON.parse(text.slice(start, end + 1));

  sentenceResult.innerHTML = `
✔ جملهٔ صحیح:
${result.corrected}

🇮🇷 توضیح:
${result.fa}

🇬🇧 Explanation:
${result.en}
  `;
});

//--------------------------------------------------
// 3) داستان کوتاه روزانه با لغت
//--------------------------------------------------
storyBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) return;

  storyBox.textContent = "در حال ساخت داستان...";

  const prompt = `
Write a short story (6–7 sentences) in simple English using the word "${word}" at least 3 times. Return plain text only.
`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await res.json();

  let text = "";
  if (Array.isArray(data) && data[0]?.generated_text) text = data[0].generated_text;
  else if (data.generated_text) text = data.generated_text;

  storyBox.textContent = text;
});
