app.controller("AvailabilityController", function($scope, $rootScope, $location, appService){
	appService.getRoomTypes(1)
	.then(function(data){
		$scope.roomTypes = data.data.recordset;
		console.log($scope.roomTypes);
	})
	.catch(function(err){
		console.log(err);
	});
	
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