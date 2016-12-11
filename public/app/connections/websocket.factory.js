(function() {
'use strict';

	angular
		.module('app')
		.factory('websocketFactory', websocketFactory);

	websocketFactory.$inject = ['$q', '$http', '$rootScope', '$timeout'];
	function websocketFactory($q, $http, $rootScope, $timeout) {

		var socket = io();
		socket.on('now playing', function(thingThatIsPlaying){
			$timeout(function(){
				$rootScope.$broadcast('now playing', thingThatIsPlaying);
			},0);
		});
		socket.on('connect', function(connection){
			$timeout(function(){
				$rootScope.$broadcast('connection', connection);
			},0);
		});
		socket.on('disconnect', function(disconnection){
			$timeout(function(){
				$rootScope.$broadcast('disconnect', disconnection);
			},0);
		});

		var service = {
			requestToPlay:requestToPlay
		};

		return service;

		////////////////
		function requestToPlay(newRequest) { 
			socket.emit("play request", newRequest);
		}
	}
})();