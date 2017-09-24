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
				console.log("response comes next")
				console.log(response.data);
				console.log(response.data.recordset.length);
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
			location.href = '/dashboard/arrivals';
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
