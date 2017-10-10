//DEPARTURES CONTROLLER
app.controller('DashboardDeparturesController',function($scope,$http,$rootScope, helpers, reservation, dashboard,appService){
	
	appService.getSystemDate()
	.then(function(result){
		$rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
		$rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
		$scope.departDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
	})
	.then(function(){
		getReservationsDeparting($scope.departDate);
	})
	.catch(function(err){
		console.log(err);
	});

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

	$scope.selectedItem = [];

	$scope.loaded = false;
	$scope.numReservations = null;
	$scope.checkOut = function(resNum){
		console.log("whoop");
		console.log(resNum);
		dashboard.checkOut(resNum)
		.then(function(response){
			console.log("checked out!");
			console.log(response);
		})
		.then(function(){
			getReservationsDeparting($scope.departDate)
		})	
		.catch(function(err){
			console.log(err);
		});
	};   
	
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "departures";
	
	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$scope.printInfo = dashboard.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.departDate = "2017-06-11";
	$scope.selecredReservation;
	
	function getReservationsDeparting(departDate){
		dashboard.getReservationsDeparting(departDate)
		.then(function(response){
			$scope.reservations = response.data.recordset;
			$scope.numReservations = $scope.reservations.length;
			$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
			$scope.loaded = true;
			console.log($scope.numReservations);
		});
	}
	

	$scope.setCurrentReservation = function(reservationNum){
		dashboard.showData(reservationNum.reservation.idreservation)
		.then(function(res){
			console.log(res.recordset[0]);
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.fromdate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.todate).format("YYYY-MM-DD");
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