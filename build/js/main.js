'use strict';

function checkQtyStatus($el, minValue) {
	if (parseInt($el.val(), 10) > minValue) {
		$el.parent().addClass('is--active');
	} else {
		$el.parent().removeClass('is--active');
	}
}

function changeQty($el) {
	var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var minValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	$el.each(function(i, element) {
		var $qty = $(element);
		var $minus = $qty.find('.js-' + className + 'qty-minus');
		var $plus = $qty.find('.js-' + className + 'qty-plus');
		var $input = $qty.find('.js-' + className + 'qty-value');
		var qtyVal = parseInt($input.val(), 10);

		$minus.on('click', function() {
			if (qtyVal > minValue) {
				$input.val(--qtyVal);
			}
			checkQtyStatus($input, minValue);
		});
		$plus.on('click', function() {
			$input.val(++qtyVal);
			checkQtyStatus($input, minValue);
		});
	});
}

changeQty($('.js-qty'));
changeQty($('.js-additive-qty'), 'additive-', 0);

var $productSinglePhoto = $('.product-single__photo');

if ($productSinglePhoto.length) {
	$productSinglePhoto.find('[rel="gallery"]').fancybox();
}

//
// Material Effect for form elements
//---------------------------------------------------------------------------------------
(function() {
	var $inputs = $('.form__input').add('.form__textarea');

	if ($inputs.length) {
		$inputs.each(function(index, element) {
			if ($(element).val() !== '') {
				$(element).parent().find('label').addClass('is--active');
			}
		});

		$inputs.focus(function(event) {
			var $element = $(event.currentTarget);

			$element.parent().find('label').addClass('is--active');
		}).blur(function() {
			var $element = $(event.currentTarget);

			if ($element.val() === '') {
				$element.parent().find('label').removeClass('is--active');
			}
		});
	}
})();

(function() {
	if (!$('.js-toggle-filter').length) {
		return false;
	}

	$('.js-toggle-filter').on('click', function(event) {
		event.preventDefault();
		$('body').toggleClass('is--filter-active');
		$('.js-filter').toggleClass('is--active');
	});
})();

(function() {
	$('a[href="#search"]').on('click', function(event) {
		event.preventDefault();

		// Закрываем боковое меню (в случае открытия поиска из него)
		slideout.close();

		$('.search-modal').addClass('open');
		$('.search-modal > form > input[type="search"]').focus();
	});

	$('.search-modal').on('click keyup', function(event) {
		console.log(event.target.className);
		if (event.target === event.currentTarget || event.target.className.includes('js-close') || event.keyCode === 27) {
			$(event.currentTarget).removeClass('open');
		}
	});
})();

var slideout = new Slideout({
	panel: $('.site__content')[0],
	menu: $('.site__menu')[0],
	padding: 256,
	tolerance: 70
});
var $toggleIcon = $('.hamburger');
var activeClass = 'is-active';

// Toggle button
$toggleIcon.on('click', function(event) {
	$(event.currentTarget).toggleClass(activeClass);
	slideout.toggle();
});

slideout.on('open', function() {
	$toggleIcon.addClass(activeClass);
});

slideout.on('close', function() {
	$toggleIcon.removeClass(activeClass);
});

function showOnHover(element, selectors) {
	$(element).hover(function() {
		$(this).find(selectors).stop().slideDown(300);
	}, function() {
		$(this).find(selectors).stop().slideUp(300);
	});
}

//
// Tabs
//---------------------------------------------------------------------------------------
if ($('.js-tabs').length) {
	var $tabs = $('.js-tabs-item');
	var $panes = $('.js-tabs-content');

	$tabs.on('click', function(event) {
		event.preventDefault();

		var id = $(event.currentTarget).attr('href');

		$tabs.removeClass('is--active');
		$(event.currentTarget).addClass('is--active');

		$panes.removeClass('is--active');
		$(id).addClass('is--active');
	});
}

