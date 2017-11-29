app.controller("HousekeepingController", function($scope, $rootScope, $http, housekeeping, appService){
	$rootScope.contextMenuOptions = [{"title": "Rooms","href":"dashboard/arrivals"},{"title": "Floors","href":"dashboard/departures"},{"title": "Housekeepers","href":"dashboard/inHouse"},{"title": "","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "HOUSEKEEPING|";
	$rootScope.subtitle = "units";

	$scope.loaded = false;

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.systemDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
        })
        .then(function(){
        	console.log($scope.systemDate);
        	housekeeping.getHKUnits($scope.systemDate)
				.then(function(unitData){
					$scope.units = unitData.data.recordsets[0];
					console.log($scope.units);
					$scope.units.forEach(function(r){
						console.log(r);
						if(r.idreservation != null) {
                            r.fromdate = moment(r.fromdate).format("DD/MM/YYYY");
                            r.todate = moment(r.todate).format("DD/MM/YYYY");
						}
						if(r.residreservation != null){
							console.log(r);
                            r.resfromdate = moment(r.resfromdate).format("DD/MM/YYYY");
                            r.restodate = moment(r.restodate).format("DD/MM/YYYY");
						}
					})
					$scope.loaded = true;
					console.log($scope.units);
				})
        })
        .catch(function(err){
            console.log(err);
        });

    // function getAllHK(){
    	// $scope.loaded = false;
     //    housekeeping.getHKUnits($scope.systemDate)
     //        .then(function(unitData){
     //            $scope.units = unitData.data.recordsets[0];
     //            $scope.units.forEach(function(r){
     //                if(r.idreservation != null) {
     //                    r.fromdate = moment(r.fromdate).format("DD/MM/YYYY");
     //                    r.todate = moment(r.todate).format("DD/MM/YYYY");
     //                }
     //            })
     //            $scope.loaded = true;
     //            console.log($scope.units);
     //        })
	// }

	$scope.setHKStatus = function(idUnit, statusId){
		$scope.loaded = false;
	}
})