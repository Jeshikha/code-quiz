let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;


// html elements
let questionsElement = document.getElementById("questions");
let timeElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let titleElement = document.getElementById("question-title");
    titleElement.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, index) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1}. ${choice}`;
        choiceButton.addEventListener("click", questionClick);
        choicesElement.append(choiceButton)

    })
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0
        }
        timerElement.textContent = time;
        feedBackElement.textContent = "Wrong";
        sfxWrong.play();
    } else {
        sfxRight.play();
        feedBackElement.textContent = "Correct!";

    }
    feedBackElement.setAttribute("class", "feedback");
    setTimeout(function () {
        feedBackElement.setAttribute("class", "feedback hide")
    }, 1000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }

}

function quizEnd() {
    clearInterval(timerID);
    let endSreenElement = document.getElementById("end-screen");
    endSreenElement.removeAttribute("class");
    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

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
    startButton.classList.add("hide");
    questionsElement.classList.remove("hide");
    timerID = setInterval(clockTick, 1000);

    displayQuestion();
}

function saveHighScore() {
    let initials = initialElement.value.trim();

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

initialElement.addEventListener("keyup", checkForEnter);