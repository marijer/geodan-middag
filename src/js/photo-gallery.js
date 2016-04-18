import { authorFilter } from 'js/author-filter.js';
import { model } from 'js/model.js';

var photoGallery = {
	imgBaseSrc: 'http://saturnus.geodan.nl/geodanmiddag/uploads/',
	selectedAuthor: '',

	filterByAuthor: function( name ) {
		var isSame = false;
		if (this.selectedAuthor === name) {
			isSame = true;
			name = '';
		}

		this.selectedAuthor = name;

		d3.selectAll('.item')
			.classed("none", function(d) { 
				return d.properties.username !== name && !isSame;
			});
		
		d3.selectAll('.filter-authors')
			.classed('active', function(d) {
				return d.key === name && !isSame;
			});
	},

	render: function() {
		var data = model.getData();

		var svg = d3.select('#photo-container')
					.selectAll('.item')
					.data(data, function(d){
						return d.properties.photoid;
					});

		svg.enter()
			.append('div')
			.attr('class', 'item');

		svg.append('a')
			.attr('href', function(d){
				return photoGallery.imgBaseSrc + d.properties.photoid;
			})
			.attr('title', function(d) {
				return d.properties.username;
			})
			.attr('target', '_blank')
			.append('img')
		  	.attr('xlink:href', 'myimage.png')
		    .attr('src',function (d) {
		    	return photoGallery.imgBaseSrc + d.properties.photoid;
		    })
		    .attr('width', 100)
		    .attr('height', 100);
	}
};

export {photoGallery};



