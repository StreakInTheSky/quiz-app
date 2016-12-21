var state = {
	questions: [],
	answerKey: [],
}

state.questions = [
	{
		phrase: 'konnichiwa',
		1: 'bye',
		2: 'welcome',
		3: 'thank you',
		4: 'hello'
	},
	{
		phrase: 'sayonara',
		1: 'bathroom',
		2: 'bye',
		3: 'welcome',
		4: 'thank you'
	}
];

state.answerKey = [4, 2]

function main() {
	function startQuiz() {
		$('#start-button').on('click', function() {
			$(".quiz-start").addClass("toggle-visible");
			$(".quiz-box").removeClass("toggle-visible");
		})
	}

	function renderQuestion(translate, ans1, ans2, ans3, ans4) {
		$(".phrase-to-translate").text(translate);
		$("input[name=answer1]").val(ans1).after(ans1);
		$("input[name=answer2]").val(ans2).after(ans2);
		$("input[name=answer3]").val(ans3).after(ans3);
		$("input[name=answer4]").val(ans4).after(ans4);
	}

	function showCurrentQuestion(questionNum) {
		var questionValue = state.questions[questionNum];
		renderQuestion(questionValue.phrase, questionValue['1'], questionValue['2'], questionValue['3'], questionValue['4']);
		$('.js-current-question-number').text(questionNum + 1);
	}

	function currentQuestion() {
		var i = 0;
		showCurrentQuestion(i);
		$('#submit-button').click(function() {
			i++;
		})
	}

	startQuiz();
	currentQuestion();
}

$(document).ready(main())