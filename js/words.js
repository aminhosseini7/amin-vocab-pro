// js/hard.js
// نمایش فلش‌کارت برای لغات سخت

let aminStateHard = loadState();
const ALL_WORDS = VOCAB || [];

let hardList = [];
let hardIndex = 0;

// ------------- کمک‌تابع‌ها -------------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// لیست لغات سخت را بر اساس state می‌سازد
function computeHardList() {
  hardList = ALL_WORDS.filter((w) => {
    const s = getWordState(aminStateHard, w);
    return classifyWord(s) === "hard";
  });

  const wordEl = document.getElementById("hardWord");
  const meaningEl = document.getElementById("hardMeaning");

  if (!hardList.length) {
    if (wordEl) wordEl.textContent = "فعلاً هیچ لغت سختی نداری 👌";
    if (meaningEl) {
      meaningEl.innerHTML =
        "در بخش «یادگیری»، لغاتی که بلد نیستی را با دکمه ⭐ سخت علامت بزن، بعد بیا اینجا مرورشان کن.";
    }
    return false;
  }

  shuffle(hardList);
  hardIndex = 0;
  return true;
}

// یک لغت سخت را رندر می‌کند
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
      "<br><br><b>💡 نکته:</b> " +
      (w.note || "-");
  }
}

// دکمه‌ی بعدی / قبلی
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

// ------------- init -------------

document.addEventListener("DOMContentLoaded", () => {
  if (!computeHardList()) return;

  renderHard();

  const btnNext = document.getElementById("btnHardNext");
  const btnPrev = document.getElementById("btnHardPrev");
  const speakBtn = document.getElementById("btnSpeakHard");

  if (btnNext) btnNext.onclick = nextHard;
  if (btnPrev) btnPrev.onclick = prevHard;

  if (speakBtn) {
    speakBtn.onclick = () => {
      if (!hardList.length) return;
      const w = hardList[hardIndex];
      if (w && w.word) speakTextEn(w.word);
    };
  }
});