(function() {
	var block = '.js-toggle-block';
	var switcher = '.js-toggle-switcher';
	var subject = '.js-toggle-subject';
	var moving = '.js-toggle-moving';

	if (!$(block).length) {
		return false;
	}

	$(switcher).on('click', function(event) {
		var $parent = $(event.currentTarget).parents(block);

		if ($parent.hasClass('is--active')) {
			// Закрываем открытый блок
			$(block + '.is--active').removeClass('is--active').find(subject).slideUp();

			return false;
		}
		// Закрываем открытый блок
		$(block + '.is--active').removeClass('is--active').find(subject).slideUp();

		// Открывааем нажатый блок
		$(moving).appendTo($parent.find(subject));
		$parent.addClass('is--active').find(subject).slideDown();
	});
})();

//
// Slider - on main page
// =================================================================
if ($('.js-slider').length) {
	$('.js-slider').slick({
		arrows: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: $('.js-promo-slider-next'),
		prevArrow: $('.js-promo-slider-prev')
	});
}
if ($('.js-slider-assortment').length) {
	$('.js-slider-assortment').slick({
		arrows: true,
		adaptiveHeight: true,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: $('.js-assortment-slider-next'),
		prevArrow: $('.js-assortment-slider-prev'),
		responsive: [{
			breakpoint: 1210,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 800,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 1
			}
		}]
	});
}

// 
// Slider - Album
// =================================================================
if ($('.js-slider-album').length) {
	$('.js-slider-album').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-slider-album-nav'
	});

	$('.js-slider-album-nav').slick({
		arrows: true,
		infinite: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.js-slider-album',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		nextArrow: $('.js-album-slider-next'),
		prevArrow: $('.js-album-slider-prev'),
		responsive: [{
			breakpoint: 1100,
			settings: {
				slidesToShow: 5
			}
		}, {
			breakpoint: 900,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 700,
			settings: {
				slidesToShow: 3
			}
		}]
	});
}

// 
// Slider - Product Single
// =================================================================
if ($('.js-slider-product-single').length) {
	$('.js-slider-product-single').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-slider-product-single-nav'
	});

	$('.js-slider-product-single-nav').slick({
		arrows: true,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.js-slider-product-single',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		nextArrow: $('.js-product-single-slider-next'),
		prevArrow: $('.js-product-single-slider-prev'),
		responsive: [{
			breakpoint: 1000,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 800,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				dots: true
			}
		}]
	});
}

(function() {
	if (!$('.mobile-nav').length) {
		return false;
	}

	$('.mobile-nav').find('i').each(function(index, element) {
		$(element).on('click', function(event) {
			$(event.currentTarget).parent().toggleClass('is--open');
			$(event.currentTarget).parent().find('.mobile-nav__sub').slideToggle();
		});
	});
})();

//
// Modal Popup
// =================================================================
$.arcticmodal('setDefault', {
	afterClose: function afterClose() {
		$('body').css({
			'overflow': 'auto',
			'margin-right': '0px'
		});
	}
});

$('[data-modal]').on('click', function(e) {
	e.preventDefault();
	var link = $(e.currentTarget).data('modal');

	if (link) {
		$('#' + link).arcticmodal();
	}
});

//
// Обработка элемента формы input[type=file]
// =================================================================
(function() {
	// Проверка расширениия загружаемого файла
	$.fn.hasExtension = function(exts) {
		return new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$').test($(this).val());
	};

	if ($('input[type=file]').length) {
		var validType = $('.js-file-type');
		var validSize = $('.js-file-size');

		$('input[type=file]').on('change', function(event) {
			// Если загружаемый файл не соответствует нужному типу
			if (!$(event.currentTarget).hasExtension(['.pdf', '.doc', '.docx', '.txt'])) {
				validType.fadeIn();

				return false;
			}
			validType.fadeOut();

			// Если размер загружаемого файла больше 4 МБ
			if ((event.currentTarget.files[0].size / 1024 / 1024).toFixed(2) > 4) {
				validSize.fadeIn();

				return false;
			}
			validSize.fadeOut();

			// Если все проверки прошли успешно - Работаем дальше :)
			var str = $(event.currentTarget).val();
			var $label = $(event.currentTarget).next();
			var labelText = $label.text();
			var i = void 0;

			if (str.lastIndexOf('\\')) {
				i = str.lastIndexOf('\\') + 1;
			} else {
				i = str.lastIndexOf('/') + 1;
			}

			var filename = str.slice(i);

			if (filename === '' || filename === undefined) {
				$label.text(labelText);
			} else {
				$label.text(filename);
			}
		});
	}
})();

