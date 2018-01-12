// Full Card list: http://cards.expeditiongame.com/?
angular.module('cardApp')
	.service('cardApi', function($http, $q) {
		return {
			getAbilities: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/od6/public/values?alt=json';
				$http.get(url).then(function (response) {
					var abilities = response.data.feed.entry.map(function(item) {
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
					deferred.resolve(abilities);
					console.log('abilities', abilities);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getAdventurers: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/o98nayp/public/values?alt=json';
				$http.get(url).then(function (response) {
					var adventurers = response.data.feed.entry.map(function(item) {
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
					deferred.resolve(adventurers);
					console.log('adventurer',adventurers);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getEncounters: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/oppzxhl/public/values?alt=json';
				$http.get(url).then(function (response) {
					var encounters = response.data.feed.entry.map(function(item) {
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
					deferred.resolve(encounters);
					console.log('encounters', encounters);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getLoot: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/oozgoki/public/values?alt=json';
				$http.get(url).then(function (response) {
					var loot = response.data.feed.entry.map(function(item) {
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
					deferred.resolve(loot);
					console.log('loot',loot);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
		}
	});
	
	//o98nayp