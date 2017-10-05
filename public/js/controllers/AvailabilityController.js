app.controller("AvailabilityController", function($scope, $rootScope, $location, $http, appService, availability){
	$rootScope.pageTitle = "AVAILABILITY|";
	$rootScope.subtitle = "available";

	$rootScope.availContext = {"type":"a"};


	$scope.loaded = false;

	$scope.negative = true;

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.departDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
        })
        .then(function(){
			$scope.fromDate = $rootScope.globalSystemDate.format("YYYY-MM-DD");
			$scope.toDate = $rootScope.globalSystemDate.add('days', 14).format("YYYY-MM-DD");
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
		console.log(moment(fromDate));
		availability.getAvailabilityByRange(1,1,1,-1,fromDate,toDate)
			.then(function(result){
				$scope.loaded = false;
				$scope.availRows = result.data[0][0];
				$scope.availRows.forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY"); console.log(r)});
				$scope.availRows.forEach(function(r){ r.rate = "£" + r.rate.toFixed(2)});
				$scope.availRows = $scope.availRows.chunk(numDays);
				console.log($scope.availRows);
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


	$rootScope.contextMenuOptions = [{"title": "Available","href":"", "click":"a"},{"title": "Booked","href":"", "click":"b"},{"title": "Rates","href":"", "click":"r"},{"title": "New Reservation","href":"", "click":null}]



	var dates = [];
    $(document).on("mousedown",'.dayCell', function(){
        dates = [];
        dates.push(moment($(this).data("date"),"DD/MM/YYYY"));

	});
	$(document).on("mouseup", '.dayCell', function(){
		dates.push(moment($(this).data("date"),"DD/MM/YYYY"));
		showDates();
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
}).config(function($mdDateLocaleProvider){
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }
});