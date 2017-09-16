var app = angular.module('MainCtrl', []);
app.factory("TestService",function($http){
	return {
		async : function(arrivalDate){
			var apiUrl = 'http://52.19.183.139:1234/api/reservations?arrivalDate=' + arrivalDate;
                	return $http.post(apiUrl);
		}
	};
});

app.factory("getReservation", function($http){
	 return {
                showData: function(reservationId){
			
                        var apiUrl = 'http://52.19.183.139:1234/api/getReservation?reservationId=' + reservationId;
			console.log(reservationId);
			return $http({
				method: 'POST',
				url: apiUrl,
				cache: true
			})
			.then(function(data){
				return data.data
			})
		}
        }

});

app.controller('LoginController', function($scope,$rootScope,$location, $http) {
	$rootScope.location =  $location;
	$("body").css("backgroundColor","#ECEBD6");
	$scope.tagline = 'WIGWAMER LOGIN!';	
	
	$scope.property = '';
	$scope.user = '';
	$scope.password = '';
	
	$scope.validateUser = function(){
		if($scope.checkFilled([$scope.property, $scope.user, $scope.password])){
			var apiUrl = 'http://52.19.183.139:1234/api/checkUser?username=' + $scope.user + '&organisation=' + $scope.property + '&password=' + $scope.password;
			$http({
	                        method: 'POST',
        	                url: apiUrl
        	        })
	                .then(function successCallback(response){
				console.log(response);
                	      	login(response.data.recordset.length);
               		 }, function errorCallback(err){
				if(err.data == null){
					$scope.showMessage("error", "The wigwamer API is currently down. Please contact support.");
				}
				else{
					$scope.showMessage("error",err.data + "\n Please contact support if problem persists");
				}
                	});

		}
		else{
			$scope.showMessage("warning","Something is missing. Please check and try again");
		}

	};

	function login(validUser){
		if(validUser){
			location.href = '/dashboard';
		}
		else{
			$scope.showMessage("warning", "Something is not quite right there. Please check and try again");
		}
	}

	$scope.checkFilled = function(els){
		var set = true;
		for(var i = 0; i < els.length; i++){
			if(els[i].length == 0){
				set = false;
			}
		}
		return set;
	}

	$scope.showMessage = function(type, text){
		$('#messageContainer').css("opacity",0);
		$('#warningMessage').html(text);
		$('#messageContainer').animate({opacity: 1},1000);
		if(type == "warning"){
                        setTimeout(function(){
                                $('#messageContainer').animate({opacity: 0},2000);
                        },6000);
		}
		else if(type == "error"){
			//do nothing
		}
	}
	$('#messageContainer').click(function(){
		$(this).css("opacity",0);
	})
});

app.controller('DashboardController',function($scope,$http,$rootScope, TestService, getReservation){
	$rootScope.$on('$viewContentLoaded',function(){
		$("#arrivalDate").datepicker({
			format: "DD-MM-YYYY",
			inline: true,
			sideBySide: false,
			minDate: moment()
		})
	})



	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$scope.printInfo = getReservation.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.arrivalDate = "2017-11-01";
	$scope.selecredReservation;
	TestService.async($scope.arrivalDate).then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
	});

	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.reservationId);
		getReservation.showData(reservationNum.reservation.reservationId)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			console.log($scope.selectedReservation);
		})
		.catch(function(err){
			console.log(err);
		})
	};
});

app.controller("PlannerController", function($scope, $http){
	$(".nav").find(".active").removeClass("active");
        $("#plannerLink").addClass("active");	
   	console.log("adam");
});
