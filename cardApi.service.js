// Full Card list: http://cards.expeditiongame.com/?
angular.module('cardApp')
	.service('cardApi', function($http, $q) {
		return {
			getAbilities: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/od6/public/values?alt=json';
				$http.get(url).then(function (response) {
					deferred.resolve(response);
					console.log('ability', response);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getAdventurers: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/o98nayp/public/values?alt=json';
				$http.get(url).then(function (response) {
					deferred.resolve(response);
					console.log('adventurer',response);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getEncounters: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/oppzxhl/public/values?alt=json';
				$http.get(url).then(function (response) {
					deferred.resolve(response);
					console.log('encounter',response);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
			getLoot: function () {
				var deferred = $q.defer();
				
				var url = 'https://spreadsheets.google.com/feeds/list/1WvRrQUBRSZS6teOcbnCjAqDr-ubUNIxgiVwWGDcsZYM/oozgoki/public/values?alt=json';
				$http.get(url).then(function (response) {
					deferred.resolve(response);
					console.log('loot',response);
				}, function (reason) {
					deferred.reject(reason);
				});
				
				return deferred.promise;
			},
		}
	});
	
	//o98nayp