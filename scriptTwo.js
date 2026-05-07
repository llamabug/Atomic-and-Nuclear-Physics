//Accordian
document.addEventListener("DOMContentLoaded", function () {
  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  }

  startQuiz(); 
});



const questions = [

    { question: "What is nuclear fission?", 
        answers: [ {text: "when 2 nuclei join to form a new one", correct: false}, {text: "when a nuclei splits into two new ones", correct: true}, {text: "when radiation is emitted from a nucleus", correct: false}, {text: "when energy is absorbed into the nucleus", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is nuclear fusion?", 
        answers: [ {text: "when 2 nuclei join to form a new one", correct: true}, {text: "when a nuclei splits into two new ones", correct: false}, {text: "when radiation is emitted from a nucleus", correct: false}, {text: "when energy is absorbed into the nucleus", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is the name of mass difference in nuclear reactions?", 
        answers: [ {text: "activation energy", correct: false}, {text: "critical mass", correct: false}, {text: "binding energy loss", correct: false}, {text: "mass defect", correct: true}, ], 
        type: "option",
    }, 

    { question: "What is a chain reaction in nuclear reactions?", 
        answers: [ {text: "a reaction where one fusion reaction triggers one (or more) additional fusion reactions", correct: false},  {text: "a reaction where fusion events follow fission events in sequence", correct: false}, {text: "a reaction where all nuclei decay simultaneously", correct: false}, {text: "a reaction where one fission reaction triggers one (or more) additional fission reactions", correct: true}, ], 
        type: "option",
    }, 

    
    { question: "Which type of nuclear reaction releases more energy?", 
        answers: [ {text: "fission", correct: false}, {text: "fusion", correct: true}, ], 
        type: "option",
    }, 

    { question: "Uranium decays to thorium by emitting a particle. What type of particle is it? 238-U → 234-Th + X", 
        answers: [ {text: "alpha", correct: true}, {text: "beta", correct: false}, {text: "proton", correct: false}, {text: "neutron", correct: false}, ], 
        type: "option",
    }, 

    { question: `<sup>235</sup><sub>92</sub>U + <sup>1</sup><sub>0</sub>n → <sup>90</sup><sub>38</sub>Sr + <sup>A</sup><sub>Z</sub>Xe + 3<sup>1</sup><sub>0</sub>n. What is A?`,
        type: "input",
        answers: ["143", "one hundred and forty three", "one hundred and forty-three", ]
    },

    { question: `<sup>235</sup><sub>92</sub>U + <sup>1</sup><sub>0</sub>n → <sup>90</sup><sub>38</sub>Sr + <sup>A</sup><sub>Z</sub>Xe + 3<sup>1</sup><sub>0</sub>n. What is Z?`,
        type: "input",
        answers: ["54", "fifty four", "fifty-four", ]
    },

    { question: `<sup>14</sup><sub>6</sub>C  → <sup>A</sup><sub>Z</sub>N + <sup>0</sup><sub>-1</sub>e What is A?`,
        type: "input",
        answers: ["14", "fourteen", ]
    },

    { question: `<sup>14</sup><sub>6</sub>C  → <sup>A</sup><sub>Z</sub>N + <sup>0</sup><sub>-1</sub>e What is Z?`,
        type: "input",
        answers: ["7", "seven", ]
    },

];




const questionElement = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const enterButton = document.getElementById("enter-btn");
const answerButtons = document.getElementById("answer-buttons");
const progressBar = document.getElementById("progress-bar");




let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  let progressPercent =
    (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  if (currentQuestion.type === "input") {
    document.getElementById("search").style.display = "block";
    enterButton.style.display = "block";
  }

  if (currentQuestion.type === "option") {
  answerButtons.style.display = "block"; 

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}
}


function resetState() {
  nextButton.style.display = "none";
  enterButton.style.display = "none";

  answerButtons.innerHTML = "";
  answerButtons.style.display = "none";

  document.getElementById("search").style.display = "none";

  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";
  feedback.className = "feedback";
  feedback.style.display = "none"; 

  document.getElementById("search").value = "";
}




function checkInputAnswer() {
  const input = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();

  const currentQuestion = questions[currentQuestionIndex];
  const feedback = document.getElementById("feedback");

  if (currentQuestion.answers.includes(input)) {
    score++;
    feedback.className = "feedback correct";
    feedback.innerHTML = "Correct!";
  } else {
    feedback.className = "feedback incorrect";
    feedback.innerHTML =
      "Incorrect! Correct answer: " + currentQuestion.answers[0];
  }

  enterButton.style.display = "none"; 
  nextButton.style.display = "block";
  feedback.style.display = "block"; 
}





function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";

  const feedback = document.getElementById("feedback");
feedback.style.display = "block";

if (isCorrect) {
  feedback.className = "feedback correct";
  feedback.innerHTML = "Correct!";
} else {
  feedback.className = "feedback incorrect";
  feedback.innerHTML = "Incorrect!";
}
}




function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  progressBar.style.width = "100%";
}



nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

enterButton.addEventListener("click", checkInputAnswer);



document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (enterButton.style.display !== "none") {
      checkInputAnswer();
    } else if (nextButton.style.display !== "none") {
      handleNextButton();
    }
  }
});
