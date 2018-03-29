function dropdown(triger, menu) {
	$(triger).hover(
		(event) => {
			$(event.currentTarget).find(menu).stop(true, true).fadeIn(300);
		},
		(event) => {
			$(event.currentTarget).find(menu).stop(true, true).fadeOut(150);
		}
	);
}
