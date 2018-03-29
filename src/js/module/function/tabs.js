//
// Tabs
//---------------------------------------------------------------------------------------
if ($('.js-tabs').length) {
	let $tabs = $('.js-tabs-item');
	let $panes = $('.js-tabs-content');

	$tabs.on('click', (event) => {
		event.preventDefault();

		let id = $(event.currentTarget).attr('href');

		$tabs.removeClass('is--active');
		$(event.currentTarget).addClass('is--active');

		$panes.removeClass('is--active');
		$(id).addClass('is--active');
	});
}
