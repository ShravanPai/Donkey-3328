var LoginApp = angular.module('LoginApp',['ngCookies']);
  
LoginApp.controller('LoginController', function($scope, $http, $cookieStore, $interval) {
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
	$scope.selectedCardNumber = '';
	$scope.cardNumbers = [];
	var timer;
	var gameStatePollingTimer;
	var counter = 0;
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
    		
      $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/').
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
    				// Start the timer to poll for the players
    			   	timer = $interval(function() {
    			   		pollPlayers();
    			    	}, 1000)
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
        		gameStatePollingTimer = $interval(function() {
        			startPollingForGameInfo();
        		}, 2000)
    		}).
        	error(function(data, status, headers, config){
        		$scope.message = 'Error in getting response : ' + data;
        	});
    };
    $scope.endGame = function() {
    	if (angular.isDefined(gameStatePollingTimer)) {
    		$interval.cancel(gameStatePollingTimer);
    		gameStatePollingTimer = undefined;
    	}
    	$http.get('http://donkey-3328.appspot.com/game/end_game/').
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
    	
    	// Remove this timer once we get the logic right
    	if (angular.isDefined(timer)) {
    		$interval.cancel(timer);
    		timer = undefined;
    	}
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
    	
    	// TODO : Remove this from here 
		$cookieStore.remove('gameInfo');
		$scope.loginSuccess = false;
		$scope.gameInProgress = false;
		$scope.message = data;
		$scope.isHost = false;
    	
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

    $scope.fileBug = function() {
    	if (angular.isUndefined($scope.bugReporterName) || angular.isUndefined($scope.bugDescription)) {
    		$scope.message = 'Please enter all the fields and click on Report button';
    		return;
    	}
    	
    	$http.get('http://donkey-3328.appspot.com/game/report_bug/' + $scope.bugReporterName + '~' + $scope.bugDescription + '/').
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
    };
    
    $scope.startGame = function() {
    	if (angular.isDefined(timer)) {
    		$interval.cancel(timer);
    		timer = undefined;
    	}
      	$http.get('http://donkey-3328.appspot.com/game/start_game/').
		success(function(data) {
			$scope.message(data);
		}).
    	error(function(data, status, headers, config){
    		return 'Error Starting Game';
    	});    	
    };
    
    $scope.getImagePath = function(number) {
    	var path = 'images/cards/';
    	path += number;
    	path+='.png';
    	return path;
    };
    
    $scope.cardSelected = function(number) {
    	$scope.message = 'Card ' + $scope.getImagePath(number) + ' selected';
    };
    
    var pollPlayers = function() {
      	$http.get('http://donkey-3328.appspot.com/game/poll_players/').
		success(function(data) {
			$scope.playerList = data;
		}).
    	error(function(data, status, headers, config){
    		return 'Error Polling Players';
    	});
    };
    
    var startPollingForGameInfo = function() {
      	$http.get('http://donkey-3328.appspot.com/game/get_game_state/' + $scope.userName).
		success(function(data) {			
			// TODO : Change this to form necessary variables
			if (data.indexOf('Cards') > -1) {
				var dataArray = data.split(':');
				var myCards = dataArray[1].trim();
				$scope.cardNumbers = myCards.split(',');
				$scope.cardNumbers.pop();
			}
			
		}).
    	error(function(data, status, headers, config){
    		return 'Error Polling Game State';
    	});
    };
});