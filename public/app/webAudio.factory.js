(function() {
'use strict';

	angular
		.module('app')
		.factory('webAudioFactory', webAudioFactory);

	webAudioFactory.$inject = ['$q'];
	function webAudioFactory($q) {

		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

		if (!audoCtx){
			console.log("This browser does not support the Web Audio API.");
		}

		var service = {
			playFreq:playFreq
		};
		
		return service;

		////////////////
		function playFreq() { 
			
		}
	}
})();