const questionsData = [
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "JS is used for?",
    options: ["Styling", "Structure", "Logic", "Database"],
    answer: "Logic"
  },
  {
    question: "CSS stands for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheets",
      "Color Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");


// 👉 Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// =======================
// Render questions
// =======================
questionsData.forEach((q, qIndex) => {
  const qDiv = document.createElement("div");

  const title = document.createElement("p");
  title.textContent = q.question;
  qDiv.appendChild(title);

  q.options.forEach(option => {
    const label = document.createElement("label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${qIndex}`;
    radio.value = option;

    // 👉 Restore checked state after refresh
    if (progress[qIndex] === option) {
      radio.checked = true;
    }

    // 👉 Save progress to sessionStorage
    radio.addEventListener("change", () => {
      progress[qIndex] = option;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(radio);
    label.append(option);
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(qDiv);
});


// =======================
// Show stored score if exists
// =======================
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}


// =======================
// Submit logic
// =======================
submitBtn.addEventListener("click", () => {
  let score = 0;

  questionsData.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // 👉 Store in localStorage
  localStorage.setItem("score", score);
});
