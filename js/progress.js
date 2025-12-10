// js/progress.js
// نمایش آمار کلی + وضعیت هر درس (کل، بلد، سخت، جدید، درصد بلد)

let aminState = loadState();
const allWords = VOCAB || [];

function buildLessonStats() {
  const statsDiv = document.getElementById("progressStats");
  if (!statsDiv) return;

  if (!allWords.length) {
    statsDiv.textContent = "هیچ لغتی در دیتابیس پیدا نشد.";
    return;
  }

  // آمار کلی
  let total = allWords.length;
  let known = 0;
  let hard = 0;
  let neu = 0;

  // map: lesson → { total, known, hard, neu }
  const lessonsMap = new Map();

  for (const w of allWords) {
    const lesson = (typeof w.lesson !== "undefined" ? w.lesson : "بدون‌درس");
    const ws = getWordState(aminState, w);
    const status = classifyWord(ws); // "new" | "hard" | "known"

    if (!lessonsMap.has(lesson)) {
      lessonsMap.set(lesson, { total: 0, known: 0, hard: 0, neu: 0 });
    }
    const ls = lessonsMap.get(lesson);

    ls.total++;

    if (status === "known") {
      known++;
      ls.known++;
    } else if (status === "hard") {
      hard++;
      ls.hard++;
    } else {
      neu++;
      ls.neu++;
    }
  }

  // مرتب‌سازی درس‌ها (عددی‌ها اول، «بدون‌درس» آخر)
  const lessonKeys = Array.from(lessonsMap.keys()).sort((a, b) => {
    const na = typeof a === "number" ? a : 1e9;
    const nb = typeof b === "number" ? b : 1e9;
    return na - nb;
  });

  let html = "";

  // خط آمار کلی
  html +=
    "کل لغات: " + total +
    " | بلد: " + known +
    " | سخت: " + hard +
    " | جدید: " + neu +
    "<br><br>";

  // جدول درس به درس
  html += '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
  html +=
    '<thead><tr>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">درس</th>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">کل</th>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">بلد</th>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">سخت</th>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">جدید</th>' +
      '<th style="text-align:right;border-bottom:1px solid rgba(148,163,184,0.4);padding:4px 6px;">٪ بلد</th>' +
    '</tr></thead><tbody>';

  for (const k of lessonKeys) {
    const ls = lessonsMap.get(k);
    const pctKnown = ls.total ? Math.round((ls.known / ls.total) * 100) : 0;
    const lessonLabel = (k === "بدون‌درس" ? "بدون‌درس" : "درس " + k);

    html +=
      '<tr>' +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + lessonLabel + "</td>" +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + ls.total + "</td>" +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + ls.known + "</td>" +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + ls.hard + "</td>" +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + ls.neu + "</td>" +
        '<td style="padding:4px 6px;border-bottom:1px solid rgba(31,41,55,0.7);">' + pctKnown + "%</td>" +
      "</tr>";
  }

  html += "</tbody></table>";

  statsDiv.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", buildLessonStats);
