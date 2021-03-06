//
// Валидация формы "Заказать обратный звонок"
// =================================================================
let validateFormCallback = {
	rules: {
		name: {
			required: true,
		},
		phone: {
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
	},
	focusCleanup: true,
	focusInvalid: false,
};

// CALLBACK FORM
$('.js-form-callback').validate(validateFormCallback);
