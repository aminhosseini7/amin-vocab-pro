let aminProgState = loadState();
let progWords = VOCAB || [];
let metaProg = loadMeta();

document.addEventListener("DOMContentLoaded", () => {
  const total = progWords.length;
  let hardCount = 0, knownCount = 0, learningCount = 0, newCount = 0;
  let totalReviews = 0;

  for (let w of progWords) {
    const ws = getWordState(aminProgState, w);
    totalReviews += ws.seen || 0;
    const c = classifyWord(ws);
    if (c === "hard") hardCount++;
    else if (c === "known") knownCount++;
    else if (c === "learning") learningCount++;
    else newCount++;
  }

  // اهداف را مثل flashcards.js نگه می‌داریم
  const DAILY_TIME_GOAL_MIN = 30;
  const DAILY_NEW_WORD_GOAL = 20;
  const DAILY_HARD_GOAL = 5;

  const statsEl = document.getElementById("progressStats");
  statsEl.innerHTML =
    "کل لغات: " + total + "<br>" +
    "لغات سخت (فعلی): " + hardCount + "<br>" +
    "لغات بلد: " + knownCount + "<br>" +
    "در حال یادگیری: " + learningCount + "<br>" +
    "لغات جدید: " + newCount + "<br>" +
    "تعداد کل دفعات مرور (همه روزها): " + totalReviews + "<br><br>" +
    "📅 امروز (" + metaProg.date + ")<br>" +
    "⏱ زمان مطالعه امروز: " + Math.floor(metaProg.secondsToday / 60) +
      " دقیقه (هدف: " + DAILY_TIME_GOAL_MIN + " دقیقه)<br>" +
    "✅ لغات جدید یادگرفته‌شده امروز: " +
      metaProg.learnedToday + " / " + DAILY_NEW_WORD_GOAL + "<br>" +
    "🔥 لغات سختِ یادگرفته‌شده امروز: " +
      metaProg.hardMasteredToday + " / " + DAILY_HARD_GOAL;
});
