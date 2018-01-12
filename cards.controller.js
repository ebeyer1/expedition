angular.module('cardApp', [])
	.controller('CardsController', function (cardApi) {
		var vm = this;
		
		load();
		
		function load() {
			cardApi.getAbilities().then(function(response) {
				vm.abilities = response.data.feed.entry.map(function(item) {
					return {
						comment: item['gsx$comment']['$t'],
						name: item['gsx$name']['$t'],
						class: item['gsx$class']['$t'],
						typeicon: item['gsx$typeicon']['$t'],
						target: item['gsx$target']['$t'],
						risk: item['gsx$risk']['$t'],
						hit: item['gsx$hit']['$t'],
						crithit: item['gsx$crithit']['$t'],
						miss: item['gsx$miss']['$t'],
						critmiss: item['gsx$critmiss']['$t'],
						abilitytext: item['gsx$abilitytext']['$t'],
						flavortext: item['gsx$flavortext']['$t'],
						bonus: item['gsx$bonus']['$t'],
						detriment: item['gsx$detriment']['$t']
					}
				}).filter(function(item) {
					return typeof item.comment === "undefined" || item.comment === '';
				});
			});
			
			cardApi.getEncounters().then(function(response) {
				vm.encounters = response.data.feed.entry.map(function(item) {
					return {
						comment: item['gsx$comment']['$t'],
						name: item['gsx$name']['$t'],
						class: item['gsx$class']['$t'],
						tier: item['gsx$tier']['$t'],
						health: item['gsx$health']['$t'],
						ongoing1: item['gsx$ongoing1']['$t'],
						ongoing2: item['gsx$ongoing2']['$t'],
						surge: item['gsx$surge']['$t'],
						flavortext: item['gsx$flavortext']['$t']
					};
				}).filter(function(item) {
					return typeof item.comment === "undefined" || item.comment === '';
				});
			});
			
			cardApi.getAdventurers().then(function(response) {
				vm.adventurers = response.data.feed.entry.map(function(item) {
					return {
						comment: item['gsx$comment']['$t'],
						name: item['gsx$name']['$t'],
						flavortext: item['gsx$flavortext']['$t'],
						melee: item['gsx$melee']['$t'],
						music: item['gsx$music']['$t'],
						ranged: item['gsx$ranged']['$t'],
						magic: item['gsx$magic']['$t'],
						startingabilities: item['gsx$startingabilities']['$t']
					};
				}).filter(function(item) {
					return typeof item.comment === "undefined" || item.comment === '';
				});
			});
			
			cardApi.getLoot().then(function(response) {
				vm.loot = response.data.feed.entry.map(function(item) {
					return {
						comment: item['gsx$comment']['$t'],
						name: item['gsx$name']['$t'],
						tier: item['gsx$tier']['$t'],
						numberuses: item['gsx$numberuses']['$t'],
						usewhen: item['gsx$usewhen']['$t'],
						tracker: item['gsx$tracker']['$t'],
						text: item['gsx$text']['$t'],
						roll: item['gsx$roll']['$t'],
						flavortext: item['gsx$flavortext']['$t']
					};
				}).filter(function(item) {
					return typeof item.comment === "undefined" || item.comment === '';
				});
			});
		}
	});