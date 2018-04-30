(() => {
	let $effectBlock = $('.is--effect-block');

	$('.nav__link').on('mouseover', (event) => {
		let $currentItem = $(event.currentTarget);
		let width = $currentItem.innerWidth();
		let left = $currentItem.position().left;

		$('.nav__link').removeClass('is--active');
		$currentItem.addClass('is--active');

		setTimeout(() => {
			if (!$currentItem.hasClass('is--active')) {
				return false;
			}
			$effectBlock.css({
				width,
				left,
				opacity: 1,
			});
		}, 150);
	});

	$('.nav__inner').on('mouseleave', () => {
		$('.nav__link').removeClass('is--active');
		setTimeout(() => {
			$effectBlock.css({
				width: '0px',
				left: '0px',
				opacity: 0,
			});
		}, 150);
	});
})();
