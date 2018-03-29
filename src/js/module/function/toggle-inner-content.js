(() => {
	let block = '.js-toggle-block';
	let switcher = '.js-toggle-switcher';
	let subject = '.js-toggle-subject';
	let moving = '.js-toggle-moving';

	if (!$(block).length) {
		return false;
	}

	$(switcher).on('click', (event) => {
		let $parent = $(event.currentTarget).parents(block);

		if ($parent.hasClass('is--active')) {
			// Закрываем открытый блок
			$(`${block}.is--active`)
				.removeClass('is--active')
				.find(subject).slideUp();

			return false;
		}
		// Закрываем открытый блок
		$(`${block}.is--active`)
			.removeClass('is--active')
			.find(subject).slideUp();

		// Открывааем нажатый блок
		$(moving).appendTo($parent.find(subject));
		$parent.addClass('is--active').find(subject).slideDown();
	});

})();
