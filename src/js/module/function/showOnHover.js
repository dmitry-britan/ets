function showOnHover(element, selectors){
	$(element).hover(
		function(){
			$(this).find(selectors).stop().slideDown(300);
		},
		function(){
			$(this).find(selectors).stop().slideUp(300);
		}
	);
}
