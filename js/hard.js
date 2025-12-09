// js/hard.js
// نمایش فلش‌کارت برای کلمات سخت (hard)

let aminStateHard = loadState();
const ALL_WORDS = VOCAB || [];

let hardList = [];
let hardIndex = 0;

// ------------------ کمک‌تابع‌ها ------------------

function shuffleHard(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// لیست سخت‌ها را هر بار از روی وضعیت واقعی می‌سازد
function computeHardList() {
  hardList = ALL_WORDS.filter((w) => {
    const s = getWordState(aminStateHard, w);
    return classifyWord(s) === "hard";
  });

  if (!hardList.length) {
    const wordEl = document.getElementById("hardWord");
    const meaningEl = document.getElementById("hardMeaning");
    if (wordEl) wordEl.textContent = "فعلاً هیچ لغت سختی نداری 👌";
    if (meaningEl) {
      meaningEl.innerHTML =
        "از بخش «یادگیری»، لغات را با دکمه ⭐ سخت علامت بزن یا چند بار در تست غلط جواب بده تا اینجا ظاهر شوند.";
    }
    return false;
  }

  shuffleHard(hardList);
  hardIndex = 0;
  return true;
}

function renderHard() {
  if (!hardList.length) return;

  const w = hardList[hardIndex];
  const wordEl = document.getElementById("hardWord");
  const meaningEl = document.getElementById("hardMeaning");

  if (wordEl) wordEl.textContent = w.word;

  if (meaningEl) {
    meaningEl.innerHTML =
      "<b>📘 معنی:</b> " +
      (w.meaning_fa || "-") +
      "<br><br><b>✏ مثال (English):</b> " +
      (w.example_en || "-") +
      "<br><br><b>📌 کاربرد:</b> " +
      (w.usage_fa || "-") +
      "<br><br><b>💡 نکتهٔ حفظ:</b> " +
      (w.note || "-");
  }
}

function nextHard() {
  if (!hardList.length) return;
  hardIndex++;
  if (hardIndex >= hardList.length) hardIndex = 0;
  renderHard();
}

function prevHard() {
  if (!hardList.length) return;
  hardIndex--;
  if (hardIndex < 0) hardIndex = hardList.length - 1;
  renderHard();
}

// ------------------ init ------------------

document.addEventListener("DOMContentLoaded", () => {
  if (!computeHardList()) return;

  renderHard();

  const nextBtn = document.getElementById("btnHardNext");
  const prevBtn = document.getElementById("btnHardPrev");
  const speakBtn = document.getElementById("btnSpeakHard");

  if (nextBtn) nextBtn.onclick = nextHard;
  if (prevBtn) prevBtn.onclick = prevHard;

  if (speakBtn) {
    speakBtn.onclick = () => {
      if (!hardList.length) return;
      const w = hardList[hardIndex];
      if (w && w.word && typeof speakTextEn === "function") {
        speakTextEn(w.word);
      }
    };
  }
});
