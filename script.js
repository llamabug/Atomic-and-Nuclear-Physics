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
    { question: "What is the charge on an alpha particle?", 
        answers: [ {text: "+2", correct: true}, {text: "+1", correct: false}, {text: "-1", correct: false}, {text: "-2", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is the charge on an beta particle?", 
        answers: [ {text: "+2", correct: false}, {text: "+1", correct: false}, {text: "-1", correct: true}, {text: "-2", correct: false}, ], 
        type: "option",
    },

    { question: "Which particle is most ionising?", 
        answers: [ {text: "alpha", correct: true}, {text: "beta", correct: false}, {text: "gamma", correct: false}, {text: "neutrons", correct: false}, ], 
        type: "option",
    }, 

    { question: "Which particle is most penetrating?", 
        answers: [ {text: "alpha", correct: false}, {text: "beta", correct: false}, {text: "gamma", correct: true}, {text: "neutrons", correct: false}, ], 
        type: "option",
    }, 

    { question: "Which particle isnin't most penetrating?", 
        answers: [ {text: "alpha", correct: false}, {text: "beta", correct: false}, {text: "gamma", correct: true}, {text: "neutrons", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is an alpha particle?",
    type: "input",
    answers: ["a helium nucleus", "helium nucleus", "he nucleus", "helium nuclei", "he nuclei"]
    },

    { question: "What is an beta particle?",
    type: "input",
    answers: ["an electron", "electron", "e"]
    },

    { question: "What is an alpha particle?",
    type: "input",
    answers: ["a helium nucleus", "helium nucleus", "he nucleus", "helium nuclei", "he nuclei"]
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
