// js/ai-meaning.js
// فقط مسئول صحبت با بک‌اند و کش کردن جواب‌ها

const VOCAB_API_URL = "https://grammar-backend.vercel.app/api/vocab";
const CACHE_KEY = "ai_vocab_cache_v1";

function loadAICache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveAICache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    // ignore
  }
}

let aiVocabCache = loadAICache();

/**
 * گرفتن معنی/مثال/کاربرد/نکته برای یک واژه از بک‌اند
 * و ذخیره در لوکال‌استوریج
 */
async function getAIMeaningForWord(word) {
  const key = String(word || "").toLowerCase().trim();
  if (!key) {
    throw new Error("Empty word");
  }

  // اگر قبلاً از سرور گرفته‌ایم، از کش بخوان
  if (aiVocabCache[key]) {
    return aiVocabCache[key];
  }

  const res = await fetch(VOCAB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ word })
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || "Vocab API error");
  }

  const cleaned = {
    meaning_fa: data.meaning_fa || "",
    example_en: data.example_en || "",
    usage_fa: data.usage_fa || "",
    note: data.note || ""
  };

  aiVocabCache[key] = cleaned;
  saveAICache(aiVocabCache);

  return cleaned;
}

// در دسترس قرار دادن برای سایر فایل‌ها
window.getAIMeaningForWord = getAIMeaningForWord;
