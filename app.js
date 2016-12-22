var state = {
	questions: [],
	grade: [],
	currentQuestion: 0
}

state.questions = [
	{
		phrase: 'konnichiwa',
		answers: ['bye', 'welcome', 'thank you', 'hello'],
		answerkey: 'hello'
	},
	{
		phrase: 'sayonara',
		answers: ['bathroom', 'bye', 'welcome', 'thank you'],
		answerkey: 'bye'
	}
];

function main() {
	function startQuiz() {
		$('#start-button').on('click', function() {
			$(".quiz-start").addClass("hidden");
			$(".quiz-box").removeClass("hidden");
		})
	}

	function resultDisplayificator(isCorrect) {
		if (isCorrect) {
			$('.result').css('border-color', 'green').html('<p class="correct">Correct!</p>');
		} else {
			$('.result').css('border-color', 'red').html('<p class="wrong">Incorrect! The correct answer is ' + state.questions[state.currentQuestion].answerkey + '.</p>');
		}
	}

	function onAnswerSubmit() {
		$('.answer-form').submit(function(event) {
			event.preventDefault();
			var selectedAnswer = $('input[type=radio]:checked').val();
			if (state.questions[state.currentQuestion].answerkey === selectedAnswer) {
				resultDisplayificator(true);
			} else {
				resultDisplayificator(false);
			}
			$('.result').removeClass('hidden');
		})
	}

	function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
	}

	function bindRadioClickEvent() {
		$('.answers').on('click', 'input[type=radio]', function(event) {
			$('#submit-button').removeAttr('disabled');
		})
	}

	function renderQuestion(translate) {
		var questions = state.questions[state.currentQuestion].answers;
		shuffle(questions);

		$(".phrase-to-translate").text(translate);
		var questionHTML = questions.map(function(answer, index) {
				return ('<li><input type="radio" name="answer" id="answer' + (index + 1) + '" value="' + answer + '">' +
								'<label for="answer' + (index + 1) + '">' + answer + '</label></li>');
		});
		$('.answers').html(questionHTML);
		bindRadioClickEvent();
	}

	function showCurrentQuestion(questionNum) {
		var questionValue = state.questions[questionNum];
		renderQuestion(questionValue.phrase);
		$('.js-current-question-number').text(questionNum + 1);
	}

	function currentQuestion() {
		var question = state.currentQuestion;
		showCurrentQuestion(question);
	}

	startQuiz();
	onAnswerSubmit();
	currentQuestion();
}

$(document).ready(main())