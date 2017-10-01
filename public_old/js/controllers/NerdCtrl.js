angular.module('NerdCtrl', []).controller('NerdController', function($scope, $rootScope, $cookieStore, $location, search) {
    $scope.$on('$routeChangeStart', function(next, current){
		$location.path() != '/' ? !$cookieStore.get("user") ? location.href = '/' : '' : '';

    });
    $scope.quickSearch = function(typing){
        if(typing.length > 0){
            $scope.searchedResers = [];
            search.quickSearch(typing)
            .then(function(data){
                $scope.searchedResers = data.data.recordset;
                console.log($scope.searchedResers);
            })
            .catch(function(err){
                console.log(err);
            });
        }
        else{
            console.log("ZEROS ALL THE WAY");
        }
    };


    
    $scope.searchClose = function(){
        $rootScope.searchModal = false;
    }

	$rootScope.searchModal = false;
});
