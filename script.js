const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Convert questions object → array
const qArr = Object.values(questions);

// Load saved progress
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

    // Restore checked answers
    if (progress[qIndex] === choice) {
      radio.checked = true;
    }

    // Save progress to sessionStorage
    radio.addEventListener("change", () => {
      progress[qIndex] = radio.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(radio);
    label.append(choice);
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(qDiv);
});

// =======================
// Restore score from localStorage
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