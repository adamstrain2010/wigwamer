app.controller("RollDayController", function($scope,$rootScope, appService, appService, $mdToast){
    $rootScope.pageTitle = "ROLL DAY";
    $rootScope.subtitle = "";

    $scope.showSnack = function(){
        appService.showSnackBar($rootScope.message);
    };

    $scope.checkInMessage = function(message) {
        $rootScope.message = message;
        $scope.showSnack();
    }



    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
        })
        .catch(function(err){
            console.log(err);
        });
})