//
// Валидация формы "Задать вопрос"
// =================================================================
var validateFormLogin = {
	rules: {
		email: {
			required: true,
			email: true
		},
		password: {
			required: true
		}
	},
	messages: {
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail'
		},
		password: {
			required: 'Введите Ваш пароль'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// Login Form
$('.js-form-login').validate(validateFormLogin);

//
// Валидация формы "Задать вопрос"
// =================================================================
var validateFormAsk = {
	rules: {
		name: {
			required: true
		},
		email: {
			required: true,
			email: true
		},
		comment: {
			required: true
		}
	},
	messages: {
		name: {
			required: 'Введите Ваше имя'
		},
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail'
		},
		comment: {
			required: 'Введите Ваше сообщение'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// ASK FORM
$('.js-form-ask').validate(validateFormAsk);

//
// Валидация формы "Задать вопрос"
// =================================================================
var validateFormQuestion = {
	rules: {
		name: {
			required: true
		},
		question: {
			required: true
		}
	},
	messages: {
		name: {
			required: 'Введите Ваше имя'
		},
		question: {
			required: 'Введите Ваш вопрос'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// QUESTION FORM
$('.js-form-question').validate(validateFormQuestion);

//
// Валидация формы "Ответить на сообщение"
// =================================================================
var validateFormAnswer = {
	rules: {
		answer: {
			required: true
		}
	},
	messages: {
		answer: {
			required: 'Введите Ваше сообщение'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// ANSWER FORM
$('.js-form-answer').validate(validateFormAnswer);

//
// Валидация формы "Заказать обратный звонок"
// =================================================================
var validateFormCallback = {
	rules: {
		name: {
			required: true
		}
	},
	messages: {
		name: {
			required: 'Введите Ваше имя'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// CALLBACK FORM
$('.js-form-callback').validate(validateFormCallback);

// 
// Валидация формы "Быстрая Регистрация"
// =================================================================
var validateFormRegistration = {
	rules: {
		name: {
			required: true
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		name: {
			required: 'Введите Ваше имя'
		},
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail'
		}
	},
	submitHandler: function submitHandler(form) {
		// ////////////////////
		//  AJAX CODE GOES HERE
		// ////////////////////
		form.reset();
	},
	focusCleanup: true,
	focusInvalid: false
};

// REGISTRATION FORM
$('.js-form-registration').validate(validateFormRegistration);

//
// Валидация формы "Задать вопрос"
// =================================================================
var validateFormProfileData = {
	rules: {
		email: {
			required: true,
			email: true
		},
		name: {
			required: true
		},
		city: {
			required: true
		},
		country: {
			required: true
		},
		account: {
			required: true
		}
	},
	messages: {
		email: {
			email: 'Введите корректный e-mail адрес',
			required: 'Введите Ваш e-mail'
		},
		name: {
			required: 'Введите Ваше имя'
		},
		city: {
			required: 'Введите Ваш город'
		},
		country: {
			required: 'Введите Вашу страну'
		}
	},
	focusCleanup: true,
	focusInvalid: false
};

// ProfileData Form
$('.js-form-profile-data').validate(validateFormProfileData);

//
// Подключаем fancybox для фото товара
//---------------------------------------------------------------------------------------
var $gallery = $('[rel="gallery"]');

if ($gallery.length) {
	$gallery.fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		helpers: {
			title: {
				type: 'inside'
			}
		}
	});
}
