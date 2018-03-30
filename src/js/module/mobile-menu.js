(() => {
	if (!$('.mobile-nav').length) {
		return false;
	}

	$('.mobile-nav').find('i').each((index, element) => {
		$(element).on('click', (event) => {
			$(event.currentTarget).parent().toggleClass('is--open');
			$(event.currentTarget).parent().find('.mobile-nav__sub').slideToggle();
		});
	});
})();
