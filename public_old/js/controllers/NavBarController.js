//NAVBAR CONTROLLER
app.controller('NavBarController',function($scope,$rootScope,appService){
	//$scope.systemDate = $rootScope.globalSystemDate;
    $scope.searchOpen = function(){
        console.log("hooray");
        $rootScope.searchModal = true;
        console.log($rootScope.searchModal);
    }
});