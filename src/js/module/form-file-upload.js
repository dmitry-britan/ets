//
// Обработка элемента формы input[type=file]
// =================================================================
(() => {
	// Проверка расширениия загружаемого файла
	$.fn.hasExtension = function(exts) {
		return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test($(this).val());
	}

	if ($('input[type=file]').length) {
		let validType = $('.js-file-type');
		let validSize = $('.js-file-size');

		$('input[type=file]').on('change', (event) => {
			// Если загружаемый файл не соответствует нужному типу
			if (!$(event.currentTarget).hasExtension(['.pdf', '.doc', '.docx', '.txt'])) {
				validType.fadeIn();

				return false;
			}
			validType.fadeOut();

			// Если размер загружаемого файла больше 4 МБ
			if ((event.currentTarget.files[0].size / 1024 / 1024).toFixed(2) > 4) {
				validSize.fadeIn();

				return false;
			}
			validSize.fadeOut();

			// Если все проверки прошли успешно - Работаем дальше :)
			let str = $(event.currentTarget).val();
			let $label = $(event.currentTarget).next();
			let labelText = $label.text();
			let i;

			if (str.lastIndexOf('\\')) {
				i = str.lastIndexOf('\\') + 1;
			} else {
				i = str.lastIndexOf('/') + 1;
			}

			let filename = str.slice(i);

			if (filename === '' || filename === undefined) {
				$label.text(labelText);
			} else {
				$label.text(filename);
			}
		});
	}
})();
