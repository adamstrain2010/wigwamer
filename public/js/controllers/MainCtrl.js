var app = angular.module('MainCtrl', []);
app.factory("TestService",function($http){
	return {
		async : function(arrivalDate){
			var apiUrl = 'http://52.19.183.139:1234/api/reservations?arrivalDate=' + arrivalDate;
                	console.log("apiUrl: " + apiUrl);
                	return $http.post(apiUrl);
		}
	};
});

app.factory("getInfo", function($http){
	 return {
                printData: function(el){
                        console.log(el);
                        //return "adam";
                }
        };

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
                	      	login(response.data.recordset.length);
               		 }, function errorCallback(err){
				$scope.showMessage("error",err.data + "\n Please contact support if problem persists");
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

app.controller('DashboardController',function($scope,$http, TestService, getInfo){
	$scope.printInfo = getInfo.printData;

	var reservations;
	$scope.reservations;
	$scope.arrivalDate = "2017-11-01";
	$scope.reservation 
	TestService.async($scope.arrivalDate).then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
	});
	
	//console.log(moment().format('MMMM Do YYYY'));
	//$scope.arrivalDate = "2017-11-01";
	//concatUrl = "http://52.19.183.139:1234/api/reservations?arrivalDate=" + $scope.arrivalDate;
 	//console.log(concatUrl);
	//$scope.reservations;
	//$http({
	//	method: "POST",
	//	url: concatUrl
	//}).then(function(response){
	//	$scope.reservations = response.data.recordset;
	//	console.log(data);
	//}, function(err){
	//	console.log("Error: " + err.data + "\n Please contact support if issue persists");
//	});
	
	//console.log("Yes!");
	//$scope.data = [{"resNum":"001", "resName": "Adam Strain", "arrivalDate": "30/06/2018"},{"resNum":"002", "resName": "Roger Dodger","arrivalDate": "30/06/2018"}];
});
