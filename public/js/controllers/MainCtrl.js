angular.module('MainCtrl', []).controller('LoginController', function($scope, $http) {

	$scope.tagline = 'WIGWAMER LOGIN!';	
	
	$scope.property = '';
	$scope.user = '';
	$scope.password = '';

	$scope.validateUser = function(){
		var apiUrl = 'http://52.19.183.139:1234/api/checkUser?username=' + $scope.user + '&organisation=' + $scope.property + '&password=' + $scope.password;
		console.log(apiUrl);
		$http({
	                method: 'POST',
        	        url: apiUrl
        	})
        	.then(function successCallback(response){
                	login(response.data.recordset.length);
        	}, function errorCallback(err){
                	console.log(err);
        	});

	};

	function login(validUser){
		if(validUser){
			console.log("You're in!");
		}
		else{
			console.log("Not today pal");
		}
	}

	console.log("adam");
});
