// Use the same questions the test expects
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "What is the largest country by area?",
    choices: ["China", "USA", "Russia", "Canada"],
    answer: 2
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: 1
  },
  {
    question: "What is the boiling point of water?",
    choices: ["90°C", "95°C", "100°C", "110°C"],
    answer: 2
  },
  {
    question: "Which planet is closest to the Sun?",
    choices: ["Mercury", "Venus", "Earth", "Mars"],
    answer: 0
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
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render questions
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `<p>${q.question}</p>`;

  q.choices.forEach((choice, i) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = choice;

    // Restore saved progress
    if (progress[index] == i) {
      input.checked = true;
      input.setAttribute("checked", "true"); // ✅ Cypress requires attribute
    }

    input.addEventListener("change", () => {
      progress[index] = i;
      sessionStorage.setItem("progress", JSON.stringify(progress));

      // Ensure only one checked attribute per group
      document.querySelectorAll(`input[name="q${index}"]`).forEach(el => {
        el.removeAttribute("checked");
      });
      input.setAttribute("checked", "true");
    });

    const label = document.createElement("label");
    label.textContent = choice;

    questionDiv.appendChild(input);
    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(questionDiv);
});

// Handle submit
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] == q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
