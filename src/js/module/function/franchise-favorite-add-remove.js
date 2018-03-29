// create/delete bookmarks
$(document).on('click', '.js-franchise-favorite-toggle-status', (event) => {
	event.preventDefault();
	let link = $(event.currentTarget);
	let lotId = link.data('lot');

	$.ajax({
		type: 'post',
		url: `/user-bookmarks/bookmark/${lotId}`,
		cache: false,
		success: (response) => {
			if (response.status === true) {
				link.toggleClass('is--active');
			}
		},
	});
});
