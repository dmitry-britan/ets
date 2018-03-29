//
// Подключаем fancybox для фото товара
//---------------------------------------------------------------------------------------
let $gallery = $('[rel="gallery"]');

if ($gallery.length) {
	$gallery.fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic',
		helpers: {
			title: {
				type: 'inside',
			},
		},
	});
}
