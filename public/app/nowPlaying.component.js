(function() {
	'use strict';

	angular
		.module("app")
		.component("nowPlaying",{
			controller:nowPlayingCtrl,
			controllerAs:'ctrl',
			templateUrl:"./app/now-playing.html",
		});//end component

	function nowPlayingCtrl(websocketFactory, $rootScope){
		var self = this;
		
		self.$onInit = init;

		$rootScope.$on("now playing", function(event, playingWhat){
			self.text = playingWhat;
		})
		
		function init(){
			console.log("init component nowPlaying");
			self.text = "Nothing Yet...";
			self.sendRequest = sendRequest;
		}// end init

		function sendRequest(whatToRequest){
			websocketFactory.requestToPlay(whatToRequest);
		}


	}//end controller
	
	nowPlayingCtrl.$inject = ['websocketFactory', '$rootScope'];
	
})();//