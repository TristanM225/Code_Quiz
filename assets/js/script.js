

const quizData = [
  {
    question: "Which Header element is the largest?",
  choices: ["h1", "h2", "h3", "h4"],
  correctAnswer: "h1"
  },
  {
    question: "What does js stand for?",
    choices: ["Java", "Juniors", "JavaScript", "nothing"],
    correctAnswer: "JavaScript"
    },
    {
      question: "What do we use to style a page?",
      choices: ["Color", "CSS", "Style", "HTML"],
      correctAnswer: "CSS"
      },
      {
        question: "JavaScript makes pages reactive",
        choices: ["True", "False"],
        correctAnswer: "True"
        },
];

let currentQuestionIndex = 0;
let score = 0;
// decreased timer to 30 seconds to make harder
let timeRemaining = 30; 

const startButton = document.getElementById("start-button");
const quizContainer = document.querySelector(".quiz-container");
const timer = document.getElementById("timer");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

const highscoreContainer = document.getElementById("highscore-container");
const highscoreList = document.getElementById("highscore-list");
const nameInput = document.getElementById("name-input");
const submitScoreButton = document.getElementById("submit-score");

function loadHighscores() {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.sort((a, b) => b.score - a.score); // Sort highscores in descending order
  highscoreList.innerHTML = "";
  for (const scoreData of highscores) {
    const listItem = document.createElement("li");
    listItem.textContent = `${scoreData.name}: ${scoreData.score}`;
    highscoreList.appendChild(listItem);
  }
}

// Save a new highscore to localStorage
function saveHighscore(name, score) {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const newScore = { name, score };
  highscores.push(newScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  loadHighscores(); // Reload highscores list
}

// Event listener for submitting a score
submitScoreButton.addEventListener("click", () => {
  const playerName = nameInput.value.trim();
  if (playerName && score > 0) {
    saveHighscore(playerName, score);
    nameInput.value = ""; // Clear the input field after score is saved
  }
});

// function to hide questions before start
function startQuiz() {

// loads questions and timer
  loadQuestion();
  startTimer();
  
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  timer.style.display = "block";
}


function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
      const choiceItem = document.createElement("p");
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", () => checkAnswer(choice));
      choiceItem.appendChild(choiceButton);
      choicesElement.appendChild(choiceItem);
  });

  updateTimer();
  startTimer();
}


function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;
}

let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimer();
        } else {
            // Time is up show final result regardless of one question you're on
            if (currentQuestionIndex < quizData.length) {
              showFinalResult();
          }
        }
    }, 1500); // accounting for the two updateTimer calls
}



function checkAnswer(selectedChoice) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedChoice === currentQuestion.correctAnswer) {
      score++;
      resultElement.textContent = "Correct!";
  } else {
      resultElement.textContent = "Incorrect!";
      // Subtract 10 seconds for a wrong answer
      timeRemaining -= 10;
      if (timeRemaining < 0) {
          timeRemaining = 0;
      }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
      loadQuestion();
  } else {
      // Call showFinalResult() here when the quiz is completed
      showFinalResult();
  }
}


function showFinalResult() {
  questionElement.textContent = "Quiz completed!";
  choicesElement.innerHTML = "";
  startButton.style.display = "none";
  resultElement.textContent = `Your Score: ${score}/${quizData.length}`;

  clearInterval(timerInterval);

  timer.style.display = "none";
}

// loadQuestion();
startButton.addEventListener("click", startQuiz);

loadHighscores();