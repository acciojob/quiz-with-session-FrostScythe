// Use the same questions the test expects
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
    correct: 1
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "120°C", "80°C"],
    correct: 1
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
