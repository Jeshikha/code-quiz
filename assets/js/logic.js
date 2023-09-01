let currentQuestionIndex = 0;// This line declares a variable called currentQuestionIndex and initializes it to 0. This variable will keep track of the index of the current question being displayed.
let time = questions.length * 15;
// calculating the total time for the quiz by multiplying the number of questions in the questions array by 15 seconds. This variable is used to display the remaining time during the quiz.
let timerID;// Storing the ID of the interval timer that counts down the time.


// html elements
let questionsElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialsElement = document.getElementById("initials");
let feedbackElement = document.getElementById("feedback");
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");



function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = ""; // Clear previous choices

    currentQuestion.choices.forEach(function (choice, index) {
        let choiceButton = document.createElement("button");

        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1}. ${choice}`;
        choiceButton.classList.add("choice");


        // Attach click event to the choice button
        choiceButton.addEventListener("click", questionClick);

        choicesElement.appendChild(choiceButton);
    });

}


function questionClick() {
    let selectedAnswer = this.value;
    questions[currentQuestionIndex].userAnswer = selectedAnswer; // Update userAnswer

    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0
        }
        timerElement.textContent = time;
        feedbackElement.textContent = "Wrong";
        sfxWrong.play();

    } else {
        sfxRight.play();
        feedbackElement.textContent = "Correct!";

    }
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackElement.setAttribute("class", "feedback hide")
    }, 1000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }

}
function calculateCorrectAnswers() {
    let correctAnswers = 0;

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer === questions[i].answer) {
            correctAnswers++;
        }
    }

    return correctAnswers;
}


function quizEnd() {
    clearInterval(timerID);
    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");
    let finalScoreElement = document.getElementById("final-score");

    let correctAnswers = calculateCorrectAnswers(); // Use the calculateCorrectAnswers function
    let score = correctAnswers * 100 + time; // Each correct answer scores 100, and add the remaining time as bonus

    finalScoreElement.textContent = score;

    questionsElement.setAttribute("class", "hide");
}

// time 
function clockTick() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}


// Function to start the quiz
function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");

    questionsElement.removeAttribute("class");
    timerID = setInterval(clockTick, 1000);
    timerElement.textContent = time;
    getQuestion();
}

function saveHighScore() {
    let initials = initialsElement.value.trim();

    if (initials !== "") {
        let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            initials: initials
        }
        highScores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScores));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }

}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
initialsElement.addEventListener("keyup", checkForEnter);