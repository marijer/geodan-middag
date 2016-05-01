System.trace = true;

// show all modules through System.loads in console > used to build a graph of relationships

window.showModuleRelationships = function() {
	var modules = Object.keys(System.loads)
		.map(function(moduleName) {
		return System.loads[moduleName];
	})

	var displayName = function (module) {
		return module
			.replace(System.baseURL, '');
	}

	var moduleDefinitions = modules.map(function (module) {
		var name = displayName(module.name);
		return "["+ name + "| " + module.metadata.format +"]";
	})

	var dependencyDefinitions = [];

	modules.filter(function(module){
		return module.deps.length > 0;
		})
		.forEach(function(module){
			var name = displayName(module.name);
			var dependencies = module.deps
			.map(function(dependency){
				return System.normalizeSync(dependency, module.name, module.address);
			})
			.map(displayName)
			.map(function(dependencyName){
				return "[" + name + "]->[" + dependencyName + "]";
			});

			dependencyDefinitions = dependencyDefinitions.concat(dependencies);
		})


	var definitions = moduleDefinitions.concat(dependencyDefinitions);

	window.open('http://yuml.me/diagram/plain/class/' + definitions);
}