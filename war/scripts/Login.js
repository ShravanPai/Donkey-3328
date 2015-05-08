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
    		$scope.gameInProgress = $cookieStore.get('gameInfo').gameInProgress;
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
    		$scope.gameInProgress = $cookieStore.get('gameInfo').gameInProgress;
    		return;
    	}
    		
      $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/').
    		success(function(data) {
    			if (data.indexOf('Please select a unique name') > -1) {
    				$scope.message = data;
    				return;
    			} else if (data.indexOf('you are the host') > -1) {
    				var joinMessage = data.split(".");
    				$scope.gameInfo.sessionNumber = joinMessage[1];
    				$scope.message = joinMessage[0];
    				$scope.isHost = true;
    				$scope.gameInfo.isHost = true;
    			} else if (data.indexOf('game is in progress') > -1) {
    				var joinMessage = data.split(".");
    				$scope.gameInfo.sessionNumber = joinMessage[1];
    				$scope.message = joinMessage[0];
    				$scope.gameInProgress = true;
    				$scope.gameInfo.gameInProgress = $scope.gameInProgress;
    			}
        		
        		$scope.loginSuccess = true;
        		$scope.gameInfo.loginSuccess = true;
        		$cookieStore.put('gameInfo', $scope.gameInfo);
        		console.log($cookieStore.sessionNumber);
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
    $scope.leaveGame = function() {
    	$http.get('http://donkey-3328.appspot.com/game/leave_game/' + $cookieStore.get('gameInfo').sessionNumber).
		success(function(data) {
			$cookieStore.remove('gameInfo');
			$scope.loginSuccess = false;
			$scope.gameInProgress = false;
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