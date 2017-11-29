app.controller("AllocationsController", function($scope, $rootScope, appService, $http, dashboard, $location, availability){
    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.systemDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
            $scope.rawDate = result.data.recordset[0].systemdate;
        })
		.then(function(){
            appService.getRoomTypes(1)
                .then(function(data){
                    $scope.roomTypes = data.data.recordset;
                })
				.then(function(){
                    $scope.arrivalDate = moment($scope.rawDate).toDate();
				})
		})
		.then(function(){
			$scope.getRes($rootScope.globalSystemDate.format("YYYY-MM-DD"));
		})

    $scope.showAll = false;
    $scope.allocatedFilter = null;


    $scope.testing123 = function(){
        $scope.updateReservations(moment($scope.arrivalDate).format("YYYY-MM-DD"));
    }

    $scope.showAllocated = function(){
        $scope.showAll = !$scope.showAll;
        if(!$scope.showAll){
            $scope.allocatedFilter = null;
        }
        else{
            $scope.allocatedFilter = undefined;
        }
        $scope.updateReservations(moment($scope.arrivalDate).format("YYYY-MM-DD")); 
    }


	$scope.testVals = function(){
    	$scope.updateReservations(moment($scope.arrivalDate).format("YYYY-MM-DD"));
	}

	$scope.autoAllocate = function(){
	    var reservationsToAllocate = [];
	    //$scope.selectedUnitType.idunittype;
	    for(var i = 0; i < $scope.reservations.length; i++){
            if($scope.selectedUnitType == undefined){
	            if($scope.reservations[i].idunit == null){
                    reservationsToAllocate.push($scope.reservations[i]);
                }
            }
	        else{
	            if($scope.reservations[i].idunittype == $scope.selectedUnitType.idunittype){
                    if($scope.reservations[i].idunit == null) {
                        reservationsToAllocate.push($scope.reservations[i])
                    }
                }
	        }
        }
        var result = reservationsToAllocate.map(a => a.idreservation).toString();
        console.log(result.toString());
        appService.autoAllocate(result)
            .then(function(){
                $scope.updateReservations(moment($scope.arrivalDate).format("YYYY-MM-DD"));
            })
	}




	$rootScope.pageTitle = "ALLOCATIONS";
	$rootScope.subtitle = "";
}).config(function($mdDateLocaleProvider){
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
}})
