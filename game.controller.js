angular.module('cardApp', [])
	.controller('GameController', function (cardApi) {
		var vm = this;
		
		vm.draftOptions = [];
		vm.selectedAdventurer = null;
		
		vm.addHealth = function(num) {
			vm.selectedAdventurer.health += num;
		}
		
		vm.clearCards = function () {
			vm.selectedAdventurer.drawnAbilityCards = [];
			vm.selectedAdventurer.discardedAbilityCards = [];
			vm.selectedAdventurer.abilityCards = angular.copy(vm.originalSet);
		}
		
		vm.chooseEncounters = function (val) {
			if (val) {
				vm.currentEncounters = [];
			}
			vm.choosingEncounters = val;
		}
		
		vm.chooseDraftChoice = function(abilityCard) {
			vm.draftOptions = [];
			
			var abilities = vm.abilities.filter(function(item) {
				return item.class.toLowerCase() === abilityCard.class.toLowerCase();
			});
			
			var idx = abilities.indexOf(abilityCard);
			console.log('indx', idx);
			if (idx >= 0) {
				abilities.splice(idx, 1);
			}
			vm.selectedAdventurer.abilityCards.push(abilityCard);
			vm.originalSet.push(abilityCard);
			
			vm.levelingUp = false;
		}
		
		vm.discardLoot = function(lootCard) {
			vm.discardedLoot = vm.discardedLoot || [];
			vm.discardedLoot.push(lootCard);
			vm.selectedAdventurer.lootCards = vm.selectedAdventurer.lootCards.filter(function(item) {
				return item.name !== lootCard.name;
			});
		}
		
		vm.draft = function(type) {
			vm.draftOptions = [];
		
			var abilities = vm.abilities.filter(function(item) {
				return item.class.toLowerCase() === type;
			});
			
			var listCopy = angular.copy(abilities);
			for (var i = 0; i < 3; i++) {
				var rndNum = getRandomArbitrary(0, listCopy.length);
				var item = listCopy.splice(rndNum, 1)[0];
				vm.draftOptions.push(item);
			}
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
		
		vm.getLoot = function () {
			var max = vm.loot.length;
			var rndNum = getRandomArbitrary(0, max);
			var item = vm.loot.splice(rndNum, 1)[0];
			vm.selectedAdventurer.lootCards = vm.selectedAdventurer.lootCards || [];
			vm.selectedAdventurer.lootCards.push(item);
		}
		
		vm.finishEncounter = function() {
			vm.currentEncounters = [];
		}
		
		vm.levelUp = function() {
			vm.levelingUp = true;
		}
		
		vm.playCard = function(abilityCard) {
			abilityCard.selected = false;
			vm.selectedAdventurer.discardedAbilityCards = vm.selectedAdventurer.discardedAbilityCards || [];
			vm.selectedAdventurer.discardedAbilityCards.push(abilityCard);
			vm.selectedAdventurer.drawnAbilityCards = vm.selectedAdventurer.drawnAbilityCards.filter(function (item) {
				return item.name !== abilityCard.name;
			});
			// return other 2 cards to the draw pile.
			for (var i = 0; i < vm.selectedAdventurer.drawnAbilityCards.length; i++) {
				vm.selectedAdventurer.abilityCards.push(vm.selectedAdventurer.drawnAbilityCards[i]);
			}
			vm.selectedAdventurer.drawnAbilityCards = [];
			
			// after this user will need to draw new cards for their next turn. Do this auto, or make them click?
			// vm.drawCards();
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
		
		vm.selectCard = function(abilityCard) {
			abilityCard.selected = abilityCard.selected || false;
			abilityCard.selected = !abilityCard.selected;
		}
		
		vm.selectEncounter = function(encounterCard) {
			vm.currentEncounters = vm.currentEncounters || [];
			var encounter = angular.copy(encounterCard);
			encounter.currentHealth = encounter.health;
			vm.currentEncounters.push(encounter);
		}
		
		vm.shuffle = function () {
			vm.hideCards = true;
		}
		
		vm.updateHealth = function(encounter, val) {
			var newNum = Number(encounter.currentHealth) + Number(val);
			var actual = Math.min(Math.max(newNum, 0), encounter.health);
			encounter.currentHealth = actual;
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