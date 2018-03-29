//
// Обработка элемента формы input[type=file].js-media-file
// =================================================================
window.URL = window.URL || window.webkitURL;

function handleFiles(files) {
	let data = [];

	if (files.length) {
		for (let i = 0; i < files.length; i++) {

			let img = document.createElement('img');

			img.src = window.URL.createObjectURL(files[i]);

			data.push(img.src);
			
			//info.innerHTML = `${files[i].name}: ${files[i].size} bytes`;
		}
	}
	if (data.length){
			// Set the HTML template
			var mediaPhoto = _.template($('#mediaPhoto').html());
			data = [1,2,3,4];
			console.log(data);
			// render the template using the data
			$('body').after(mediaPhoto(data));
	}
}
