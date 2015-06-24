angular.module('LoginApp').controller('LoginController', ['$scope', '$http', '$cookies', '$cookieStore', '$interval', function($scope, $http, $cookies, $cookieStore, $interval) {
	$scope.message = '';
	$scope.userName = '';
	$scope.loginSuccess = false;
	$scope.gameInProgress = false;
	$scope.isHost = false;
	$scope.gameInfo = {};
	$scope.playerList = [];
	$scope.reportBug = false;
	$scope.bugDescription = '';
	$scope.bugReporterName = '';
	$scope.selectedCard = '';
	$scope.cardNumbers = [];
	$scope.cardsOnPlatform = [];
	$scope.nextPlayer = '';
	var timer;
	var gameStatePollingTimer;
	var counter = 0;
	var baseURL = 'http://donkey-3328.appspot.com/';
	
	// TODO : Just for development on local. Remove this once development is done 
	//var baseURL = 'http://localhost:8080';
	
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
    		
      $http.get(baseURL + '/game/hello/'+$scope.userName+'/').
    		success(function(data) {
    			angular.fromJson(data);
    			
    			if (data.status == 'failure') {
    				$scope.message = data.message;
    				return;
    			}
    			
    			if (data.message.indexOf('you are the host') > -1) {
    				// User message and session number will be separated by a period
    				var joinMessage = data.message.split(".");
    				$scope.gameInfo.sessionNumber = joinMessage[1];
    				$scope.message = joinMessage[0];
    				$scope.isHost = true;
    				$scope.gameInfo.isHost = true;
    				$scope.gameInfo.gameHost = 'You';
    				// Start the timer to poll for the players

    			} else if (data.message.indexOf('game is in progress') > -1) {
    				// User message and session number will be separated by a period
    				var joinMessage = data.message.split(".");
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
        		
			   	timer = $interval(function() {
			   		pollPlayers();
			    	}, 1000)
			    	
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
    	$http.get(baseURL + '/game/end_game/').
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
    	$http.get(baseURL + '/game/leave_game/' + $cookieStore.get('gameInfo').sessionNumber).
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
		$scope.isHost = false;
    	
    };    
    // TODO : Use post method to fetch data instead of get
    $scope.instructions = function() {
    	$http.get(baseURL + '/game/instructions/').
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
    	
    	$http.get(baseURL + '/game/report_bug/' + $scope.bugReporterName + '~' + $scope.bugDescription + '/').
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
      	$http.get(baseURL + '/game/start_game/').
		success(function(data) {
			$scope.message = data;
		}).
    	error(function(data, status, headers, config){
    		$scope.data = 'Error Starting Game';
    	});    	
    };
    
    $scope.getImagePath = function(number) {
    	$scope.selectedCardNumber = number;
    	var path = 'images/cards/';
    	path += number;
    	path+='.png';
    	return path;
    };
    
    $scope.cardSelected = function(number) {
    	$scope.selectedCard = number;
    	$scope.message = 'Card ' + $scope.getImagePath(number) + ' selected';
    };
    
    $scope.playCard = function() {
    	// Stop the timer once the game has started
    	if (angular.isDefined(timer)) {
    		$interval.cancel(timer);
    		timer = undefined;
    	}
    	
      	$http.get(baseURL + '/game/play/' + $scope.userName + '/' + $scope.selectedCard + '/' + $scope.gameInfo.sessionNumber + '/').
		success(function(data) {
			$scope.message = data;
			$scope.selectedCard = '';
		}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error Polling Players';
    	});
    };
    
    $scope.passCards = function() {
     	$http.get(baseURL + '/game/pass_cards/').
		success(function(data) {
			$scope.message = data;
		}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error Passing Cards';
    	});
    };
    
    $scope.passCardsOnPlatformToUser = function(player) {
    	$http.get(baseURL + '/game/pass_cards_to_player/' + player + '/').
		success(function(data) {
			$scope.message = data;
		}).
    	error(function(data, status, headers, config){
    		return 'Error Passing cards to ' + player;
    	});
    };
    
    $scope.getDisplayCard = function() {
    	if ($scope.selectedCard == '')
    		return 'images/CardBack.png';
    	return $scope.getImagePath($scope.selectedCard);
    };
    
    var pollPlayers = function() {
      	$http.get(baseURL + '/game/poll_players/').
		success(function(data) {
			$scope.playerList = data.split("\n");
			$scope.playerList.pop();
		}).
    	error(function(data, status, headers, config){
    		return 'Error Polling Players';
    	});
    };
    
    var startPollingForGameInfo = function() {
      	$http.get(baseURL + '/game/get_game_state/' + $scope.userName).
		success(function(data) {			
			// TODO : Change this to form necessary variables
			if (data.indexOf(':') > -1) {				
				var dataArray = data.split(':');
				var myCards = dataArray[1].trim();
				var platFormCards = dataArray[0].trim();
				$scope.cardNumbers = myCards.split(',');
				$scope.cardNumbers.pop();
				$scope.cardNumbers = getCardNumbersAsNumbers($scope.cardNumbers);
				$scope.cardsOnPlatform = platFormCards.split(',');
				$scope.cardsOnPlatform.pop();
				$scope.cardsOnPlatform = getCardNumbersAsNumbers($scope.cardsOnPlatform);
				var nextPlayer = dataArray[2].trim();
				$scope.nextPlayer = 'Next Player --> ' + nextPlayer;
			}
			
		}).
    	error(function(data, status, headers, config){
    		return 'Error Polling Game State';
    	});
    };
    
    var getCardNumbersAsNumbers = function(cardNumbers) {
    	for (var i in cardNumbers)
    		cardNumbers[i] = parseInt(cardNumbers[i]);
    	return cardNumbers;
    };
}]);