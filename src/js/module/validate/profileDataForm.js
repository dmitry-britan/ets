//
// Валидация формы "Задать вопрос"
// =================================================================
let validateFormProfileData = {
	rules: {
		email: {
			required: true,
			email: true,
		},
		name: {
			required: true,
		},
		city: {
			required: true,
		},
		country: {
			required: true,
		},
		account: {
			required: true,
		},
	},
	messages: {
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail',
		},
		name: {
			required: 'Введите Ваше имя',
		},
		city: {
			required: 'Введите Ваш город',
		},
		country: {
			required: 'Введите Вашу страну',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// ProfileData Form
$('.js-form-profile-data').validate(validateFormProfileData);
