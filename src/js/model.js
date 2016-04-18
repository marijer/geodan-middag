

function getData(url, callback) {
	d3.json(url, function(error, data) {
		callback(data.features);
	})
}

var model = {
	urlData: '../data/data.json',
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

export {model};