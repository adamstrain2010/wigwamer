var element;

app.controller("NewReservationController", function($scope,$rootScope, $http, dashboard, $location,appService, availability){
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
                $scope.checkAvailByRange();
			}
			else{
				console.log($rootScope.newResFlag);
				console.log($scope.systemDate);
				$scope.arrivalDate = $scope.systemDate.toDate();
				$scope.departureDate = $scope.systemDate.add(1, 'days').toDate();
                $scope.checkAvailByRange();
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


	//FUNCTION TO RETURN ONLY ROOMTYPES THAT AREA AVAILABLE FOR WHOLE DATE RANGE - NOT SOME OF THE DATE RANGE
	$scope.checkAvailByRange = function(){
		var fromDate = moment($scope.arrivalDate).format("YYYY-MM-DD");
        var toDate = moment($scope.departureDate).format("YYYY-MM-DD");
        var numDays = moment(toDate).diff(moment(fromDate), 'days');
        availability.getAvailabilityByRange(1, 1, 1, -1, fromDate, toDate)
			.then(function(result){
                $scope.availRows = result.data[0][0];
                $scope.availRows.forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY")});
                $scope.availRows.forEach(function(r){ r.rate = "£" + r.rate.toFixed(2)});
                $scope.availRows = $scope.availRows.chunk(numDays);
                $scope.availRows.forEach(function(r){ r.forEach(function(innerR){
                	if(innerR.unitsavailable < 1){
						var index = $scope.availRows.indexOf(r);
							if(index > 1){
								$scope.availRows.splice(index, 1);
							}
                		}}
                	)
                });
			})
			.then(function(){
				$scope.tester = $scope.availRows;
				$scope.roomTypes = [];
				$scope.tester.forEach(function(r){
					console.log(r);
					var thisRT = {"unittypedesc": r[0].unittypedesc, "idunitype": r[0].idunittype};
					$scope.roomTypes.push(thisRT);
				})
				console.log($scope.roomTypes);
                return $scope.availRows;
			})
			.catch(function(err){
				console.log(err);
			})
	};

	// $scope.updateSelections = async function(){
	// 	let out;
	// 	out = await $scope.checkAvailByRange();
	// 	console.log(out);
	// };

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

	$scope.roomsToSave = [];

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
			element = $scope.selectedUnitType.idunitype;
            console.log("1st");
			dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource, 900, element, $scope.roomsToSave[0],1)
			.then(function(result){
                $scope.goToArrivals();
				// $scope.message = {"title": "Reservation Made", "body": "The reservation was made successfully"};
				// $(".messageModal").css("display", "block");
				// $(".modalBack").css("display","block");
				// $("#modalButton").focus();
			})
			.catch(function(err){
				console.log(err);
			});
		}
		if($scope.roomsToSave[0] == null){
            dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource, $scope.nationality.idcountry,$scope.selectedUnitType.idunittype, null,1)
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
			console.log("2nd");
			dashboard.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource, $scope.nationality.idcountry,$scope.selectedUnitType.idunittype, $scope.roomsToSave[0],1)
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
        $rootScope.messageToShow = true;
		$rootScope.message = "New reservation made.";
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