var body = document.querySelector(".main");
var quizBtn = document.querySelector("#startQuizBtn").addEventListener("click", startQuiz);


var quizQuestions = [
    {
        question : "In JavaScript how do you comment a single line of code?",
        choices : ["#","*","//","/*"],
        answer: 2
    },
    {
        question : "Where is the correct place to insert a JavaScript?",
        choices : ["Inside the head section.","Inside the head or body sction.","Inside the body section."],
        answer: 2
    },
    {
        question : "The external JavaScript file must contain the <script> tag.",
        choices : ["False","True"],
        answer: 0
    },
    {
        question : "How do you round the number 7.25, to the nearest integer?",
        choices : ["Math.round(7.25)","rnd(7.25)","Math.rnd(7.25)","round(7.25)"],
        answer: 0
    },
];

var quizQuestion1 = ("<h1>" + quizQuestions[0].question +"</h1>" + 
                    "<button>" + quizQuestions[0].choices[0] +"</button>" +
                    "<button>" + quizQuestions[0].choices[1] +"</button>" +
                    "<button>" + quizQuestions[0].choices[2] +"</button>" +
                    "<button>" + quizQuestions[0].choices[3] +"</button>" +
                    "<button>" + quizQuestions[0].choices[4] +"</button>")



function startQuiz() {
    // console.log("Hello world");
    for (var i = 0; i < quizQuestions.length; i++) {

    }

        body.innerHTML = (quizQuestion1)

}
