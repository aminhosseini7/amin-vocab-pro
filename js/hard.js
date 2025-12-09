// js/hard.js
// فلش‌کارت برای کلمات سخت (hard) با دکمه «نمایش معنی»

let aminStateHard = loadState();
const ALL_WORDS_HARD = VOCAB || [];

let hardList = [];
let hardIndex = 0;
let hardMeaningVisible = false;

// ---------- کمک‌تابع ----------

function shuffleHard(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// هر بار لیست سخت‌ها را از روی state واقعی می‌سازد
function computeHardList() {
  hardList = ALL_WORDS_HARD.filter((w) => {
    const s = getWordState(aminStateHard, w);
    return classifyWord(s) === "hard";
  });

  const wordEl = document.getElementById("hardWord");
  const box = document.getElementById("hardMeaningBox");
  const btnShow = document.getElementById("btnShowHardMeaning");

  if (!hardList.length) {
    if (wordEl) wordEl.textContent = "فعلاً هیچ لغت سختی نداری 👌";
    if (box) {
      box.style.display = "block";
      box.innerHTML =
        "از بخش «یادگیری» لغات را با دکمه ⭐ سخت علامت بزن یا در تست، چند بار غلط بزن تا اینجا ظاهر شوند.";
    }
    if (btnShow) btnShow.style.display = "none";
    return false;
  }

  shuffleHard(hardList);
  hardIndex = 0;
  hardMeaningVisible = false;
  if (btnShow) btnShow.style.display = "inline-block";
  return true;
}

function renderHard() {
  if (!hardList.length) return;

  const w = hardList[hardIndex];
  const wordEl = document.getElementById("hardWord");
  const box = document.getElementById("hardMeaningBox");
  const btnShow = document.getElementById("btnShowHardMeaning");

  if (wordEl) wordEl.textContent = w.word;

  if (box) {
    if (!hardMeaningVisible) {
      box.style.display = "none";
      box.innerHTML = "";
    } else {
      box.style.display = "block";
      box.innerHTML =
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

  if (btnShow) {
    btnShow.textContent = hardMeaningVisible ? "پنهان کردن معنی" : "نمایش معنی";
  }
}

function toggleHardMeaning() {
  hardMeaningVisible = !hardMeaningVisible;
  renderHard();
}

function nextHard() {
  if (!hardList.length) return;
  hardIndex++;
  if (hardIndex >= hardList.length) hardIndex = 0;
  hardMeaningVisible = false;
  renderHard();
}

function prevHard() {
  if (!hardList.length) return;
  hardIndex--;
  if (hardIndex < 0) hardIndex = hardList.length - 1;
  hardMeaningVisible = false;
  renderHard();
}

// ---------- init ----------

document.addEventListener("DOMContentLoaded", () => {
  if (!computeHardList()) return;

  renderHard();

  const nextBtn = document.getElementById("btnHardNext");
  const prevBtn = document.getElementById("btnHardPrev");
  const speakBtn = document.getElementById("btnSpeakHard");
  const showBtn = document.getElementById("btnShowHardMeaning");

  if (nextBtn) nextBtn.onclick = nextHard;
  if (prevBtn) prevBtn.onclick = prevHard;
  if (showBtn) showBtn.onclick = toggleHardMeaning;

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
