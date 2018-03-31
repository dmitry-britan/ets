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
		prevArrow: $('.js-promo-slider-prev'),
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
		responsive: [
			{
				breakpoint: 1210,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
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
		asNavFor: '.js-slider-album-nav',
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
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
				},
			},
		],
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
		asNavFor: '.js-slider-product-single-nav',
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
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					dots: true,
				},
			},
		],
	});
}
