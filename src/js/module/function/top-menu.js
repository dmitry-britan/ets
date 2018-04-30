(() => {
	let $topMenu = $('.top-menu');
	let $topMenuLink = $topMenu.find('.top-menu__link');

	if (!$topMenu.length) {
		return false;
	}

	$topMenuLink.on('mouseover', (event) => {
		$(event.currentTarget).addClass('is--hovered');
	});

	$topMenuLink.on('mouseleave', (event) => {
		setTimeout(() => {
			$(event.currentTarget).removeClass('is--hovered');
		}, 900);
	});
})();
