var LoginApp = angular.module('LoginApp',[]);
  
LoginApp.controller('LoginController', function($scope, $http) {
	$scope.message = '';
	$scope.userName = '';
	$scope.password = '';
    $scope.login = function() {
       $http.get('http://donkey-3328.appspot.com/game/hello/'+$scope.userName+'/'+$scope.password).
        	success(function(data) {
        		$scope.message = data;
        	}).
        	error(function(data, status, headers, config){
        		$scope.message = 'Error in getting response : ' + data;
        	});
    }
});