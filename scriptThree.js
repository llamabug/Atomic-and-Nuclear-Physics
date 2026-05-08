document.addEventListener("DOMContentLoaded", function () {
  startQuiz(); 
});



const questions = [

    { question: "What is alpha decay?", 
        answers: [ {text: "the emission of an electron from the nucleus", correct: false}, {text: "the emission of two protons and two neutrons from the nucleus", correct: true}, {text: "the emission of electromagnetic radiation from the nucleus", correct: false}, {text: "the emission of a He nucleus from the nucleus", correct: true}, ], 
        type: "option",
    }, 

    { question: "What is beta decay?", 
        answers: [ {text: "the emission of an electron from the nucleus", correct: true}, {text: "the emission of two protons and two neutrons from the nucleus", correct: false}, {text: "the emission of electromagnetic radiation from the nucleus", correct: false}, {text: "the emission of a neutron from the nucleus", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is gamma radiation?", 
        answers: [ {text: "the emission of an electron from the nucleus", correct: false}, {text: "the emission of two protons and two neutrons from the nucleus", correct: false}, {text: "the emission of electromagnetic radiation from the nucleus", correct: true}, {text: "the emission of a neutron from the nucleus", correct: false}, ], 
        type: "option",
    }, 

    { question: "What is an half-life?", 
        answers: [ {text: "the time taken for a 50g sample to decay", correct: false}, {text: "the time taken for all atoms in a sample to decay", correct: false}, {text: "the time taken for a sample to become stable", correct: false}, {text: "the time taken for a sample to decay by 50%", correct: true},], 
        type: "option",
    }, 

    { question: "What is ionisation?", 
        answers: [ {text: "the process of adding/removing an electron from an atom", correct: true}, {text: "the process of splitting a nucleus into 2 smaller nuclei", correct: false}, {text: "the process of fusing 2 nuclei together", correct: false}, {text: "the process of a nucleus emitting radiation", correct: false},], 
        type: "option",
    }, 

    { question: "What is an isotope?", 
        answers: [ {text: "atoms of the same number of neutrons but different number of protons", correct: false}, {text: "atoms with the same atomic and mass numbers", correct: false}, {text: "atoms with the same amount of neutrons but different amount of protons", correct: true}, {text: "atoms with the same atomic mass but different elements", correct: false},], 
        type: "option",
    }, 

    { question: "Which of the following is an example of isotopes?", 
        answers: [ {text: `<sup>12</sup><sub>6</sub>C and <sup>14</sup><sub>7</sub>N`, correct: false}, {text: "<sup>12</sup><sub>6</sub>C and <sup>14</sup><sub>6</sub>C", correct: true}, {text: "<sup>12</sup><sub>6</sub>C and <sup>12</sup><sub>5</sub>B", correct: false}, {text: "<sup>14</sup><sub>6</sub>C and <sup>14</sup><sub>7</sub>N", correct: false},], 
        type: "option",
    }, 


    { question: "A radioactive sample has a half-life of 10 years. If you start with 80g of the sample, how much remains after 30 years?",
    type: "input",
    answers: ["10 grams", "10 g", "ten grams", "ten g", "10", "ten"]
    },

    { question: "The half-life of a radioactive isotope is 6 hours. If a sample initially contains 2400 atoms, how many atoms will remain after 24h?",
    type: "input",
    answers: ["1500 atoms", "1,500 atoms", "1,500", "1500", "one thousand and five hundred g", "one thousand and five hundred grams"]
    },

    { question: "A sample of  radioactive substance has an activity of 800Bq. After 12 days, its activity has dropped to 100Bq. What is the half-life of the substance?",
    type: "input",
    answers: ["4 days", "4", "four days", "four"]
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
