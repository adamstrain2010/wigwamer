app.controller("HousekeepingController", function($scope, $rootScope, $http, housekeeping){
	$rootScope.contextMenuOptions = [{"title": "Rooms","href":"dashboard/arrivals"},{"title": "Floors","href":"dashboard/departures"},{"title": "Housekeepers","href":"dashboard/inHouse"},{"title": "","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "HOUSEKEEPING|";
	$rootScope.subtitle = "rooms";
	
	$scope.setHKStatus = function(idUnit){
		housekeeping.setStatus(idUnit)
		.then(function(result){
			console.log(result);
		})
		.catch(function(err){
			console.log(err);
		});
		alert("cleaning this room");
	}
})