# Coding Quiz Challenge

## Description
As part of my journey to becoming a front-end web developer, I have created a timed coding quiz with multiple-choice questions for coder students. This project features a dynamic and responsive user interface powered by HTML, CSS, and JavaScript. It follows the structure and principles of a typical coding assessment, offering a combination of multiple-choice questions and interactive coding challenges. The quiz is timed, and incorrect answers lead to time deductions, simulating the conditions of a real coding challenge. Each correct answers will score the candidate 100 points

## Features
- **Timer:** The quiz starts with a timer that counts down as the user progresses through the questions. Incorrect answers lead to time deductions (15 seconds), adding an element of urgency.
- **Question Progression:** Questions are presented one by one, and users can advance to the next question by selecting an answer.
- **Scoring:** The application tracks and calculates scores based on correct answers and the remaining time. Notifying the candidate of "Correct" AND "Wrong" answers. Each correct answers scores 100 points and total of Correct Answers plus remaining time will give the End Score.
- **High Scores:** Users can save their initials and view their scores on the high scores leaderboard.
- **Sound Effects:** Sound effects for correct and incorrect answers, enhancing the gaming experience.
- **Clear High Scores:** Users have the option to clear high scores and start fresh.
- **Local Storage:** Used to 
1. Store High Scores: After completing the quiz, user initials and scores are saved in Local Storage, enabling users to track and compare their performance. 
2. Retrieve High Scores: On the "Highscores" page, high scores are retrieved from Local Storage and displayed in a leaderboard format.
3. Clear High Scores: Users can choose to clear their high scores, removing the data from Local Storage.

## Files Created
The project includes the following files:
- `index.html`: The main HTML file for the quiz.
- `logic.js`: The JavaScript code for quiz functionality.
- `questions.js`: The file containing the quiz questions.
- `scores.js`: The JavaScript code for managing and displaying high scores.
- `styles.css`: The CSS stylesheet for styling the quiz.
- `highscores.html`: The HTML file for viewing high scores.

## License
This project is licensed under the MIT License
