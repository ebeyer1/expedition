angular.module('cardApp', [])
	.controller('CardsController', function (cardApi) {
		var vm = this;
		
		load();
		
		function load() {
			cardApi.getAbilities().then(function(response) {
				vm.abilities = response;
				// TODO - eventually parse data into a dictionary... abilities['Magic'] = []; abilities['Music'] = []; etc...
			});
			
			cardApi.getEncounters().then(function(response) {
				vm.encounters = response;
			});
			
			cardApi.getAdventurers().then(function(response) {
				vm.adventurers = response;
			});
			
			cardApi.getLoot().then(function(response) {
				vm.loot = response;
			});
		}
	});