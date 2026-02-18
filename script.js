// your JS code here

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Restore score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Save progress on radio change
document.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const index = parseInt(e.target.name.split("-")[1]);
    userAnswers[index] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Handle submit
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});
