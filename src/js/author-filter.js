import { model } from 'js/model.js';
import {photoController} from 'js/photo.controller.js';

var authorFilter = {
	render: function() {
		var data = model.getAuthorList();

		var svg = d3.select("#filter-list")
			.selectAll('.filter-authors')
			.data(data)
			.enter()
			.append('div')
			.attr('class', 'filter-authors');

			svg.html(function(d) {
		        return d.key + ' ';
		    });

		    svg.append('span')
		    	.attr('class', 'author-values')
		    	.html(function(d) {
		        return d.values;
		    });

		    svg.on('click', function(d){
		    	photoController.filterAuthors(d.key);
		    })
	}
}

export {authorFilter};