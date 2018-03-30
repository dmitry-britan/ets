let slideout = new Slideout({
	panel: $('.site__content')[0],
	menu: $('.site__menu')[0],
	padding: 256,
	tolerance: 70,
});
let $toggleIcon = $('.hamburger');
let activeClass = 'is-active';

// Toggle button
$toggleIcon.on('click', (event) => {
	$(event.currentTarget).toggleClass(activeClass);
	slideout.toggle();
});

slideout.on('open', () => {
	$toggleIcon.addClass(activeClass);
});

slideout.on('close', () => {
	$toggleIcon.removeClass(activeClass);
});
