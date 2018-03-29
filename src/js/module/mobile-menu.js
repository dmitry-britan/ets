//
// CLASS - Mobile Menu
// =================================================================
class Menu {
	constructor() {
		this.closeMobileMenuOnOutOfClick();
		$('.js-nav-toggle').on('click', () => {
			this.toggleMenuVisibility();
			this.toggleMenuTriggerClass();
			this.toggleBodyBackground();
		});
	}
	/* eslint class-methods-use-this: ["error", { 
		"exceptMethods": [
			"toggleMenuVisibility",
			"toggleBodyBackground",
			"toggleMenuTriggerClass",
			"closeMobileMenuOnOutOfClick",
		] }] 
	*/
	toggleMenuVisibility() {
		$('.mobile-nav').toggleClass('is--visible');
	}
	toggleBodyBackground() {
		$('body').toggleClass('is--mobile-active');
	}
	toggleMenuTriggerClass() {
		$('.js-nav-toggle').toggleClass('is--active');
	}
	closeMobileMenuOnOutOfClick() {
		$('body').mouseup((e) => {
			let subject = $('.is--visible');

			if (subject.length
				&& !$(e.target).hasClass('js-nav-toggle')
				&& !$(e.target).hasClass('icon-nav')
				&& e.target.className !== subject.attr('class')
				&& !subject.has(e.target).length) {
				this.toggleMenuVisibility();
				this.toggleBodyBackground();
				this.toggleMenuTriggerClass();
			}
		});
	}
}
function initMenu() {
	return new Menu();
}
initMenu();
