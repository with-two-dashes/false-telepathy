(function() {
	'use strict';

	angular
		.module("app")
		.component("indicatorLight",{
			controller:IndicatorLightCtrl,
			controllerAs:'ctrl',
			templateUrl:"./app/indicatorLight.html"
		});//end component

	function IndicatorLightCtrl($rootScope){
		var self = this;
		
		self.$onInit = init;

		$rootScope.$on("connection", function(event, detail){
			console.log("Connection established!", detail);
			self.connected = true;
		});
		$rootScope.$on("disconnect", function(event, detail){
			console.log("Connection Broken!", detail);
			self.connected = false;
		})
		
		function init(){
			console.log("init component IndicatorLight");
		}// end init
		
	}//end controller
	
	IndicatorLightCtrl.$inject = ['$rootScope'];
	
})();//