var app = angular.module('MainCtrl', ['ngAria', 'ngAnimate','ngMaterial', 'ui.router']);

app.factory("reservation", function($http){
	return {
		save: function(res){
			var apiUrl = 'http://52.19.183.139:1234/api/saveReservation' + res;
			console.log(apiUrl);
			return $http({
				method: 'PUT',
				url: apiUrl,
				cache: true
			})
			.then(function(data){
				return data.data
			})
		}	
	}
		
});

app.factory("helpers",function(){
	return {
		urlEncodeObject: function(resObj){
			var urlOutput = "?";
			for(var k in resObj){
				if(resObj.hasOwnProperty(k)){
					urlOutput += k + "=" +  resObj[k] + "&";
				}
			}
			urlOutput = urlOutput.substr(0, urlOutput.length - 1);
			return urlOutput;	
		}
	}
});

app.run(function($rootScope, $http, $location, dashboard, dashboard){
	$rootScope.rollDay = function(){
		console.log("rolling");
		console.log(moment($rootScope.globalSystemDate).format("YYYY-MM-DD"));
		dashboard.getReservationsDeparting($rootScope.globalSystemDate.format("YYYY-MM-DD"))
		.then(function(data){
			var departures = data.data.recordset.length;
			console.log(departures);
			if(departures == 0){
				var apiUrl = 'http://52.19.183.139:1234/api/rollDay';
				if(confirm("Do you definitely want to roll the day?")){
					$http.post(apiUrl)
					.then(function(result){
						alert("Day Successfully Rolled.")
						$location.path('/');
					})
					.catch(function(err){
						console.log(err);
					});
				};
			}
			else{
				alert("You still have departures to process");
			}
		})
		.catch(function(err){
			console.log(err);
		})
	};
});















