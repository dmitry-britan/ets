//
// Валидация формы "Ответить на сообщение"
// =================================================================
let validateFormAnswer = {
	rules: {
		answer: {
			required: true,
		},
	},
	messages: {
		answer: {
			required: 'Введите Ваше сообщение',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// ANSWER FORM
$('.js-form-answer').validate(validateFormAnswer);
