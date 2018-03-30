(() => {
	$('a[href="#search"]').on('click', (event) => {
		event.preventDefault();

		// Закрываем боковое меню (в случае открытия поиска из него)
		slideout.close();

		$('.search-modal').addClass('open');
		$('.search-modal > form > input[type="search"]').focus();
	});

	$('.search-modal').on('click keyup', (event) => {
		if (
			event.target === event.currentTarget ||
			event.target.className === 'close' ||
			event.keyCode === 27
		) {
			$(event.currentTarget).removeClass('open');
		}
	});
})();
