function printHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    let ol = document.getElementById("highscores");
    ol.innerHTML = ""; // Clear previous list

    highScores.forEach(function (score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`;

        ol.appendChild(li);
    });
}

function clearHighScores() {
    localStorage.removeItem("highscores");
    window.location.reload();
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScores);

// Call the printHighScores function to display scores when the page loads
printHighScores();