//
// Валидация формы "Откликнуться на вакансию"
// =================================================================
let validateFormVacancy = {
	rules: {
		name: {
			required: true,
		},
		phone: {
			required: true,
		},
		cv_file: {
			required: true,
		},
	},
	messages: {
		name: {
			required: 'Введите Ваше имя',
		},
		phone: {
			required: 'Введите номер телефона',
		},
		cv_file: {
			required: 'Приложите резюме',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// VACANCY FORM
$('.js-form-vacancy').validate(validateFormVacancy);
