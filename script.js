// Questions Data
const questions = {
  q1: {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  q2: {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  q3: {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheets"
  },
  q4: {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hyperloop Machine Language",
      "Hyper Transfer Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hypertext Markup Language"
  },
  q5: {
    question: "Which company developed JavaScript?",
    choices: ["Netscape", "Microsoft", "Google", "Oracle"],
    answer: "Netscape"
  }
};

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Convert questions object → array
const qArr = Object.values(questions);

// Load saved progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// =======================
// Render Questions
// =======================

qArr.forEach((q, qIndex) => {
  const qDiv = document.createElement("div");

  const title = document.createElement("p");
  title.textContent = q.question;
  qDiv.appendChild(title);

  q.choices.forEach(choice => {
    const label = document.createElement("label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${qIndex}`;
    radio.value = choice;

    // Restore checked answers after refresh
    if (progress[qIndex] === choice) {
      radio.checked = true;
      radio.setAttribute("checked", "true");
    }

    // Save progress to sessionStorage
    radio.addEventListener("change", () => {
      progress[qIndex] = radio.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));

      // remove checked attribute from other radios in same question
      document
        .querySelectorAll(`input[name="question-${qIndex}"]`)
        .forEach(el => el.removeAttribute("checked"));

      radio.setAttribute("checked", "true");
    });

    label.appendChild(radio);
    label.append(choice);

    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(qDiv);
});

// =======================
// Restore Score from localStorage
// =======================

const storedScore = localStorage.getItem("score");

if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

// =======================
// Submit Quiz
// =======================

submitBtn.addEventListener("click", () => {
  let score = 0;

  qArr.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});