// var quizQuestions = [
//   {
//   title: "Which Header element is the largest?",
//   choices: ["h1", "h2", "h3", "h4"],
//   answer: "h1"
//   },
//   {
//     title: "What does js stand for?",
//     choices: ["Java", "Juniors", "JavaScript", "nothing"],
//     answer: "JavaScript"
//     },
//     {
//       title: "What do we use to style a page?",
//       choices: ["Color", "CSS", "Style", "HTML"],
//       answer: "h1"
//       },
//       {
//         title: "JavaScript makes pages reactive",
//         choices: ["True", "False"],
//         answer: "True"
//         },
// ]







// Define your quiz questions and answers
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
      correctAnswer: "h1"
      },
      {
        question: "JavaScript makes pages reactive",
        choices: ["True", "False"],
        correctAnswer: "True"
        },
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60; 

const startButton = document.getElementById("start-button");
const quizContainer = document.querySelector(".quiz-container");
const timer = document.getElementById("timer");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");



function startQuiz() {


  loadQuestion();
  startTimer();
  // You can also hide the "Start" button or any other initial elements
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  timer.style.display = "block";
}


function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
      const choiceItem = document.createElement("li");
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
            // Time is up, handle this as needed (e.g., show the final result)
            clearInterval(timerInterval);
            showFinalResult();
        }
    }, 1000); // Update every 1 second (1000 milliseconds)
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
      showFinalResult();
  }
}


function showFinalResult() {
  questionElement.textContent = "Quiz completed!";
  choicesElement.innerHTML = "";
  submitButton.style.display = "none";
  resultElement.textContent = `Your Score: ${score}/${quizData.length}`;
}

// loadQuestion();
startButton.addEventListener("click", startQuiz);