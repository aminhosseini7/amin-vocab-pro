let aminHardState = loadState();
let metaHard = loadMeta();
let hardWords = [];
let hardIndex = 0;
let wordsHard = VOCAB || [];

function ensureTodayMetaHard() {
  if (metaHard.date !== todayStr()) {
    metaHard = {
      date: todayStr(),
      secondsToday: 0,
      learnedToday: 0,
      hardMasteredToday: 0
    };
    saveMeta(metaHard);
  }
}

function loadHardWords() {
  hardWords = wordsHard.filter(w => {
    const ws = getWordState(aminHardState, w);
    return ws.hard;
  });
  if (!hardWords.length) {
    document.getElementById("hardWord").textContent =
      "هنوز لغت سختی ثبت نشده.";
    document.getElementById("meaningHard").style.display = "none";
    document.getElementById("hardStats").textContent = "";
    return;
  }
  if (hardIndex >= hardWords.length) hardIndex = 0;
  if (hardIndex < 0) hardIndex = 0;
  renderHard();
}

function renderHard() {
  if (!hardWords.length) { loadHardWords(); return; }
  const w = hardWords[hardIndex];
  const ws = getWordState(aminHardState, w);
  document.getElementById("hardWord").textContent = w.word;
  const box = document.getElementById("meaningHard");
  box.style.display = "none";
  box.innerHTML = "";
  document.getElementById("hardStats").innerHTML =
    "تعداد لغات سخت: " + hardWords.length +
    " | دفعات دیده شدن این لغت: " + ws.seen +
    " | صحیح: " + ws.correct +
    " | غلط: " + ws.wrong;
}

function showMeaningHardFn() {
  if (!hardWords.length) return;
  const w = hardWords[hardIndex];
  const box = document.getElementById("meaningHard");
  box.style.display = "block";
  box.innerHTML =
    "<b>معنی:</b> " + (w.meaning_fa || "") + "<br><br>" +
    "<b>مثال:</b> " + (w.example_en || "") + "<br><br>" +
    "<b>کاربرد:</b> " + (w.usage_fa || "") + "<br><br>" +
    "<b>نکته:</b> " + (w.note || "");
}

function hardAnswer(known) {
  if (!hardWords.length) return;
  const w = hardWords[hardIndex];
  const ws = getWordState(aminHardState, w);
  ws.seen += 1;
  ws.lastSeen = Date.now();
  if (known) {
    ws.correct += 1;
    updateSRSState(ws, 4);
  } else {
    ws.wrong += 1;
    updateSRSState(ws, 2);
  }
  saveState(aminHardState);
  hardIndex++;
  if (hardIndex >= hardWords.length) hardIndex = 0;
  loadHardWords();
}

function removeHard() {
  if (!hardWords.length) return;
  const w = hardWords[hardIndex];
  const ws = getWordState(aminHardState, w);
  if (ws.hard) {
    ws.hard = false;
    saveState(aminHardState);
    ensureTodayMetaHard();
    metaHard.hardMasteredToday += 1;
    saveMeta(metaHard);
    alert("از لیست سخت‌ها حذف شد (یک سختِ یادگرفته‌شده).");
  }
  loadHardWords();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHardWords();
  document.getElementById("showMeaningHard").onclick = showMeaningHardFn;
  document.getElementById("btnHardKnow").onclick = () => hardAnswer(true);
  document.getElementById("btnHardDontKnow").onclick = () => hardAnswer(false);
  document.getElementById("btnRemoveHard").onclick = removeHard;

  const speakBtn = document.getElementById("btnSpeakHard");
  if (speakBtn) {
    speakBtn.onclick = () => {
      if (!hardWords.length) return;
      const w = hardWords[hardIndex];
      if (w && w.word) {
        speakTextEn(w.word);
      }
    };
  }
});
