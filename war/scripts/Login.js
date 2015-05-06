var LoginApp = angular.module('LoginApp',[]);
  
LoginApp.controller('LoginController', function($scope, $http) {
	$scope.message = '';
	$scope.userName = '';
	$scope.loginSuccess = false;
	$scope.gameInProgress = false;
	$scope.isHost = false;
    $scope.login = function() {
      $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/').
    		success(function(data) {
    			if (data.indexOf('Please select a unique name') > -1) {
    				$scope.message = data;
    				return;
    			} else if (data.indexOf('you are the host') > -1) {
    				$scope.isHost = true;
    			} else if (data.indexOf('game in progress') > -1)
    				$scope.gameInProgress = true;
        		$scope.message = data;
        		$scope.loginSuccess = true;
        	}).
        	error(function(data, status, headers, config){
        		$scope.message = 'Error in getting response : ' + data;
        	});
    };
    $scope.endGame = function() {
    	$http.get('http://donkey-3328.appspot.com/game/end_game/').
		success(function(data) {
			$scope.message = data;
			$scope.isHost = false;
    	}).
    	error(function(data, status, headers, config){
    		$scope.message = 'Error in getting response : ' + data;
    	});
    };
});