import {model} from 'js/model.js';
import {photoGallery} from 'js/photo-gallery.js';
import {authorFilter} from 'js/author-filter.js';

var photoController = {
	init: function() {
		model.init(function(data) {
			photoGallery.render();

			authorFilter.render();
		})
	},

	filterAuthors: function(name) {
		photoGallery.filterByAuthor(name);
	}
}

export {photoController};