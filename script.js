// your JS code here

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// 🔹 Load progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// 🔹 Restore saved score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// 🔹 Save progress when selecting answers
document.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const questionIndex = parseInt(e.target.name.split("-")[1]);
    userAnswers[questionIndex] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// 🔹 Handle Submit
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save final score in localStorage
  localStorage.setItem("score", score);
});
