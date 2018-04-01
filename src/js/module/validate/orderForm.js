//
// Валидация формы "Заказать обратный звонок"
// =================================================================
let validateFormOrder = {
	rules: {
		name: {
			required: true,
		},
		phone: {
			required: true,
		},
		email: {
			required: true,
			type: 'email',
		},
	},
	messages: {
		name: {
			required: 'Введите Ваше имя',
		},
		phone: {
			required: 'Введите номер телефона',
		},
		phone: {
			required: 'Введите номер телефона',
		},
		email: {
			required: 'Введите Ваш e-mail',
			type: 'Введите корректный адрес',
		},
	},
	focusCleanup: true,
	focusInvalid: false,
};

// ORDER FORM
$('.js-form-order').validate(validateFormOrder);
