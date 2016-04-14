function getData(url, callback) {
	d3.json(url, function(error, data) {
		callback(data.features);
	})
}

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
		    	controller.filterAuthors(d.key);
		    })
	}
}

var timelineFilter = {
	render: function() {

	}
}

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

var model = {
	urlData: 'data/data.json',
	data: [],

	init: function(fn) {
		getData(this.urlData, function(data) {
			model.data = data;
			fn(data);
		});
	},

	getAuthorList: function() {
		var data = model.getData();

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

	getData: function() {
		return model.data;
	}
}

var controller = {
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

controller.init();




