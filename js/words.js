// js/words.js
// نمایش همه‌ی لغات + وضعیت (جدید / سخت / بلد)

let aminWordsState = loadState();
const allWords = VOCAB || [];

// لیست یکتای درس‌ها
function getUniqueLessonsWords() {
  const set = new Set();
  for (let w of allWords) {
    if (w.lesson !== undefined && w.lesson !== null && w.lesson !== "") {
      set.add(String(w.lesson));
    }
  }
  return Array.from(set).sort();
}

// statusFilter: "all" | "new" | "known" | "hard"
// lessonFilter: "all" | "<lesson-id>"
function renderWordsTable(filterText = "", statusFilter = "all", lessonFilter = "all") {
  const tbody = document.querySelector("#wordsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  let hardCount = 0;
  let knownCount = 0;
  let newCount = 0;

  const txt = (filterText || "").toLowerCase();

  for (let w of allWords) {
    const ws = getWordState(aminWordsState, w);
    const status = classifyWord(ws); // "new" | "hard" | "known"

    // آمار کلی
    if (status === "hard") hardCount++;
    else if (status === "known") knownCount++;
    else newCount++;

    // فیلتر بر اساس وضعیت
    if (statusFilter !== "all" && status !== statusFilter) {
      continue;
    }

    // فیلتر بر اساس درس
    if (lessonFilter !== "all") {
      const ls = (w.lesson !== undefined && w.lesson !== null) ? String(w.lesson) : "";
      if (ls !== lessonFilter) {
        continue;
      }
    }

    // فیلتر بر اساس متن جستجو (کلمه یا معنی)
    if (txt) {
      const wordText = (w.word || "").toLowerCase();
      const meaningText = (w.meaning_fa || "").toLowerCase();
      if (!wordText.includes(txt) && !meaningText.includes(txt)) {
        continue;
      }
    }

    // ساخت سطر جدول
    const tr = document.createElement("tr");
    const tdWord = document.createElement("td");
    const tdMeaning = document.createElement("td");
    const tdStatus = document.createElement("td");

    tdWord.textContent = w.word;
    tdMeaning.textContent = w.meaning_fa || "";

    const span = document.createElement("span");
    span.classList.add("status-pill");

    if (status === "hard") {
      span.classList.add("status-hard");
      span.textContent = "سخت";
    } else if (status === "known") {
      span.classList.add("status-known");
      span.textContent = "بلد";
    } else {
      span.classList.add("status-new");
      span.textContent = "جدید";
    }

    tdStatus.appendChild(span);

    tr.appendChild(tdWord);
    tr.appendChild(tdMeaning);
    tr.appendChild(tdStatus);
    tbody.appendChild(tr);
  }

  const summary = document.getElementById("wordsSummary");
  if (summary) {
    summary.textContent =
      "کل لغات: " + allWords.length +
      " | سخت: " + hardCount +
      " | بلد: " + knownCount +
      " | جدید: " + newCount;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const statusSelect = document.getElementById("statusFilter");
  const lessonSelect = document.getElementById("lessonFilterWords");

  // اگر دراپ‌داون درس‌ها در HTML موجود است، پرش می‌کنیم
  if (lessonSelect) {
    lessonSelect.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = "همهٔ دروس";
    lessonSelect.appendChild(optAll);

    const lessons = getUniqueLessonsWords();
    lessons.forEach(ls => {
      const opt = document.createElement("option");
      opt.value = ls;
      opt.textContent = "درس " + ls;
      lessonSelect.appendChild(opt);
    });
  }

  function updateTable() {
    const txt = searchInput ? searchInput.value.trim() : "";
    const st = statusSelect ? statusSelect.value : "all";
    const ls = lessonSelect ? lessonSelect.value : "all";
    renderWordsTable(txt, st, ls);
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateTable);
  }
  if (statusSelect) {
    statusSelect.addEventListener("change", updateTable);
  }
  if (lessonSelect) {
    lessonSelect.addEventListener("change", updateTable);
  }

  // اولین رندر
  updateTable();
});
