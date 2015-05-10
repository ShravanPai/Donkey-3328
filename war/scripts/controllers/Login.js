var LoginApp = angular.module('LoginApp',['ngCookies']);
  
LoginApp.controller('LoginController', function($scope, $http, $cookieStore) {
	$scope.message = '';
	$scope.userName = '';
	$scope.loginSuccess = false;
	$scope.gameInProgress = false;
	$scope.isHost = false;
	$scope.gameInfo = {};
	$scope.playerList = '';
	$scope.reportBug = false;
	$scope.bugDescription = '';
	$scope.bugReporterName = '';
	$scope.initParams = function() {
    	if (!angular.isUndefined($cookieStore.get('gameInfo'))) {
    		$scope.message = 'You are already in the game as ' + $cookieStore.get('gameInfo').userName;
    		$scope.isHost = $cookieStore.get('gameInfo').isHost;
    		$scope.loginSuccess = $cookieStore.get('gameInfo').loginSuccess;
    		$scope.gameInProgress = $cookieStore.get('gameInfo').gameInProgress;
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
    		
      $http.get('http://localhost:8080/game/hello/'+$scope.userName+'/').
    		success(function(data) {
    			if (data.indexOf('Please select a unique name') > -1) {
    				$scope.message = data;
    				return;
    			} else if (data.indexOf('you are the host') > -1) {
    				// User message and session number will be separated by a period
    				var joinMessage = data.split(".");
    				$scope.gameInfo.sessionNumber = joinMessage[1];
    				$scope.message = joinMessage[0];
    				$scope.isHost = true;
    				$scope.gameInfo.isHost = true;
    				$scope.gameInfo.gameHost = 'You';
    			} else if (data.indexOf('game is in progress') > -1) {
    				// User message and session number will be separated by a period
    				var joinMessage = data.split(".");
    				$scope.gameInfo.sessionNumber = joinMessage[1];
    				var playerArray = joinMessage[0].split('\n');
    				$scope.message = playerArray[0];
    				$scope.playerList = playerArray[1] + '\n' + playerArray[2] + '\n' + playerArray[3];
    				// Score the name of the host in cookie
    				var hostStringArray = playerArray[1].split(":");
    				$scope.gameInfo.gameHost = hostStringArray[1].trim();
    				$scope.gameInProgress = true;
    				$scope.gameInfo.gameInProgress = $scope.gameInProgress;
    			}
        		
        		$scope.loginSuccess = true;
        		$scope.gameInfo.loginSuccess = true;
        		$cookieStore.put('gameInfo', $scope.gameInfo);
        	}).
        	error(function(data, status, headers, config){
        		$scope.message = 'Error in getting response : ' + data;
        	});
    };
    $scope.endGame = function() {
    	$http.get('http://localhost:8080/game/end_game/').
		success(function(data) {
			$cookieStore.remove('gameInfo');
			$scope.message = data;
			$scope.isHost = false;
			$scope.loginSuccess = false;
			$scope.gameInProgress = false;
    	}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error in getting response : ' + data;
    	});
    };
    $scope.leaveGame = function() {
    	$http.get('http://localhost:8080/game/leave_game/' + $cookieStore.get('gameInfo').sessionNumber).
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
    	$http.get('http://localhost:8080/game/instructions/').
		success(function(data) {
			alert(data);
		}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error in getting response : ' + data;
    	});
    };

    $scope.fileBug = function() {
    	if (angular.isUndefined($scope.bugReporterName) || angular.isUndefined($scope.bugDescription)) {
    		$scope.message = 'Please enter all the fields and click on Report button';
    		return;
    	}
    	
    	$http.get('http://localhost:8080/game/report_bug/' + $scope.bugReporterName + '~' + $scope.bugDescription + '/').
		success(function(data) {
			$scope.message = data;
	    	$scope.reportBug = false;
	    	$scope.bugDescription = '';
	    	$scope.bugReporterName = '';
		}).
    	error(function(data, status, headers, config){
    		//$scope.message = 'Error in getting response : ' + data;
    		$scope.message = "Please make sure you have entered all the fields before clicking Report button!";
    	});
    };
    
    $scope.activateReportBugForm = function() {
    	$scope.reportBug = true;
    }
});