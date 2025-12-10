// js/words.js
// نمایش همه‌ی لغات + وضعیت (جدید / سخت / بلد) + فیلتر بر اساس درس

let aminWordsState = loadState();
const allWords = VOCAB || [];

// statusFilter: "all" | "new" | "known" | "hard"
// lessonFilter: "all" یا شماره درس به‌صورت رشته مثل "1", "2", ...
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
    const lesson = (w.lesson != null && w.lesson !== "")
      ? String(w.lesson)
      : "";
    if (lessonFilter !== "all" && lesson !== lessonFilter) {
      continue;
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
  const lessonSelect = document.getElementById("lessonFilter");

  // پر کردن لیست درس‌ها از روی VOCAB
  if (lessonSelect) {
    const lessonsSet = new Set();

    allWords.forEach(w => {
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

