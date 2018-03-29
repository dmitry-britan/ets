//
// Валидация формы "Задать вопрос"
// =================================================================
let validateFormLogin = {
	rules: {
		email: {
			required: true,
			email: true,
		},
		password: {
			required: true,
		},
	},
	messages: {
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail',
		},
		password: {
			required: 'Введите Ваш пароль',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// Login Form
$('.js-form-login').validate(validateFormLogin);
