// ====================== HARD WORDS VIEW ======================

// داده‌ها
let aminStateHard = loadState();
const ALL_WORDS = VOCAB || [];

// سخت‌ها را ذخیره می‌کنیم
let hardList = [];
let hardIndex = 0;

// ------------------ کمک‌تابع‌ها ------------------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// لیست سخت‌ها را بازسازی می‌کند
function computeHardList() {
  hardList = ALL_WORDS.filter((w) => {
    const s = getWordState(aminStateHard, w);
    return classifyWord(s) === "hard";
  });

  if (!hardList.length) {
    document.getElementById("hardWord").textContent = "فعلاً هیچ لغت سختی نداری 👌";
    document.getElementById("hardMeaning").innerHTML =
      "از بخش یادگیری، لغات را با دکمه ⭐ سخت علامت بزن!";
    return false;
  }

  // اگر بار اول است، shuffle و ذخیره index
  if (!localStorage.hard_order_created) {
    shuffle(hardList);
    hardIndex = 0;
    localStorage.hard_order_created = "yes";
    localStorage.hard_current_index = "0";
  } else {
    hardIndex = Number(localStorage.hard_current_index || 0);
    if (hardIndex >= hardList.length) hardIndex = 0;
  }

  return true;
}

// نمایش یک لغت سخت
function renderHard() {
  if (!hardList.length) return;

  const w = hardList[hardIndex];

  document.getElementById("hardWord").textContent = w.word;

  document.getElementById("hardMeaning").innerHTML =
    "<b>📘 معنی:</b> " +
    (w.meaning_fa || "-") +
    "<br><br><b>✏ مثال:</b> " +
    (w.example_en || "-") +
    "<br><br><b>📌 کاربرد:</b> " +
    (w.usage_fa || "-") +
    "<br><br><b>💡 نکته:</b> " +
    (w.note || "-");
}

// دکمه قبلی / بعدی
function nextHard() {
  hardIndex++;
  if (hardIndex >= hardList.length) hardIndex = 0;
  localStorage.hard_current_index = String(hardIndex);
  renderHard();
}

function prevHard() {
  hardIndex--;
  if (hardIndex < 0) hardIndex = hardList.length - 1;
  localStorage.hard_current_index = String(hardIndex);
  renderHard();
}

// ------------------ init ------------------

document.addEventListener("DOMContentLoaded", () => {
  if (!computeHardList()) return;

  renderHard();

  document.getElementById("btnHardNext").onclick = nextHard;
  document.getElementById("btnHardPrev").onclick = prevHard;

  const speakBtn = document.getElementById("btnSpeakHard");
  if (speakBtn) {
    speakBtn.onclick = () => {
      const w = hardList[hardIndex];
      speakTextEn(w.word);
    };
  }
});
