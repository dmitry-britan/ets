let $el = $('.contact-info__icon');

if ($el.length) {
	$el.on('click', (event) => {
		event.preventDefault();
		$(event.currentTarget).parent().toggleClass('is--active');
	});
}
