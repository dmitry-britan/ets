//
// Валидация формы "Задать вопрос"
// =================================================================
let validateFormQuestion = {
	rules: {
		name: {
			required: true,
		},
		question: {
			required: true,
		},
	},
	messages: {
		name: {
			required: 'Введите Ваше имя',
		},
		question: {
			required: 'Введите Ваш вопрос',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// QUESTION FORM
$('.js-form-question').validate(validateFormQuestion);
