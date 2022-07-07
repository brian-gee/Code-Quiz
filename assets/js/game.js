const QUESTION = document.querySelector('#question');
const CHOICES = Array.from(document.querySelectorAll('.choice-text'));
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
const TIME = 120;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
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


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    QUESTION.innerText = currentQuestion.question

    CHOICES.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

CHOICES.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {

        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
}

decrementScore = num => {
    score -= num
}

startGame()