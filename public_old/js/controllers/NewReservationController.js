app.controller("NewReservationController", function($scope,$rootScope, $http, dashboard, $location,appService){
	appService.getSystemDate()
	.then(function(result){
		$rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
		$scope.systemDate = moment(result.data.recordset[0].systemdate);
	})
	.then(function(){
		appService.getRoomTypes(1)
		.then(function(data){
			$scope.roomTypes = data.data.recordset;
			console.log($scope.roomTypes);
		})
		.then(function(data){
			if($rootScope.newResFlag){
				console.log($rootScope.startDate);
				console.log($rootScope.endDate);
				console.log($rootScope.newResFlag);
				$scope.arrivalDate = moment($rootScope.startDate, "DD/MM/YYYY").toDate();
				$scope.departureDate = moment($rootScope.endDate, "DD/MM/YYYY").toDate();
			}
			else{
				console.log($rootScope.newResFlag);
				console.log($scope.systemDate);
				$scope.arrivalDate = $scope.systemDate.toDate();
				$scope.departureDate = $scope.systemDate.add(1, 'days').toDate();
			}
		})
		.then(function(){
			appService.getAllNationalities()
			.then(function(nationalityResult){
				$scope.nationalities = nationalityResult.data.recordset;
			})
			.catch(function(err){
				console.log(err);
			});
		})
		.catch(function(err){
			console.log(err);
		})
	})
	.catch(function(err){
		console.log(err);
	});	
	
	
	function fillNationalities(){
		appService.getAllNationalities()
		.then(function(result){
			return result;
		})
		.catch(function(err){
			console.log(err);
		});
	};
	
	
	$("#surnameInput").focus();
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	
	$scope.save = function(){
		console.log($scope.selectedUnitType.idunittype);
		$rootScope.newResFlag = false;
		console.log($scope.bookingsSource);
		console.log($scope.arrivalDate);
		var fromDate = moment($scope.arrivalDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
		var toDate = moment($scope.departureDate, 'DD/MM/YYYY').format("YYYY-MM-DD")
		console.log(fromDate);
		console.log(toDate);
		if($scope.nationality == null){
			dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource, 900, $scope.selectedUnitType.idunittype, 1)
			.then(function(result){
				$scope.message = {"title": "Reservation Made", "body": "The reservation was made successfully"};
				$(".messageModal").css("display", "block");
				$(".modalBack").css("display","block");
				$("#modalButton").focus();
			})
			.catch(function(err){
				console.log(err);
			});
		}
		else{
			dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource, $scope.nationality.idcountry,$scope.selectedUnitType.idunittype)
			.then(function(result){
				$scope.message = {"title": "Reservation Made", "body": "The reservation was made successfully"};
				$(".messageModal").css("display", "block");
				$(".modalBack").css("display","block");
				$("#modalButton").focus();
			})
			.catch(function(err){
				console.log(err);
			});

		}
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
	
		// $scope.echo = function(){
			// console.log($scope.roomType);
	$scope.selectUnitType = function(thing){
		$scope.rooms = [];
		dashboard.getRoomsFromRoomType(thing)
		.then(function(result){
			$scope.rooms = result.data.recordset;
			console.log($scope.rooms);
		})
		.catch(function(err){
			console.log(err);
		});
	};		
	
}).config(function($mdDateLocaleProvider){
	 $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('DD/MM/YYYY') : ''
    }
});