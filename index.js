import { quiz } from "./questions.js";

const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");
const step4 = document.querySelector(".step-4");
const quizPages = document.querySelector(".controls .pages");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const optionsBtns = document.querySelectorAll(".options button");
const previous = document.querySelector(".leftBtn");
const next = document.querySelector(".rightBtn");

let numOfQuestions;
let questions = quiz;
let answers = [];
let questionIndex = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let notAnswered = 0;

function shuffleQuestions(quiz) {
	for (let i = quiz.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[quiz[i], quiz[j]] = [quiz[j], quiz[i]];
	}

	questions = quiz.slice(0, numOfQuestions);
}

function showQuestion(questionIndex) {
	let currentQuestion = questions[questionIndex];

	quizPages.childNodes.forEach((page) => page.classList.remove("active"));
	quizPages.childNodes[questionIndex].classList.add("active");

	optionsBtns.forEach((btn) => {
		btn.classList.remove("wrong");
		btn.classList.remove("selected");
		btn.disabled = false;

		if (answers[questionIndex]) {
			if (btn.id === questions[questionIndex].correct) {
				btn.classList.add("selected");
			}

			if (btn.id === answers[questionIndex] && answers[questionIndex] !== questions[questionIndex].correct) {
				btn.classList.add("wrong");
			}

			btn.disabled = true;
		}
	});

	question.innerText = currentQuestion.question;
	A.textContent = currentQuestion.A;
	B.textContent = currentQuestion.B;
	C.textContent = currentQuestion.C;
	D.textContent = currentQuestion.D;
}

function createQuizPages(questions) {
	for (let i = 1; i <= numOfQuestions; i++) {
		const page = document.createElement("button");
		page.innerText = i;

		quizPages.appendChild(page);

		page.addEventListener("click", function () {
			questionIndex = i - 1;
			showQuestion(questionIndex);
		});
	}
}

function endGame() {
	notAnswered = questions.length - (wrongAnswers + rightAnswers);

	correctCount.textContent = rightAnswers;
	wrongCount.textContent = wrongAnswers;
	notAnsweredCount.textContent = notAnswered;
	totalCount.textContent = questions.length;

	step3.style.display = "none";
	step4.style.display = "block";
}

function startGame() {
	answers = [];
	questionIndex = 0;
	rightAnswers = 0;
	wrongAnswers = 0;
	notAnswered = 0;
	quizPages.innerHTML = "";

	shuffleQuestions(questions);
	createQuizPages(questions);
	showQuestion(questionIndex);

	step2.style.display = "none";
	step3.style.display = "block";
}

start.addEventListener("click", () => {
	if (numInput.value.length) {
		numOfQuestions = +numInput.value;

		startGame();
	}
});

next.addEventListener("click", () => {
	let questionPage = quizPages.children[questionIndex];

	if (questionIndex < questions.length - 1) {
		if (answers[questionIndex] && questions[questionIndex].correct === answers[questionIndex]) {
			questionPage.classList.add("correct");
		} else if (answers[questionIndex] && questions[questionIndex].correct !== answers[questionIndex]) {
			questionPage.classList.add("wrong");
		} else {
			questionPage.classList.add("skipped");
		}

		questionIndex++;
		showQuestion(questionIndex);
	} else {
		endGame();
	}
});

previous.addEventListener("click", () => {
	let questionPage = quizPages.children[questionIndex];

	if (questionIndex > 0) {
		if (answers[questionIndex] && questions[questionIndex].correct === answers[questionIndex]) {
			questionPage.classList.add("correct");
		} else if (answers[questionIndex] && questions[questionIndex].correct !== answers[questionIndex]) {
			questionPage.classList.add("wrong");
		} else {
			questionPage.classList.add("skipped");
		}

		questionIndex--;
		showQuestion(questionIndex);
	}
});

optionsBtns.forEach((option) => {
	option.addEventListener("click", function () {
		const correctAnswer = questions[questionIndex]["correct"];

		if (this.id === correctAnswer) {
			rightAnswers++;
			this.classList.add("selected");
		} else {
			wrongAnswers++;
			this.classList.add("wrong");
			document.querySelector(".options #" + correctAnswer).classList.add("selected");
		}

		answers[questionIndex] = this.id;
		optionsBtns.forEach((option) => (option.disabled = true));
	});
});

restart.addEventListener("click", () => {
	step4.style.display = "none";
	step2.style.display = "block";
});
