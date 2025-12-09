// ====================== HARD WORDS VIEW ======================

let aminStateHard = loadState();
const ALL_WORDS = VOCAB || [];

let hardList = [];
let hardIndex = 0;

// ------------------ کمک‌تابع‌ها ------------------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ساخت لیست به‌روز سخت‌ها
function computeHardList() {
  hardList = ALL_WORDS.filter((w) => {
    const s = getWordState(aminStateHard, w);
    return classifyWord(s) === "hard";
  });

  if (!hardList.length) {
    document.getElementById("hardWord").textContent =
      "هیچ لغت سختی هنوز وجود ندارد 👌";
    document.getElementById("hardMeaning").innerHTML =
      "در بخش یادگیری، لغات اشتباه را با ⭐ سخت علامت بزن.";
    return false;
  }

  shuffle(hardList);
  hardIndex = 0;
  return true;
}

function renderHard() {
  if (!hardList.length) return;

  const w = hardList[hardIndex];

  document.getElementById("hardWord").textContent = w.word;

  document.getElementById("hardMeaning").innerHTML =
    "<b>📘 معنی:</b> " + (w.meaning_fa || "-") +
    "<br><br><b>✏ مثال:</b> " + (w.example_en || "-") +
    "<br><br><b>📌 کاربرد:</b> " + (w.usage_fa || "-") +
    "<br><br><b>💡 نکته:</b> " + (w.note || "-");
}

function nextHard() {
  hardIndex++;
  if (hardIndex >= hardList.length) hardIndex = 0;
  renderHard();
}

function prevHard() {
  hardIndex--;
  if (hardIndex < 0) hardIndex = hardList.length - 1;
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
