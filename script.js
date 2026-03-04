const questions = {
  0: {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Everest"
  },
  1: {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  2: {
    question: "Who wrote Hamlet?",
    choices: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"],
    answer: "Shakespeare"
  },
  3: {
    question: "What is the capital of Japan?",
    choices: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo"
  },
  4: {
    question: "Which gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
};
window.onload = function () {

  const questionsContainer = document.getElementById("questions");
  const submitBtn = document.getElementById("submit");
  const scoreDiv = document.getElementById("score");

  const qArr = Object.values(questions);

  let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  // Render questions
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

      if (progress[qIndex] === choice) {
        radio.checked = true;
        radio.setAttribute("checked", "true");
      }

      radio.addEventListener("change", () => {

        progress[qIndex] = radio.value;
        sessionStorage.setItem("progress", JSON.stringify(progress));

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

  // restore score
  const storedScore = localStorage.getItem("score");

  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }

  // submit quiz
  submitBtn.addEventListener("click", () => {

    let score = 0;

    qArr.forEach((q, index) => {
      if (progress[index] === q.answer) score++;
    });

    scoreDiv.textContent = `Your score is ${score} out of 5.`;

    localStorage.setItem("score", score);

  });

};