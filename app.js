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
		answers: ['see you soon', 'bye', 'welcome', 'thank you'],
		answerkey: 'bye'
	},
	{
		phrase: 'gomibako',
		answers: ['toothpick', 'trashcan', 'car', 'bathtub'],
		answerkey: 'trashcan'
	},
	{
		phrase: 'chuugakkou',
		answers: ['middle school', 'China', 'inner-city', 'medium size'],
		answerkey: 'middle school'
	},
	{
		phrase: 'doubutsuen',
		answers: ['zoo', 'park', 'gym', 'temple'],
		answerkey: 'zoo'
	},
	{
		phrase: 'kousokudouro',
		answers: ['highway', 'speed-boat', 'airport', 'subway'],
		answerkey: 'highway'
	},
	{
		phrase: 'ningenkankei',
		answers: ['interpersonal relations', 'human anatomy', 'personal space', 'anthropology'],
		answerkey: 'interpersonal relations'
	},
	{
		phrase: 'shuushokuseikatsu',
		answers: ['job hunting', 'farming', 'unemployment', 'low-carb diet'],
		answerkey: 'job hunting'
	},
	{
		phrase: 'kokkaigijidou',
		answers: ['National Diet Building', "school cafeteria", 'City Hall', 'street intersection'],
		answerkey: 'National Diet Building'
	},
	{
		phrase: 'saikenkeikaku',
		answers: ['restructuring plan', 'treasure map', 'floor plan', 'algorithm'],
		answerkey: 'restructuring plan'
	}
];

function main() {
	function startQuiz() {
		$('#start-button').on('click', function() {
			$(".quiz-start").addClass("hidden");
			$(".quiz-box").removeClass("hidden");
			renderCurrentQuestion();
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
	
	function getAnswers() {
		var questions = state.questions[state.currentQuestion].answers;
		shuffle(questions);

		var questionHTML = questions.map(function(answer, index) {
				return ('<li><input type="radio" name="answer" id="answer' + (index + 1) + '" value="' + answer + '">' +
								'<label for="answer' + (index + 1) + '">' + answer + '</label></li>');
		});
		
		return(questionHTML);
	}
	
	function bindRadioClickEvent() {
		$('.answers').on('click', 'input[type=radio]', function(event) {
			$('#submit-button').removeAttr('disabled');
		})
	}


	function renderCurrentQuestion() {
		$('.quiz-box').html(
				'<p class="question-number"><span class="js-current-question-number">1</span> of 10</p>' +
				'<div class="question-content">' +
				'	<h2 class="phrase-to-translate">' + state.questions[state.currentQuestion].phrase + '</h2>' +
				'	<form class="answer-form" action="">' +
				'		<ul class="answers"'+ getAnswers().join('') + '</ul>' +
				'		<div class="quiz-button">' +
				'			<button type="submit" id="submit-button" disabled>Submit</button>' +
				'		</div>' +
				'	</form>' +
				'</div>'
			)
		
		onAnswerSubmit();

		$('.js-current-question-number').text(state.currentQuestion + 1);
		bindRadioClickEvent();
	}

	function onAnswerSubmit() {
		$('.answer-form').submit(function(event) {
			event.preventDefault();
			var selectedAnswer = $('input[type=radio]:checked').val();

			if (state.questions[state.currentQuestion].answerkey === selectedAnswer) {
				resultDisplayificator(true);
				state.grade.push(1);
			} else {
				resultDisplayificator(false);
				state.grade.push(0);
			}
			$('.result').removeClass('hidden');
			$('input[type=radio]').attr('disabled', true);
			
			switchNextButton();
			renderProgressBox();
		})
	}
	
	function resultDisplayificator(isCorrect) {
		if (isCorrect) {
			$('.result').css('border-color', 'green').html('<p class="correct">Correct!</p>');
		} else {
			$('.result').css('border-color', 'red').html('<p class="wrong">Incorrect! The correct answer is "' + 
																									 state.questions[state.currentQuestion].answerkey + '."</p>');
		}
	}

	function renderProgressBox() {
			var progressHTML = state.grade.map(function(grade, index) {
				if (grade) {
					return ('<li class="correct">Question ' + (index + 1) + ': correct</li>')
				} else {
					return ('<li class="wrong">Question ' + (index + 1) + ': wrong</li>')
				}
			})

			$('.progress-box').html('<ul>' + progressHTML.join('') + '</ul>');
			$('.progress-box').removeClass('hidden');
	}

	function gotoNextQuestion() {
		$('.quiz-button').on('click', '#next-button', function() {
			state.currentQuestion++;
			$('input[type=radio]').removeAttr('disabled');
			$('#next-button').attr('type', 'submit').attr('id', 'submit-button').attr('disabled', true).text('Submit');
			$('.result').addClass('hidden');
			renderCurrentQuestion();
		})
	}

	function switchNextButton() {
		if (state.currentQuestion < state.questions.length - 1) {
			$('#submit-button').attr('id', 'next-button').attr('type', 'button').text('Next Question');
			gotoNextQuestion();
		} else {
			$('#submit-button').attr('id', 'results-button').attr('type', 'button').text('Quiz Results');
			gotoResultsPage();
		}
	}

	function renderQuizResults(score) {
		$('.result').addClass('hidden');
		$('.quiz-box').html(
				'<div class="quiz-results"><p>You got ' + score +
				' out of ' + state.questions.length + ' correct!</p>' +
				'<button type="button" id="retry">Retry Quiz</button></div>'
			)
	}

	function calculateGrade() {
		var grade  = state.grade.reduce(function (score, carry){
			return score + carry;
		});
		return grade;
	}

	function gotoResultsPage() {
		$('.quiz-button').on('click', '#results-button', function() {
			renderQuizResults(calculateGrade());
		});
	}

	function restartQuiz() {
		$('.quiz-box').on('click', '#retry', function() {
			state.currentQuestion = 0;
			state.grade = [];
			$(".quiz-start").removeClass("hidden");
			$(".quiz-box").addClass("hidden");
			$('.progress-box').addClass('hidden');
		})
	}

	startQuiz();
	restartQuiz();
}

$(document).ready(main())
