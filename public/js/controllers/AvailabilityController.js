app.controller("AvailabilityController", function($scope, $rootScope, $location, $http, appService, availability, dashboard){
	$rootScope.pageTitle = "AVAILABILITY|";
	$rootScope.subtitle = "available";

	$scope.availContext = {"type":"a"};

	$scope.doThis = function(){
		console.log("do this");
	};

	$scope.loaded = false;

	$scope.negative = true;

	$scope.inHouseResList = [];

    $scope.menuOptions = [
        ['Show Reservations', function ($itemScope, $event, modelValue, text, $li) {
        $scope.resListDate = moment($itemScope.availRow.configdate, "DD/MM/YYYY").format("YYYY-MM-DD");
        $scope.resListDateFormatted = moment($itemScope.availRow.configdate, "DD/MM/YYYY").format("DD/MM/YYYY");
        console.log(moment($itemScope.availRow.configdate, "DD/MM/YYYY").format("ddd"));
        $scope.unitType = $itemScope.availRow.unittypedesc;
        console.log($itemScope.availRow);
		dashboard.getInHouse($scope.resListDate, $itemScope.availRow.idunittype)
			.then(function(data){
				$scope.inHouseResList = data;
				$scope.inHouseReservations = [];
                $scope.inHouseReservations = $scope.inHouseResList.data[0][0];
                $scope.inHouseReservations.forEach(function(r){r.fromdate = moment(r.fromdate).format("DD/MM/YYYY");r.todate = moment(r.todate).format("DD/MM/YYYY")});
                console.log($scope.inHouseReservations);
                console.log($scope.inHouseResList);
			})
			.catch(function(err){
				console.log(err)
			});
        $(".modalBack").css("display", "block");
        }]
    ];

    console.log($scope);

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.departDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
        })
        .then(function(){
			$scope.fromDate = $rootScope.globalSystemDate.format("YYYY-MM-DD");
			$scope.toDate = $rootScope.globalSystemDate.add('days', 10).format("YYYY-MM-DD");
			$scope.showAvailability($scope.fromDate, $scope.toDate);
			$scope.pickerFromDate = moment($scope.fromDate).toDate();
			$scope.pickerToDate = moment($scope.toDate).toDate();
            // availability.getAvailabilityByRange(1,1,1,-1,$scope.fromDate,$scope.toDate)
			// .then(function(result){
             //    $scope.availRows = result.data[0][0];
             //    $scope.availRows.forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY")});
             //    $scope.availRows = $scope.availRows.chunk(20);
             //    console.log($scope.availRows);
             //    $scope.loaded = true;
			// })
			// .catch(function(err){
			// 	console.log(err);
			// });
        })
		.then(function(){
			//getRooms();
		})
        .catch(function(err){
            console.log(err);
        });

    function getRooms(){
        appService.getRoomTypes(1)
		.then(function(data){
			$scope.roomTypes = data.data.recordset;
		})
		.catch(function(err){
			console.log(err);
		});
	}

	$scope.showAvailability = function(fromDate, toDate){
		var numDays = moment(toDate).diff(moment(fromDate), 'days');
		availability.getAvailabilityByRange(1,1,1,-1,fromDate,toDate)
			.then(function(result){
				$scope.loaded = false;
				$scope.availRows = result.data[0][0];
				$scope.availRows.forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY")});
				$scope.availRows.forEach(function(r){ r.rate = "£" + r.rate.toFixed(2)});
				$scope.availRows = $scope.availRows.chunk(numDays);
				$scope.loaded = true;
			})
			.catch(function(err){
				console.log(err);
			});
	}



    // availability.getAvailabilityByRange()
	// .then(function(result){
	// 	console.log(result.data[0]);
	// })
	// .catch(function(err){
	// 	console.log(err);
	// });


	$rootScope.contextMenuOptions = [{}]



    var dates = [];
    var leftClick;
    $(document).on("mousedown",'.dayCell', function(){
        dates = [];
        console.log(dates);
    	leftClick = false;
    	switch(event.which){
			case 1:
				leftClick = true;
                dates = [];
                dates.push(moment($(this).data("date"),"DD/MM/YYYY"));
				break;
            case 3:
                break;
		}

	});
    $(document).on("mouseup", '.dayCell', function(){
		if(leftClick == true){
            dates.push(moment($(this).data("date"),"DD/MM/YYYY"));
            showDates();
		}
		else{
			return;
		}
	});

	function showDates(){
		var startDate = null;
		var endDate = null;
        $rootScope.startDate = null;
        $rootScope.endDate = null;
        $rootScope.newResFlag = false;
		dates[1].isSameOrAfter(dates[0]) ? (startDate = dates[0], endDate = dates[1]) : (startDate = dates[1], endDate = dates[0]);
		$rootScope.startDate = startDate;
		$rootScope.endDate = endDate;
		$rootScope.newResFlag = true;
		//confirm("Do you want to make a new reservation " + startDate.format("DD/MM/YYYY") + " - " + endDate.format("DD/MM/YYYY") + "?") ? $location.path('/dashboard/newReservation') : console.log("no");
		if(confirm("Do you want to make a new reservation " + startDate.format("DD/MM/YYYY") + " - " + endDate.format("DD/MM/YYYY") + "?")){
			$location.path('/dashboard/newReservation');
			$scope.$apply();
			console.log("yes");
		}
		else{
			console.log("no");
		}
	}

	$scope.changeFromDate = function(){
		moment($scope.pickerFromDate) > moment($scope.pickerToDate) ? $scope.pickerToDate = moment($scope.pickerFromDate).add('days', 1).toDate() : "";
	}

    $scope.changeToDate = function(){
        moment($scope.pickerToDate) < moment($scope.pickerFromDate) ? $scope.pickerFromDate = moment($scope.pickerToDate).add('days', -1).toDate() : "";
    }
}).config(function($mdDateLocaleProvider){
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }
});