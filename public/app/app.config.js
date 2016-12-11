(function() {
	'use strict';

	angular
		.module('app')
		.config(configuration);

	configuration.$inject = [];

	function configuration(){
		console.log("Angular app is being configured.");
	}



})();