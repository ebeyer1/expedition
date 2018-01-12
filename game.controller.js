angular.module('cardApp', [])
	.controller('GameController', function (cardApi) {
		var vm = this;
		
		vm.selectedAdventurer = null;
		
		vm.selectAdventurer = function(adventurer) {
			vm.selectedAdventurer = angular.copy(adventurer);
			
			
			pullCards('melee', vm.selectedAdventurer.melee);
			pullCards('music', vm.selectedAdventurer.music);
			pullCards('ranged', vm.selectedAdventurer.ranged);
			pullCards('magic', vm.selectedAdventurer.magic);
		}
		
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
		
		function pullCards(type, count) {
			// fill out vm.selectedAdventurer.abilityCards...
			vm.selectedAdventurer.abilityCards = vm.selectedAdventurer.abilityCards || [];
			
			if (count <= 0) return;
			
			var abilities = vm.abilities.filter(function(item) {
				return item.class.toLowerCase() === type;
			});
			
			for (var i = 0; i < count; i++) {
				var rndNum = getRandomArbitrary(0, abilities.length);
				var item = abilities.splice(rndNum, 1)[0];
				vm.selectedAdventurer.abilityCards.push(item);
			}
		}
		
		/**
		 * Returns a random number between min (inclusive) and max (exclusive)
		 */
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}
	});