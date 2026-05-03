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
        answers: ["A helium nucleus", "helium nucleus", "he nucleus", "helium nuclei", "he nuclei"]
    },
    {
        question: "What is an beta particle?",
        answers: ["electron","e", "an electron"]
    },
];

const questionElement = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const enterButton = document.getElementById("enter-btn");
const progressBar = document.getElementById("progress-bar");
let currentQuestionIndex = 0;
let score = 0;

function search() {
    const input = document.getElementById("search").value.toLowerCase().trim();
    const currentQuestion = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");

    if (currentQuestion.answers.includes(input)) {
        score++
        feedback.className = "feedback correct"
        feedback.innerHTML = "Correct!";
    } else {
        feedback.className = "feedback incorrect"
        feedback.innerHTML = `Incorrect! <br>Correct answer: ${currentQuestion.answers[0]}`;
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
    let progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
}

function resetState() {
    nextButton.style.display = "none";
    enterButton.style.display = "block";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("feedback").className = "feedback"
}



function showScore() {
    const searchBar = document.getElementById("search");

    resetState();
    enterButton.style.display = "none";
    searchBar.style.display = "none";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    progressBar.style.width = "100%";
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