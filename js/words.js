// js/words.js
// نمایش جدول همه‌ی لغات + وضعیت آن‌ها (جدید / بلد / سخت)

let aminWordsState = loadState();
let allWords = VOCAB || [];

// statusFilter: "all" | "new" | "known" | "hard"
function renderWordsTable(filterText = "", statusFilter = "all") {
  const tbody = document.querySelector("#wordsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  let hardCount = 0;
  let knownCount = 0;
  let newCount = 0;

  const txt = (filterText || "").toLowerCase();
  const validFilters = ["all", "new", "known", "hard"];
  if (!validFilters.includes(statusFilter)) {
    statusFilter = "all";
  }

  for (let w of allWords) {
    const ws = getWordState(aminWordsState, w);
    const status = classifyWord(ws); // فقط: "new" | "known" | "hard"

    // شمارش آمار کلی
    if (status === "hard") hardCount++;
    else if (status === "known") knownCount++;
    else newCount++;

    // فیلتر بر اساس وضعیت انتخابی
    if (statusFilter !== "all" && status !== statusFilter) {
      continue;
    }

    // فیلتر بر اساس متن جستجو
    if (txt) {
      const wordText = (w.word || "").toLowerCase();
      const meaningText = (w.meaning_fa || "").toLowerCase();
      if (!wordText.includes(txt) && !meaningText.includes(txt)) {
        continue;
      }
    }

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
      // new
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

  function updateTable() {
    const txt = searchInput ? searchInput.value.trim() : "";
    const st = statusSelect ? statusSelect.value : "all";
    renderWordsTable(txt, st);
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateTable);
  }
  if (statusSelect) {
    statusSelect.addEventListener("change", updateTable);
  }

  // اولین رندر
  updateTable();
});
