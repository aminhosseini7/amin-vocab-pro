/* =======================================
   Grammar Placement Test – Logic File
   ======================================= */

// ------------------------
// مرحله 1 – سوالات گرامر
// ------------------------

const grammarQuestions = [
  {
    text: "کدام جمله صحیح است؟",
    choices: [
      "He go to school every day.",
      "He goes to school every day.",
      "He going to school every day."
    ],
    correct: 1
  },
  {
    text: "جای خالی را پر کنید:\nI ____ football yesterday.",
    choices: ["play", "played", "playing"],
    correct: 1
  },
  {
    text: "اشتباه جمله را درست کنید:\nShe don't like coffee.",
    choices: [
      "She doesn't like coffee.",
      "She didn't like coffee.",
      "She don't likes coffee."
    ],
    correct: 0
  },
  {
    text: "کدام زمان مناسب است؟\nI ____ here for 5 years.",
    choices: ["am living", "live", "have lived"],
    correct: 2
  },
  {
    text: "Choose correct:\nThey ____ to Canada next month.",
    choices: ["are going", "go", "going"],
    correct: 0
  },
  {
    text: "کدام جمله صحیح است؟",
    choices: [
      "I am agree with you.",
      "I agree with you.",
      "I agreeing with you."
    ],
    correct: 1
  },
  {
    text: "جای خالی را پر کنید:\nHe has been ____ for two hours.",
    choices: ["study", "studied", "studying"],
    correct: 2
  },
  {
    text: "Choose correct preposition:\nI was born ____ 1995.",
    choices: ["at", "in", "on"],
    correct: 1
  },
  {
    text: "کدام ساختار درست است؟",
    choices: [
      "I have saw him yesterday.",
      "I saw him yesterday.",
      "I have seen him yesterday."
    ],
    correct: 1
  },
  {
    text: "Choose correct:\nShe is better ____ math.",
    choices: ["in", "at", "on"],
    correct: 1
  }
];

let grammarIndex = 0;
let grammarScore = 0;
let selectedChoice = null;

// ------------------------
// مرحله 2 – نوشتاری
// ------------------------

const writingTasks = [
  "Write one simple sentence using 'because'.",
  "Write one sentence in past simple about something you did yesterday.",
  "Write 2–3 sentences about your hobbies."
];

let writingIndex = 0;
let writingAnswers = [];

// ------------------------
// عناصر DOM
// ------------------------

const welcomeScreen = document.getElementById("welcome-screen");
const questionScreen = document.getElementById("question-screen");
const writingScreen = document.getElementById("writing-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");

const qTitle = document.getElementById("q-title");
const qText = document.getElementById("q-text");
const qChoices = document.getElementById("q-choices");
const qProgress = document.getElementById("q-progress");

const wTitle = document.getElementById("w-title");
const wText = document.getElementById("w-text");
const wAnswer = document.getElementById("w-answer");

// ------------------------
// مرحله شروع آزمون
// ------------------------

document.getElementById("start-btn").onclick = () => {
  welcomeScreen.style.display = "none";
  questionScreen.style.display = "block";
  loadGrammarQuestion();
};

// ------------------------
// بارگذاری سؤال گرامر
// ------------------------

function loadGrammarQuestion() {
  const q = grammarQuestions[grammarIndex];

  qTitle.textContent = `سؤال ${grammarIndex + 1} از 10`;
  qText.textContent = q.text;

  qProgress.style.width = `${((grammarIndex) / 10) * 100}%`;

  qChoices.innerHTML = "";

  selectedChoice = null;

  q.choices.forEach((c, idx) => {
    let div = document.createElement("div");
    div.className = "choice-option";
    div.textContent = c;
    div.onclick = () => {
      selectedChoice = idx;
      document
        .querySelectorAll(".choice-option")
        .forEach(el => el.classList.remove("choice-selected"));
      div.classList.add("choice-selected");
    };
    qChoices.appendChild(div);
  });
}

document.getElementById("next-question-btn").onclick = () => {
  if (selectedChoice === null) return;

  if (selectedChoice === grammarQuestions[grammarIndex].correct)
    grammarScore++;

  grammarIndex++;

  if (grammarIndex < grammarQuestions.length) {
    loadGrammarQuestion();
  } else {
    questionScreen.style.display = "none";
    writingScreen.style.display = "block";
    loadWritingTask();
  }
};

// ------------------------
// بخش نوشتاری
// ------------------------

function loadWritingTask() {
  wTitle.textContent = `بخش نوشتاری – سؤال ${writingIndex + 1} از 3`;
  wText.textContent = writingTasks[writingIndex];
  wAnswer.value = "";
}

document.getElementById("next-writing-btn").onclick = () => {
  if (wAnswer.value.trim().length < 3) return;

  writingAnswers.push(wAnswer.value.trim());
  writingIndex++;

  if (writingIndex < writingTasks.length) {
    loadWritingTask();
  } else {
    writingScreen.
