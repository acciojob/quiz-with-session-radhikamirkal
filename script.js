if (typeof questions === "undefined") {
  var questions = {
    0: {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    1: {
      question: "Which language runs in a web browser?",
      choices: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    2: {
      question: "What does CSS stand for?",
      choices: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats"
      ],
      answer: "Cascading Style Sheets"
    },
    3: {
      question: "What does HTML stand for?",
      choices: [
        "Hypertext Markup Language",
        "Hyperloop Machine Language",
        "Hyper Transfer Markup Language",
        "Hyper Tool Multi Language"
      ],
      answer: "Hypertext Markup Language"
    },
    4: {
      question: "Which company developed JavaScript?",
      choices: ["Netscape", "Microsoft", "Google", "Oracle"],
      answer: "Netscape"
    }
  };
}
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

const qArr = Object.values(questions);

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
      radio.setAttribute("checked","true");
    }

    radio.addEventListener("change", () => {

      progress[qIndex] = choice;
      sessionStorage.setItem("progress", JSON.stringify(progress));

      document
        .querySelectorAll(`input[name="question-${qIndex}"]`)
        .forEach(el => el.removeAttribute("checked"));

      radio.setAttribute("checked","true");

    });

    label.appendChild(radio);
    label.append(choice);

    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));

  });

  questionsContainer.appendChild(qDiv);

});


// Restore score if present
const storedScore = localStorage.getItem("score");

if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}


// Submit
submitBtn.addEventListener("click", () => {

  let score = 0;

  qArr.forEach((q,index) => {
    if(progress[index] === q.answer){
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);

});