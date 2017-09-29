app.controller("AvailabilityController", function($scope, $rootScope, $location, $http, appService, availability){
	$rootScope.pageTitle = "AVAILABILITY|";
	$rootScope.subtitle = "available";

	$scope.loaded = false;

	$scope.negative = true;

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.departDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
        })
        .then(function(){
			availability.getAvailabilityByRange(1,1,1,-1,$rootScope.globalSystemDate.format("YYYY-MM-DD"),$rootScope.globalSystemDate.add('days', 20).format("YYYY-MM-DD"))
			.then(function(result){
				$scope.availRows = result.data[0][0].chunk(20);
                $scope.availRows[0].forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY")});
				for(var i = 0; i < $scope.availRows.length; i++){
					console.log($scope.availRows[i]);
				};
				$scope.loaded = true;
			})
			.catch(function(err){
				console.log(err);
			});
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







    // availability.getAvailabilityByRange()
	// .then(function(result){
	// 	console.log(result.data[0]);
	// })
	// .catch(function(err){
	// 	console.log(err);
	// });


	$rootScope.contextMenuOptions = [{"title": "Available","href":"reservations/availability"},{"title": "Booked","href":"dashboard/departures"},{"title": "Rates","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]

	var dates = [];
	$(document).on("mousedown",'.dayCell', function(){
		dates = [];
		dates.push(moment($(this).data("date")));
	});
	$(document).on("mouseup", '.dayCell', function(){
		dates.push(moment($(this).data("date")));
		showDates();
	});	

	function showDates(){
		var startDate;
		var endDate;
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
});