var LoginApp = angular.module('LoginApp',[]);
  
LoginApp.controller('LoginController', function($scope, $http) {
	$scope.message = '';
	$scope.userName = '';
	$scope.loginSuccess = false;
	$scope.isHost = false;
    $scope.login = function() {
      $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/').
    		success(function(data) {
        		$scope.message = data;
        		$scope.loginSuccess = true;
        		console.log('Index : ' + $scope.message.indexOf('you are the host'));
        		if ($scope.message.indexOf('you are the host') > -1) {
        			
        			$scope.isHost = true;
        		}
        		console.log($scope.isHost);
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