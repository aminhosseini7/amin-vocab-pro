// js/ai-meaning.js
// آدرس بک‌اند برای واژگان – اگر فرق دارد این را عوض کن //
if (!window.VOCAB_API_URL) {
  window.VOCAB_API_URL = "https://grammar-backend.vercel.app/api/vocab";
}


// کلید کش در localStorage
const CACHE_KEY = "ai_vocab_cache_v1";

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    // اگر مثلاً ظرفیت پر شد، کاری نمی‌کنیم
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let btn = document.getElementById("showMeaningBtn");
  const wordBox = document.getElementById("wordBox");
  const meaningBox = document.getElementById("meaningBox");

  if (!btn || !wordBox || !meaningBox) return;

  // تمام لیسنرهای قبلی دکمه را حذف می‌کنیم که فقط این رفتار اجرا شود
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  btn = newBtn;

  let cache = loadCache();

  btn.addEventListener("click", async () => {
    const word = (wordBox.textContent || "").trim();
    if (!word) return;

    // اگر از قبل در کش داریم، همون رو نمایش بده
    if (cache[word]) {
      const data = cache[word];
      meaningBox.style.display = "block";
      meaningBox.innerText = [
        `📘 معنی:`,
        data.fa || "-",
        "",
        `✏ مثال (English):`,
        data.example || "-",
        "",
        `📌 کاربرد:`,
        data.usage || "-",
        "",
        `💡 نکتهٔ حفظ:`,
        data.hint || "-"
      ].join("\n");
      return;
    }

    // اگر کش نداریم، از سرور بگیر
    meaningBox.style.display = "block";
    meaningBox.innerText = "در حال گرفتن معنی از هوش مصنوعی...";

    try {
      const res = await fetch(window.VOCAB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        meaningBox.innerText =
          "خطا در پاسخ سرور.\n" +
          (data.error || data.detail || "لطفاً بعداً دوباره امتحان کن.");
        return;
      }

      // ذخیره در کش
      cache[word] = {
        fa: data.fa || "",
        example: data.example || "",
        usage: data.usage || "",
        hint: data.hint || ""
      };
      saveCache(cache);

      // نمایش قشنگ
      meaningBox.innerText = [
        `📘 معنی:`,
        cache[word].fa || "-",
        "",
        `✏ مثال (English):`,
        cache[word].example || "-",
        "",
        `📌 کاربرد:`,
        cache[word].usage || "-",
        "",
        `💡 نکتهٔ حفظ:`,
        cache[word].hint || "-"
      ].join("\n");
    } catch (e) {
      meaningBox.innerText =
        "خطا در ارتباط با اینترنت یا سرور. لطفاً بعداً دوباره امتحان کن.";
    }
  });
});
