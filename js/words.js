// js/words.js
// نمایش همه‌ی لغات + وضعیت (جدید / سخت / بلد) + فیلتر بر اساس درس
// و حفظ فیلترها بین رفت‌وآمد بین صفحات با localStorage

let aminWordsState = loadState();
const allWords = VOCAB || [];

// کلید ذخیره‌سازی تنظیمات فیلتر
const WORDS_FILTER_STATE_KEY = "amin_words_filters_v1";

// ذخیره وضعیت فیلترها
function saveWordsFilterState(filterText, statusFilter, lessonFilter) {
  try {
    const obj = {
      filterText: filterText || "",
      statusFilter: statusFilter || "all",
      lessonFilter: lessonFilter || "all",
    };
    localStorage.setItem(WORDS_FILTER_STATE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn("Cannot save words filter state:", e);
  }
}

// لود وضعیت فیلترها
function loadWordsFilterState() {
  try {
    const raw = localStorage.getItem(WORDS_FILTER_STATE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (e) {
    console.warn("Cannot load words filter state:", e);
    return {};
  }
}

// statusFilter: "all" | "new" | "known" | "hard"
// lessonFilter: "all" | شماره درس به صورت رشته
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

    // فیلتر بر اساس درس (در صورتی که lessonFilter != "all")
    if (lessonFilter !== "all") {
      const wl = (w.lesson != null ? String(w.lesson) : "");
      if (wl !== String(lessonFilter)) {
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
  const lessonSelect = document.getElementById("lessonFilter");

  // اول، تنظیمات ذخیره‌شده را لود کن
  const saved = loadWordsFilterState();

  if (searchInput && typeof saved.filterText === "string") {
    searchInput.value = saved.filterText;
  }
  if (statusSelect && saved.statusFilter) {
    statusSelect.value = saved.statusFilter;
  }
  if (lessonSelect && saved.lessonFilter) {
    lessonSelect.value = saved.lessonFilter;
  }

  function updateTable() {
    const txt = searchInput ? searchInput.value.trim() : "";
    const st = statusSelect ? statusSelect.value : "all";
    const lf = lessonSelect ? lessonSelect.value : "all";

    // هر بار که فیلتر عوض می‌شود، در localStorage ذخیره‌اش کن
    saveWordsFilterState(txt, st, lf);
    renderWordsTable(txt, st, lf);
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

  // اولین رندر بر اساس تنظیمات ذخیره‌شده (یا پیش‌فرض)
  updateTable();
});
