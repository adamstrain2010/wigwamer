app.controller("NewReservationController", function($scope,$rootScope, $http, dashboard, $location,appService){
	if($rootScope.newResFlag){
		console.log($rootScope.startDate);
		console.log($rootScope.endDate);
		console.log($rootScope.newResFlag);
		$scope.arrivalDate = moment($rootScope.startDate, "DD/MM/YYYY").toDate();
		$scope.departureDate = moment($rootScope.endDate, "DD/MM/YYYY").toDate();
	}
	else{
		console.log($rootScope.newResFlag);
		$scope.arrivalDate = moment('11/06/2017',"DD/MM/YYYY").toDate();
		$scope.departureDate = moment('12/06/2017',"DD/MM/YYYY").toDate();
	}
	appService.getRoomTypes(1)
	.then(function(data){
		$scope.roomTypes = data.data.recordset;
		console.log($scope.roomTypes);
	})
	.catch(function(err){
		console.log(err);
	});
	
	$("#surnameInput").focus();
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$scope.save = function(){
		$rootScope.newResFlag = false;
		console.log($scope.bookingsSource);
		console.log($scope.arrivalDate);
		var fromDate = moment($scope.arrivalDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
		var toDate = moment($scope.departureDate, 'DD/MM/YYYY').format("YYYY-MM-DD")
		console.log(fromDate);
		console.log(toDate);
		dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource)
		.then(function(result){
			$scope.message = {"title": "Reservation Made", "body": "The reservation was made successfully"};
			$(".messageModal").css("display", "block");
			$(".modalBack").css("display","block");
			$("#modalButton").focus();
		})
		.catch(function(err){
			console.log(err);
		});
	};
	
	$scope.goToArrivals = function(){
		$location.path('/dashboard/arrivals');
	}
	
	$scope.expanded = false;
	$scope.show = function(){
		console.log($scope.expanded);
	};
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "new reservation";
	$scope.clearForm = function(){
		console.log("clearing");
		$("#newResForm").find(".form-control").val("");
		//$("#newResForm").find(".form-control").valueAsDate = null;
	}
	
	console.log($rootScope.currentDate);
	
		
	// var options={
		// format: 'dd/mm/yyyy',
		// startDate: new Date(2017,05,11),
		// todayHighlight: true,
		// calendarWeeks: false,
		// autoclose: true,
		// todayBtn: false,
		// todayHighlight: true,
		// weekStart: 1,
		// toValue: function (date, format, language) {
            // date.format= 'yyyy-mm-dd'
        // },
		// "setDate": $scope.currentDate
	// };
	// date_input.datepicker("setDate", $scope.currentDate);
	// date_input.datepicker("container", $('#whatever'));
	
	
});