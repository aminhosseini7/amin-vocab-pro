let aminTestState = loadState();
let testWords = VOCAB || [];
let quizAnswer = null;
let quizLocked = false;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function newQuiz() {
  if (!testWords.length) return;
  quizLocked = false;
  document.getElementById("quizStats").textContent = "";

  const idx = Math.floor(Math.random() * testWords.length);
  const w = testWords[idx];
  quizAnswer = w;
  document.getElementById("quizWord").textContent = w.word;

  const options = [w];
  while (options.length < 4 && options.length < testWords.length) {
    const r = testWords[Math.floor(Math.random() * testWords.length)];
    if (!options.includes(r)) options.push(r);
  }
  shuffle(options);

  const container = document.getElementById("quizOptions");
  container.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.meaning_fa || "";
    btn.dataset.wordId = opt.id;
    btn.onclick = () => chooseOption(opt, btn);
    container.appendChild(btn);
  });
}

function chooseOption(opt, clickedBtn) {
  if (quizLocked) return;
  quizLocked = true;

  const statsEl = document.getElementById("quizStats");
  const ws = getWordState(aminTestState, quizAnswer);
  ws.seen += 1;
  ws.lastSeen = Date.now();

  const container = document.getElementById("quizOptions");
  const buttons = Array.from(container.querySelectorAll("button"));

  if (opt.id === quizAnswer.id) {
    ws.correct += 1;
    updateSRSState(ws, 4);
    statsEl.textContent = "آفرین! درست جواب دادی 🎉";
  } else {
    ws.wrong += 1;
    ws.hard = true;
    updateSRSState(ws, 2);
    statsEl.textContent = "اشتباه بود. گزینه‌ی درست با سبز مشخص شد و لغت به سخت‌ها رفت.";
  }

  buttons.forEach(b => {
    b.disabled = true;
    const isCorrect = b.dataset.wordId === String(quizAnswer.id);
    if (isCorrect) {
      b.style.background = "#16a34a";
    }
  });
  if (opt.id !== quizAnswer.id) {
    clickedBtn.style.background = "#dc2626";
  }

  saveState(aminTestState);
}

document.addEventListener("DOMContentLoaded", () => {
  newQuiz();
  document.getElementById("btnNewQuiz").onclick = newQuiz;

  const speakBtn = document.getElementById("btnSpeakTest");
  if (speakBtn) {
    speakBtn.onclick = () => {
      if (quizAnswer && quizAnswer.word) {
        speakTextEn(quizAnswer.word);
      }
    };
  }
});
