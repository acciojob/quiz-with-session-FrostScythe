// Use the same questions the test expects
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    answer: 1
  },
  {
    question: "Who developed the theory of relativity?",
    choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    answer: 1
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Osmium", "Oxygen", "Gold", "Zinc"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
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
  questionDiv.innerHTML = `<p>${q.question}</p>`;

  q.options.forEach((option, i) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = option;

    // Restore saved progress
    if (progress[index] == i) {
      input.checked = true;   // ✅ fix checked state
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
