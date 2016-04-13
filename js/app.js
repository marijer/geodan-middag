var urlData = 'data/data.json';

function getData(url, callback) {
	d3.json(url, function(error, data) {
		callback(data.features);
	})
}

var photoGallery = {
	imgBaseSrc: 'http://saturnus.geodan.nl/geodanmiddag/uploads/',
	data: [],
	selectedAuthor: '',

	createGallery: function(data) {
		this.data = data;
		this.createPhotoGallery(data);

		var authorList = this.createAuthorList(data);
		this.renderAuthorList(authorList);
	},

	createAuthorList: function(data) {
		var nested_data = d3.nest()
			.key(function(d) { return d.properties.username; })
			.rollup(function(ids) {
			    return ids.length; 
			})
			.entries(data);

		nested_data.sort(function(x, y){
		   return d3.descending(x.values, y.values);
		})

		return nested_data;
	},

	renderAuthorList: function(data) {
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
		    	photoGallery.filterPhotos(d.key);
		    })
	},

	filterPhotos: function( name ) {
		var isSame = false;
		if (this.selectedAuthor === name) {
			isSame = true;
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

	createPhotoGallery: function(data) {
		var self = this;

		var svg = d3.select("#photo-container")
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
			.append("img")
		  	.attr("xlink:href", "myimage.png")
		    .attr("src",function (d) {
		    	return photoGallery.imgBaseSrc + d.properties.photoid;
		    })
		    .attr("width", 100)
		    .attr("height", 100);
	}
};

getData(urlData, function(data) {
	photoGallery.createGallery(data);
});





