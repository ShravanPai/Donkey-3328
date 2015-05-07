var LoginApp = angular.module('LoginApp',['ngCookies']);
  
LoginApp.controller('LoginController', function($scope, $http, $cookieStore) {
	$scope.message = '';
	$scope.userName = '';
	$scope.loginSuccess = false;
	$scope.gameInProgress = false;
	$scope.isHost = false;
	$scope.gameInfo = {};
	$scope.initParams = function() {
    	if (!angular.isUndefined($cookieStore.get('gameInfo'))) {
    		$scope.message = 'You are already in the game as ' + $cookieStore.get('gameInfo').userName;
    		$scope.isHost = $cookieStore.get('gameInfo').isHost;
    		$scope.loginSuccess = $cookieStore.get('gameInfo').loginSuccess;
    		console.log($scope.loginSuccess);
    	}		
	};
    $scope.login = function() {
    	$scope.gameInfo.userName = $scope.userName;
    	$scope.gameInfo.isHost = $scope.isHost;
    	$scope.gameInfo.gameInProgress = $scope.gameInProgress;
    	$scope.gameInfo.loginSuccess = $scope.loginSuccess;

    	if (!angular.isUndefined($cookieStore.get('gameInfo'))) {
    		$scope.message = 'You are already in the game as ' + $cookieStore.get('gameInfo').userName;
    		$scope.isHost = $cookieStore.get('gameInfo').isHost;
    		$scope.loginSuccess = $cookieStore.get('gameInfo').loginSuccess;
    		return;
    	}
    		
      $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/').
    		success(function(data) {
    			if (data.indexOf('Please select a unique name') > -1) {
    				$scope.message = data;
    				return;
    			} else if (data.indexOf('you are the host') > -1) {
    				$scope.isHost = true;
    				$scope.gameInfo.isHost = true;
    			} else if (data.indexOf('game in progress') > -1) {
    				$scope.gameInProgress = true;
    			}
        		$scope.message = data;
        		$scope.loginSuccess = true;
        		$scope.gameInfo
        		$cookieStore.put('gameInfo', $scope.gameInfo);
        		console.log('Cookie value : ' + $cookieStore.get('gameInfo').isHost);
        	}).
        	error(function(data, status, headers, config){
        		$scope.message = 'Error in getting response : ' + data;
        	});
    };
    $scope.endGame = function() {
    	$http.get('http://donkey-3328.appspot.com/game/end_game/').
		success(function(data) {
			$cookieStore.remove('gameInfo');
			$scope.message = data;
			$scope.isHost = false;
    	}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error in getting response : ' + data;
    	});
    };
    // TODO : Use post method to fetch data instead of get
    $scope.instructions = function() {
    	$http.get('http://donkey-3328.appspot.com/game/instructions/').
		success(function(data) {
			alert(data);
		}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error in getting response : ' + data;
    	});
    };
});