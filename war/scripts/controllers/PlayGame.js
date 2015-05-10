var GameApp = angular.module('GameApp',['ngCookies', 'LoginApp']);

GameApp.controller('GameController', ['LoginApp', function($scope, $http, $cookieStore) {
	
	var cookieDetails = $cookieStore.get('gameInfo');
	$scope.test = function() {
		console.log('SessionNumber : ' + cookieDetails.sessionNumber);
	};
	
}]);
