if ($('.js-write-answer').length) {
	$('.js-write-answer').on('click', (e) => {
		let dialogId = $(e.currentTarget).data('id');

		$('input[name="dialog_id"]').val(dialogId);
	});
}
