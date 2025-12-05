let aminWordsState = loadState();
let allWords = VOCAB || [];

// statusFilter: "all" | "new" | "learning" | "known" | "hard"
function renderWordsTable(filterText = "", statusFilter = "all") {
  const tbody = document.querySelector("#wordsTable tbody");
  tbody.innerHTML = "";

  let hardCount = 0, knownCount = 0, learningCount = 0, newCount = 0;

  const txt = (filterText || "").toLowerCase();

  for (let w of allWords) {
    const ws = getWordState(aminWordsState, w);
    const status = classifyWord(ws);

    // شمارش آمار کلی
    if (status === "hard") hardCount++;
    else if (status === "known") knownCount++;
    else if (status === "learning") learningCount++;
    else newCount++;

    // فیلتر بر اساس وضعیت
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
    if (status === "hard") span.classList.add("status-hard");
    if (status === "known") span.classList.add("status-known");
    if (status === "learning") span.classList.add("status-learning");

    span.textContent =
      status === "hard" ? "سخت" :
      status === "known" ? "بلد" :
      status === "learning" ? "در حال یادگیری" : "جدید";

    tdStatus.appendChild(span);

    tr.appendChild(tdWord);
    tr.appendChild(tdMeaning);
    tr.appendChild(tdStatus);
    tbody.appendChild(tr);
  }

  const summary = document.getElementById("wordsSummary");
  summary.textContent =
    "کل لغات: " + allWords.length +
    " | سخت: " + hardCount +
    " | بلد: " + knownCount +
    " | در حال یادگیری: " + learningCount +
    " | جدید: " + newCount;
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const statusSelect = document.getElementById("statusFilter");

  function updateTable() {
    const txt = searchInput.value.trim();
    const st = statusSelect.value;
    renderWordsTable(txt, st);
  }

  searchInput.addEventListener("input", updateTable);
  statusSelect.addEventListener("change", updateTable);

  // اولین رندر
  updateTable();
});
