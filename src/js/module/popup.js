//
// Modal Popup
// =================================================================
$.arcticmodal('setDefault', {
	afterClose: () => {
		$('body').css({
			'overflow': 'auto',
			'margin-right': '0px',
		});
	},
});

$('[data-modal]').on('click', (e) => {
	e.preventDefault();
	let link = $(e.currentTarget).data('modal');

	if (link) {
		$(`#${link}`).arcticmodal();
	}
});
