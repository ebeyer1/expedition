angular.module('cardApp', [])
	.controller('GameController', function (cardApi) {
		var vm = this;
		
		vm.selectedAdventurer = null;
		
		vm.addHealth = function(num) {
			vm.selectedAdventurer.health += num;
		}
		
		vm.clearCards = function () {
			vm.selectedAdventurer.drawnAbilityCards = [];
			vm.selectedAdventurer.discardedAbilityCards = [];
			vm.selectedAdventurer.abilityCards = angular.copy(vm.originalSet);
		}
		
		vm.drawCards = function() {
			vm.selectedAdventurer.drawnAbilityCards = vm.selectedAdventurer.drawnAbilityCards || [];
			var cardsToDraw = 3 - vm.selectedAdventurer.drawnAbilityCards.length;
			for (var i = 0; i < cardsToDraw; i++) {
				var max = vm.selectedAdventurer.abilityCards.length;
				if (max === 0) { // shuffle discard cards back in
					vm.selectedAdventurer.abilityCards = angular.copy(vm.selectedAdventurer.discardedAbilityCards);
					vm.selectedAdventurer.discardedAbilityCards = [];
					max = vm.selectedAdventurer.abilityCards.length;
				}
				var rndNum = getRandomArbitrary(0, max);
				var item = vm.selectedAdventurer.abilityCards.splice(rndNum, 1)[0];
				vm.selectedAdventurer.drawnAbilityCards.push(item);
			}
		}
		
		vm.playCard = function(abilityCard) {
			vm.selectedAdventurer.discardedAbilityCards = vm.selectedAdventurer.discardedAbilityCards || [];
			vm.selectedAdventurer.discardedAbilityCards.push(abilityCard);
			vm.selectedAdventurer.drawnAbilityCards = vm.selectedAdventurer.drawnAbilityCards.filter(function (item) {
				return item.name !== abilityCard.name;
			});
			vm.drawCards();
		}
		
		vm.selectAdventurer = function(adventurer) {
			vm.selectedAdventurer = angular.copy(adventurer);
			vm.selectedAdventurer.health = 12;
			
			pullCards('melee', vm.selectedAdventurer.melee);
			pullCards('music', vm.selectedAdventurer.music);
			pullCards('ranged', vm.selectedAdventurer.ranged);
			pullCards('magic', vm.selectedAdventurer.magic);
			
			vm.originalSet = angular.copy(vm.selectedAdventurer.abilityCards);
		}
		
		vm.shuffle = function () {
			vm.hideCards = true;
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