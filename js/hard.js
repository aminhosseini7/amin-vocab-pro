// js/hard.js
// فلش‌کارت برای کلمات سخت (hard) با دکمه «نمایش معنی» و «یاد گرفتم» + فیلتر درس

let aminStateHard = loadState();
const ALL_WORDS_HARD = VOCAB || [];

let hardList = [];
let hardIndex = 0;
let hardMeaningVisible = false;
let currentHardLesson = "all"; // فیلتر فعلی درس

// ---------- کمک‌تابع ----------

function shuffleHard(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// هر بار لیست سخت‌ها را از روی state واقعی و فیلتر درس می‌سازد
function computeHardList() {
  const lessonFilter = currentHardLesson;

  hardList = ALL_WORDS_HARD.filter((w) => {
    const s = getWordState(aminStateHard, w);
    if (classifyWord(s) !== "hard") return false;

    const lesson = (w.lesson != null && w.lesson !== "")
      ? String(w.lesson)
      : "";

    if (lessonFilter !== "all" && lesson !== lessonFilter) {
      return false;
    }

    return true;
  });

  const wordEl = document.getElementById("hardWord");
  const box = document.getElementById("hardMeaningBox");
  const btnShow = document.getElementById("btnShowHardMeaning");
  const btnMark = document.getElementById("btnHardMarkKnown");

  if (!hardList.length) {
    if (wordEl) {
      if (lessonFilter === "all") {
        wordEl.textContent = "فعلاً هیچ لغت سختی نداری 👌";
      } else {
        wordEl.textContent = "در این درس فعلاً هیچ لغت سختی نداری 👌";
      }
    }
    if (box) {
      box.style.display = "block";
      if (lessonFilter === "all") {
        box.innerHTML =
          "از بخش «یادگیری» لغات را با دکمه ⭐ سخت علامت بزن یا در تست، چند بار غلط بزن تا اینجا ظاهر شوند.";
      } else {
        box.innerHTML =
          "برای این درس هنوز لغتی را به‌عنوان سخت علامت نزدی. از بخش «یادگیری» با ⭐ می‌توانی اضافه کنی.";
      }
    }
    if (btnShow) btnShow.style.display = "none";
    if (btnMark) btnMark.style.display = "none";
    return false;
  }

  shuffleHard(hardList);
  hardIndex = 0;
  hardMeaningVisible = false;

  if (btnShow) btnShow.style.display = "inline-block";
  if (btnMark) btnMark.style.display = "inline-block";
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

// لغت فعلی را از «سخت» خارج و به «بلد» تبدیل می‌کند
function markHardAsKnown() {
  if (!hardList.length) return;

  const w = hardList[hardIndex];
  const s = getWordState(aminStateHard, w);

  // از سخت‌ها خارج شود
  s.hard = false;
  s.wrong = 0;

  // حتماً حداقل یک بار درست داشته باشد تا در classifyWord → known شود
  if (s.correct < 1) s.correct = 1;

  // یک آپدیت SRS با نمره خوب
  updateSRSState(s, 5);

  saveState(aminStateHard);

  // لیست سخت‌ها را دوباره بساز بر اساس فیلتر فعلی درس
  if (!computeHardList()) {
    // یعنی دیگر در این درس (یا کلاً) لغت سختی نداریم
    return;
  }
  renderHard();
}

// ---------- init ----------

document.addEventListener("DOMContentLoaded", () => {
  // پر کردن لیست درس‌ها برای سخت‌ها
  const lessonSelect = document.getElementById("hardLessonFilter");
  if (lessonSelect) {
    const lessonsSet = new Set();

    ALL_WORDS_HARD.forEach(w => {
      if (w.lesson != null && w.lesson !== "") {
        lessonsSet.add(String(w.lesson));
      }
    });

    const sortedLessons = Array.from(lessonsSet).sort((a, b) => {
      const na = Number(a), nb = Number(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a.localeCompare(b);
    });

    lessonSelect.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = "همهٔ درس‌ها";
    lessonSelect.appendChild(optAll);

    sortedLessons.forEach(ls => {
      const opt = document.createElement("option");
      opt.value = ls;
      opt.textContent = "درس " + ls;
      lessonSelect.appendChild(opt);
    });

    lessonSelect.addEventListener("change", () => {
      currentHardLesson = lessonSelect.value || "all";
      if (!computeHardList()) return;
      renderHard();
    });
  }

  if (!computeHardList()) return;

  renderHard();

  const nextBtn = document.getElementById("btnHardNext");
  const prevBtn = document.getElementById("btnHardPrev");
  const speakBtn = document.getElementById("btnSpeakHard");
  const showBtn = document.getElementById("btnShowHardMeaning");
  const markBtn = document.getElementById("btnHardMarkKnown");

  if (nextBtn) nextBtn.onclick = nextHard;
  if (prevBtn) prevBtn.onclick = prevHard;
  if (showBtn) showBtn.onclick = toggleHardMeaning;
  if (markBtn) markBtn.onclick = markHardAsKnown;

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
