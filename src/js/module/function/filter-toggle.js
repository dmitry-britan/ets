(() => {
	if (!$('.js-toggle-filter').length) {
		return false;
	}

	$('.js-toggle-filter').on('click', (event) => {
		event.preventDefault();
		$('body').toggleClass('is--filter-active');
		$('.js-filter').toggleClass('is--active');
	});

})();
