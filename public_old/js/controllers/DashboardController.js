angular.module('MainCtrl', []).controller('DashboardController', function($scope, $http) {
        console.log("yes");
	$http({
                method: 'GET',
                url: 'http://52.19.183.139:1234/api/user'
        })
        .then(function successCallback(response){
                console.log(response);
        }, function errorCallback(err){
                console.log(err);
        });
        console.log("adam");
});

