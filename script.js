const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Ensure questions exist (Accio injects them during tests)
if (typeof questions !== "undefined") {

  const qArr = Object.keys(questions).map(key => questions[key]);

  let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  // Render Questions
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
        progress[qIndex] = choice;
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

  submitBtn.addEventListener("click", () => {

    let score = 0;

    qArr.forEach((q, index) => {
      if (progress[index] === q.answer) score++;
    });

    scoreDiv.textContent = `Your score is ${score} out of 5.`;

    localStorage.setItem("score", score);
  });

}