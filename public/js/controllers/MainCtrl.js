var app = angular.module('MainCtrl', ['ngAria', 'ngAnimate','ngMaterial']);

app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD/MM/YYYY');
    };
});





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

app.run(function($rootScope, $http, dashboard){
	$rootScope.rollDay = function(){
		console.log("rolling");
		var apiUrl = 'http://52.19.183.139:1234/api/rollDay';
		if(confirm("Do you definitely want to roll the day?")){
			$http.post(apiUrl)
			.then(function(result){
				alert("Day Rolled.")
				console.dir(result.data.outDate);
			})
			.catch(function(err){
				console.log(err);
			});
		};
	};
});















