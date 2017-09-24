//IN HOUSE CONTROLLER
app.controller('DashboardInHouseController',function($scope,$http,$rootScope, helpers, reservation, dashboard){
	console.log("yep");
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "in house";
	
	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$scope.printInfo = dashboard.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.departDate = "2017-11-02";
	$scope.selecredReservation;
	dashboard.reservationsInHouse().then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
	});

	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.reservationId);
		dashboard.showData(reservationNum.reservation.reservationId)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.arrivalDate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.departureDate).format("YYYY-MM-DD");
			console.log($scope.selectedReservation);
			console.log(helpers.urlEncodeObject($scope.selectedReservation));
		})
		.catch(function(err){
			console.log(err);
		})
	};

	$scope.saveReservation = function(){
		console.log(helpers.urlEncodeObject($scope.selectedReservation));
		reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
		.then(function(){
			alert("Saved Successfully!");	
		})
		.catch(function(err){
			console.log(err);
		})		
	}
});