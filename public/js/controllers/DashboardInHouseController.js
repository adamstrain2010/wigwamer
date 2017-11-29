//IN HOUSE CONTROLLER
app.controller('DashboardInHouseController',function($scope,$http,$rootScope, helpers, reservation, dashboard){
	
	$scope.loaded = false;
	
	
	
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
		console.log(response.data[0][0]);
		$scope.loaded = false;
		$scope.reservations = response.data[0][0];
		$scope.numReservations = $scope.reservations.length;
		$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YYYY"); r.todate = moment(r.todate).format("DD/MM/YYYY"); r.toPay = r.toPay.toFixed(2)});
		$scope.loaded = true;
	});

	function getInHouseReservations(){
        dashboard.reservationsInHouse().then(function(response){
            console.log(response.data[0][0]);
            $scope.loaded = false;
            $scope.reservations = response.data[0][0];
            $scope.numReservations = $scope.reservations.length;
            $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YYYY"); r.todate = moment(r.todate).format("DD/MM/YYYY"); r.toPay = r.toPay.toFixed(2)});
            $scope.loaded = true;
        });
	}

    $scope.selectedReservation;

    $scope.thisReservation = {
        "reservationNumber":null,
        "surname":null,
        "forename": null,
        "arriving": null,
        "departing": null,
        "unitTypeId": null,
        "unitId": null,
        "unitDescription": null,
        "rateCodeId": null
    };

	$scope.setCurrentReservation = function(reservationNum){
		reservationNum = reservationNum.reservation.idreservation;
		dashboard.showData(reservationNum)
		.then(function(res){
			console.log(res);
            $scope.selectedReservation = res.recordset[0];
            $scope.thisReservation.reservationNumber = $scope.selectedReservation.idreservation;
            $scope.thisReservation.surname = $scope.selectedReservation.surname;
            $scope.thisReservation.forename = $scope.selectedReservation.forename;
            $scope.thisReservation.arriving = moment($scope.selectedReservation.fromdate).toDate();
            $scope.thisReservation.departing = moment($scope.selectedReservation.todate).toDate();
            $scope.thisReservation.unitTypeId = $scope.selectedReservation.idunittype;
            $scope.thisReservation.unitId = $scope.selectedReservation.idunit;
            $scope.thisReservation.unitDescription = $scope.selectedReservation.unitdescription;
            $scope.thisReservation.rateCodeId = $scope.selectedReservation.idratecode;

            console.log($scope.thisReservation);

            $scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.fromdate).toDate();
            $scope.selectedReservation.departureDate = moment($scope.selectedReservation.todate).toDate();
            if($scope.selectedReservation.idunit == null){
                $scope.allocated = false;
            }
            else{
                $scope.allocated = true;
            }
            console.log($scope.allocated);
            $(".modalFullHeight").css("display", "block");
            $('.modalBack').css("display", "block");
            console.log($scope.selectedReservation);
		})
		.then(function(){
			$scope.getBalanceToPay(reservationNum);
		})
		.catch(function(err){
			console.log(err);
		})
	};

    $('.closeBtn').click(function(){
        getInHouseReservations($rootScope.globalSystemDate);
        console.log("closing");
        $(".modalBack").css("display", "none");
        $scope.setModal('reservation');
    })

    $rootScope.getBalanceToPay = function(idReservation){
        dashboard.getBalanceToPay(idReservation)
            .then(function(result){
                $rootScope.balToPay = (result.data[0][0][0].balanceToPay).toFixed(2);
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