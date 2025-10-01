// Quiz Questions
const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correct: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    correct: 0
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    correct: 1
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    correct: 0
  }
];

// DOM elements
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from session storage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load previous score from local storage
let savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${quizData.length}.`;
}

// Render questions
quizData.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  q.options.forEach((option, i) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = i;

    // Restore saved progress
    if (progress[index] == i) {
      input.checked = true;
    }

    input.addEventListener("change", () => {
      progress[index] = i;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    const label = document.createElement("label");
    label.textContent = option;

    questionDiv.appendChild(input);
    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(questionDiv);
});

// Handle submit
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (progress[index] == q.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${quizData.length}.`;
  localStorage.setItem("score", score);
});
