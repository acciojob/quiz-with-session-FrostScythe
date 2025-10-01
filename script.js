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
