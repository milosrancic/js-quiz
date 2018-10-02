(function () {

	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	let myBarWidth = 0;
	

	const myQuestions = [
	{
		question: "1. Who invented Ferrari?",
		answers: {
			a: "Elon Musk",
			b: "Barack Obama",
			c: "Enzo Ferrari"
		},
		correctAnswer: "c"
	},
	{
		question: "2. What color are bananas?",
		answers: {
			a: "Blue",
			b: "Yellow",
			c: "Orange"
		},
		correctAnswer: "b"
	},
	{
		question: "3. What is the world's longest river?",
		answers: {
			a: "Amazon",
			b: "Danube",
			c: "Thames"
		},
		correctAnswer: "a"
	},
	{
		question: "4. What color are Smurfs?",
		answers: {
			a: "White",
			b: "Purple",
			c: "Blue",
		},
		correctAnswer: "c"
	},
	{
		question: "5. What city is the White House located in?",
		answers: {
			a: "Los Angeles",
			b: "Washington, D.C.",
			c: "New York"
		},
		correctAnswer: "b"
	},
	{
		question: "6. What are tarot cards usually used for?",
		answers: {
			a: "Fortune telling",
			b: "Poker",
			c: "Solitaire"
		},
		correctAnswer: "a"
	},
	{
		question: "7. Where is Statue of Liberty?",
		answers: {
			a: "Geneva",
			b: "Paris",
			c: "New York"
		},
		correctAnswer: "c"
	},
	{
		question: "8. What is philology?",
		answers: {
			a: "Study of architecture",
			b: "Science of languages",
			c: "Study of muscles"
		},
		correctAnswer: "b"
	},
	{
		question: "9. What are the official languages of Canada?",
		answers: {
			a: "English and French",
			b: "Spanish and Russian",
			c: "Italian and French"
		},
		correctAnswer: "a"
	},
	{
		question: "10. Who was the first president of USA?",
		answers: {
			a: "George Washington",
			b: "John F. Kennedy",
			c: "James Buchanan"
		},
		correctAnswer: "a"
	}
	];

	let numberQuestions = myQuestions.length;

	function buildQuiz() {
	// place to store HTML output
	const output = [];

	// for each question
	myQuestions.forEach( (currentQuestion, questionNumber) => {

		// store the list of answer choices
		const answers = [];

		// and for each avalible answer...
		for (letter in currentQuestion.answers) {

			// ...add an HTML radio button
			answers.push(
				`<label>
				<input type="radio" name="question${questionNumber}" value="${letter}">
				${letter}: ${currentQuestion.answers[letter]}
				</label>`
				);
		}

		// add this question and its answers to the output
		output.push(
			`<div class="slide">
			<div class="question"> ${currentQuestion.question} </div>
			<div class="answers"> ${answers.join('')} </div>
			</div>`
			);
	});

	// combine output list into one string of HTML and put it on the page
	quizContainer.innerHTML = output.join('');

	// add progress to the progress bar as the quiz is loaded and first question is shown
	addProgress();
};


function showResults() {

	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers');

	// keep track of user's answers
	let numCorrect = 0;

	// for each question...
	myQuestions.forEach( (currentQuestion, questionNumber) => {

		// find selected answer
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		// if answer is correct
		if (userAnswer === currentQuestion.correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[questionNumber].style.color = 'green';
			}
		// if answer is wrong or blank
		else {
				// color the answers red
				answerContainers[questionNumber].style.color = 'red';
			}
		});

	// different messages to the user depending upon the results
	if (numCorrect <= 3) {
		resultsContainer.innerHTML = `
		Go back to school! <br />
		You've got ${numCorrect} out of ${myQuestions.length}!
		`;
	} else if (numCorrect <= 7) {
		resultsContainer.innerHTML = ` 
		Good job, but you can do better! <br />
		You've got ${numCorrect} out of ${myQuestions.length}!
		`;
	} else {
		resultsContainer.innerHTML = ` 
		Amazing job, you should think about running for president! <br />
		You've got ${numCorrect} out of ${myQuestions.length}!
		`;
	}

}

// display quiz right away
buildQuiz();

// slides
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
const resetButton = document.getElementById('reset');

let currentSlide = 0;

function showSlide(n) {
	// hide the current slide
	slides[currentSlide].classList.remove('active-slide');
	// show the new slide
	slides[n].classList.add('active-slide');
	// update the current slide number
	currentSlide = n;

	// if we're on the first slide
	if (currentSlide === 0) {
		// hide the Previous Slide button
		previousButton.style.display = 'none';
	} else { // or else, show the button
		previousButton.style.display = 'inline-block';
	}

	// If we're on the last slide
	if (currentSlide === slides.length - 1) {
		// hide the Next Slide button
		nextButton.style.display = 'none';
		// show the Submit button
		submitButton.style.display = 'inline-block';
		// show the Reset button
		resetButton.style.display = 'inline-block';
	} else { 
		// show the Next Slide button
		nextButton.style.display = 'inline-block';
		// hide the Submit button
		submitButton.style.display = 'none';
		// hide the Reset button
		resetButton.style.display = 'none';
	}
}

// call function to show the first slide
showSlide(0);

function showNextSlide() {
	showSlide(currentSlide + 1);
	addProgress();
}
function showPreviousSlide() {
	showSlide(currentSlide - 1);
	deductProgress();
}


// functions to update the progress bar

// add progress to the progress bar
function addProgress() {
	// increase myBarWidth
	myBarWidth += 100 / numberQuestions;

	if (myBarWidth > 100) {
		myBarWidth = 100;
	}
	// update the width of #myBar
	document.getElementById('myBar').style.width = myBarWidth + '%';
}

// deduct progress
function deductProgress() {
	// decrease myBarWidth
	myBarWidth -= 100 / myQuestions.length;

	if (myBarWidth < 0) {
		myBarWidth = 0;
	}
	// update the width of #myBar
	document.getElementById('myBar').style.width = myBarWidth + '%';
}

previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// reset quiz on click
resetButton.addEventListener('click', function(e) {
	location.reload();
}, false);

	// on submit, show results
	submitButton.addEventListener('click', showResults);

})();