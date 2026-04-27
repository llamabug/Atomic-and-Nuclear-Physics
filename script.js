document.addEventListener("DOMContentLoaded", function() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
});


const questions = [
    {
        question: "What is an alpha particle?",
        answers: ["helium nucleus", "he nucleus",]
    },
    {
        question: "What is an beta particle?",
        answers: ["electron","e",]
    },
];

const questionElement = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const enterButton = document.getElementById("enter-btn")

let currentQuestionIndex = 0;
let score = 0;

function search() {
    const input = document.getElementById("search").value.toLowerCase().trim();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(input)) {
        score++
        questionElement.innerHTML = "Correct!";
    } else {
        questionElement.innerHTML = "Incorrect!";
    }

    nextButton.style.display = "block";
    enterButton.style.display = "none";
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    document.getElementById("search").value = "";
}

function resetState() {
    nextButton.style.display = "none";
    enterButton.style.display = "block";
}



function showScore() {
    resetState();
    enterButton.style.display = "none";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
