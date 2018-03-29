function checkQtyStatus($el, minValue) {
	if (parseInt($el.val(), 10) > minValue) {
		$el.parent().addClass('is--active');
	} else {
		$el.parent().removeClass('is--active');
	}
}

function changeQty($el, className = '', minValue = 1) {
	$el.each((i, element) => {
		let $qty = $(element);
		let $minus = $qty.find(`.js-${className}qty-minus`);
		let $plus = $qty.find(`.js-${className}qty-plus`);
		let $input = $qty.find(`.js-${className}qty-value`);
		let qtyVal = parseInt($input.val(), 10);

		$minus.on('click', () => {
			if (qtyVal > minValue) {
				$input.val(--qtyVal);
			}
			checkQtyStatus($input, minValue);
		});
		$plus.on('click', () => {
			$input.val(++qtyVal);
			checkQtyStatus($input, minValue);
		});
	});
}

changeQty($('.js-qty'));
changeQty($('.js-additive-qty'), 'additive-', 0);
