const QUESTION = document.querySelector("#question");
const CORRECT = document.querySelector("#correct")
const INCORRECT = document.querySelector("#incorrect")
const TIMER = document.querySelector("#timer")
const CHOICES = Array.from(document.querySelectorAll(".choice-text"));
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let time = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Text Preprocessor',
        choice2: 'Hypertext Markup Language',
        choice3: 'Hyper Text Multiple Language',
        choice4: 'Hyper Tool Multi Language',
        answer: 2,
    },
    {
        question:"What does CSS stand for?",
        choice1: "Common Style Sheet",
        choice2: "Colorful Style Sheet",
        choice3: "Computer Style Sheet",
        choice4: "Cascading Style Sheet",
        answer: 4,
    },
    {
        question: "What does PHP stand for?",
        choice1: "Hypertext Preprocesser",
        choice2: "Hypertext Programming",
        choice3: "Hypertext Preprogramming",
        choice4: "Hometext Preprocessor",
        answer: 1,
    },
    {
        question: "What does SQL stand for?",
        choice1: "Stylish Question Language",
        choice2: "Stylesheet Query Language",
        choice3: "Statement Question Language",
        choice4: "Structured Query Language",
        answer: 4,
    }
];

// Runs when game is started
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    time = 60;
    startTimer();
    getNewQuestion();
}

// Run on startGame and after each question is answered to get new question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS || time === 0) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("./end.html");
    }

    questionCounter++;
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    QUESTION.innerText = currentQuestion.question;

    CHOICES.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

// Logic for handling answer selection
CHOICES.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS);
            CORRECT.classList.remove("hidden");
            setTimeout(() => { CORRECT.classList.add("hidden"); }, 1500);

        } else {
            decrementTime();
            INCORRECT.classList.remove("hidden");
            setTimeout(() => { INCORRECT.classList.add("hidden"); }, 1500);
        }

        setTimeout(() => { getNewQuestion(); }, 500);
    })
})

// Start countdown timer for quiz
startTimer = () => {
    timer = setInterval(countdown, 1000);
}

// Display time remaining and countdown from time
countdown = () => {
    TIMER.textContent = ("Time: " + time);
    time--;
    if (time < 0) {
    TIMER.textContent = ("Time: 0");
    clearInterval(timer)
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
    }
}

// Increases user score when answer is correct
incrementScore = num => {
    score += num;
}

// Lowers remaining time when answer is wrong
decrementTime = () => {
    time -= 10;
}

startGame()