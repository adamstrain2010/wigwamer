var app = angular.module('MainCtrl', []);
app.directive('escKey',function(){
	return function(scope, element, attrs){
		element.bind('keydown keypress', function(event){
			if(event.which === 27){
				scope.$apply(function(){
					scope.$eval(attrs.escKey);
				});
				event.preventDefault();
			}
		})
	}
})

app.directive("searchKey", function(){
	return function(scope,element, attrs){
		element.bind("keyup", function(){
			console.log(attrs.$$element[0].value);
		})
	};
});

app.factory("TestService",function($http){
	return {
		async : function(arrivalDate){
			var apiUrl = 'http://52.19.183.139:1234/api/reservations?arrivalDate=' + arrivalDate;
                	return $http.post(apiUrl);
		}	
		
	};
});

app.factory("reservations", function($http){
	var getReservationsByDepartDate = function(departDate){
		var apiUrl = 'http://52.19.183.139:1234/api/reservationsByDepartDate?departDate=' + departDate;
		return $http.post(apiUrl);
	};
	var getReservationByArrivalDate = function(){
		console.log("getReservationsByArrival");
	};
	var getReservationsInHouse = function(){
		var apiUrl = 'http://52.19.183.139:1234/api/reservationsInHouse';
		return $http.post(apiUrl);
	};
	var checkInIndividual = function(reservationNum){
		var apiUrl = 'http://52.19.183.139:1234/api/checkIn?reservationNum=' + reservationNum;
		return $http.post(apiUrl);
	};
	var searchReservations = function(searchString){
		var apiUrl = 'http://52.19.183.139:1234/api/search?searchTerm=' + searchString;
		return $http.get(apiUrl);
	};
	var cancel = function(reservationNum){
		var apiUrl = 'http://52.19.183.139:1234/api/cancelReservation?reservationNum=' + reservationNum;
		return $http.post(apiUrl);
	};
	var newReservation = function(surname, forename, arrivalDate,departureDate, bookingSource){
		var apiUrl = "http://52.19.183.139:1234/api/saveReservation?surname=" + surname + "&forename=" + forename + "&arrivalDate=" + arrivalDate + "&departureDate=" + departureDate + "&bookingSource=" + bookingSource;
		return $http.post(apiUrl);
	};
	var checkout = function(reservationId){
		var apiUrl = 'http://52.19.183.139:1234/api/checkOut?reservationNum=' + reservationId;
		return $http.post(apiUrl);
	};
	return{
		getReservationsDeparting: getReservationsByDepartDate,
		method2: getReservationByArrivalDate,
		reservationsInHouse: getReservationsInHouse,
		checkInSingle: checkInIndividual,
		doSearch: searchReservations,
		cancelReservation: cancel,
		createReservation: newReservation,
		checkOut: checkout
	}
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

app.controller('LoginController', function($scope,$rootScope,$location, $http) {
	$rootScope.location =  $location;
	
	$rootScope.systemDate = '2017-11-01';
	
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
							console.log(response.data.recodset);
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


//ARRIVALS CONTROLLER
app.controller('DashboardArrivalsController',function($scope,$http,$rootScope, TestService, getReservation, helpers, reservation, reservations){
	$scope.setModal = function(state){
		$scope.modalContextOpen = state;
	}
	$scope.modalContextOpen = "reservation";
	
	$rootScope.systemDate = '2017-11-01';
	$rootScope.systemDateLong = moment('2017-11-01').format("dddd, MMMM Do YYYY");
	
	$scope.modalMenuOptions = [{"title": "Reservation","state":"reservation"},{"title": "Breakdown","state":"breakdown"},{"title": "Posting","state":"posting"},{"title": "History","href":"history"}]
	
	$scope.contextMenu = {"title":"check in", "function":"checkIn(this.selectedReservation.reservationId)"};
	
	
	$scope.checkIn = function(el){
		reservations.checkInSingle(el)
		.then(function(data){
			if(confirm("are you sure you want to do this?") == true){
				TestService.async($scope.arrivalDate).then(function(response){
					$scope.reservations = response.data.recordset;
					$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
					$scope.message = {"title": "Checked In", "body": "The reservation was checked in successfully, you can now hand the key to the guest"};
				})
				.then(function(){
					//adam yes
					alert("Reservation Checked In");
				})		
				.catch(function(err){
					console.log(err);
				});
			};
		})
	};
	$scope.filterText = '';
	$(document).on('hidden.bs.modal',"#myModal",function(){
		if($scope.checkedIn == true){
		}
	});
	
	// $(document).on('hidden.bs.modal','#myModal',function(){
		// $("#myMessageModal").modal("show");
	// });
	
	// $(document).ready(function(){
		// $("#myMessageModal").modal("show");
	// });
	
	$scope.cancel = function(resNum){
		reservations.cancelReservation(resNum)
		.then(function(data){
			if(confirm("Do you really want to cancel reservation " + resNum + "?") == true){
				TestService.async($scope.arrivalDate).then(function(response){
					$scope.reservations = response.data.recordset;
					$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
					$scope.message = {"title": "Cancelling Reservation", "body": "Are you sure you want to cancel this reservation?"};
				})
				.then(function(){
					alert("Reservation Cancelled");
					//$("#myMessageModal").modal("show");
				})
			}
		})
		
	};
	
	$scope.closeModal = function(){
		$(".fullScreenModal").css("display", "none")
		$("body").css("overflow", "scroll")
	};
	
	$(document).on("click", "#searchClose", function(){
		$scope.closeModal();
	});
	
	$scope.searchedReservations = [{"name":"adam"},{"name":"roger"},{"name":"david"},{"name":"jim"}];
	
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "arrivals";
	
	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$rootScope.searchOpen = false;
	$rootScope.search = function(){
		console.log("searching function activated");
		$("#mainSearchInput").val('');
		$("body").css("overflow", "hidden")
		$(".fullScreenModal").css("display","block");
		$scope.searchOpen = true;
		$("#mainSearchInput").focus();
	};
	
	$scope.searchedResers;
	
	$scope.doSearch = function(searchTerm){
		if(searchTerm.length >= 3){
			reservations.doSearch(searchTerm)
			.then(function(result){
				console.log(result.data.recordset)
				$scope.searchedResers = result.data.recordset;
			})
		}
		else{
			$scope.searchedResers = [];
		}
	};
	
	$scope.hideModal = function(){
	};
	
	$scope.printInfo = getReservation.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.arrivalDate = "2017-11-01";
	$scope.selectedReservation;
	TestService.async($scope.arrivalDate).then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
	});

	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.reservationId);
		getReservation.showData(reservationNum.reservation.reservationId)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.arrivalDate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.departureDate).format("YYYY-MM-DD");
			console.log($scope.selectedReservation);
			console.log(helpers.urlEncodeObject($scope.selectedReservation));
		})
		.catch(function(err){
			console.log(err);
		})
	};

	$scope.saveReservation = function(){
		console.log(helpers.urlEncodeObject($scope.selectedReservation));
		reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
		.then(function(){
			alert("Saved Successfully!");	
		})
		.catch(function(err){
			console.log(err);
		});		
	};
	
	$scope.createReservation = function(){
		console.log("yep");
		$http.post("http://52.19.183.139:1234/api/createReservation")
		.then(function(data){
			TestService.async($scope.arrivalDate).then(function(response){
				$scope.reservations = response.data.recordset;
				$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
			});
		});
	};
	
	$scope.message;
	
	$scope.checkedIn = false;
	
});


//DEPARTURES CONTROLLER
app.controller('DashboardDeparturesController',function($scope,$http,$rootScope, TestService, getReservation, helpers, reservation, reservations){
	$scope.checkOut = function(resNum){
		reservations.checkOut(resNum)
		.then(function(response){
			alert("checked out!");
			console.log(response);
		})
		.then(function(){
			reservations.getReservationsDeparting($scope.departDate).then(function(response){
			$scope.reservations = response.data.recordset;
			$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
			})
		})
		.catch(function(err){
			console.log(err);
		});
	};   
	
	console.log("yep");
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "departures";
	
	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$scope.printInfo = getReservation.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.departDate = "2017-11-01";
	$scope.selecredReservation;
	reservations.getReservationsDeparting($scope.departDate).then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
	});

	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.reservationId);
		getReservation.showData(reservationNum.reservation.reservationId)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.arrivalDate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.departureDate).format("YYYY-MM-DD");
			console.log($scope.selectedReservation);
			console.log(helpers.urlEncodeObject($scope.selectedReservation));
		})
		.catch(function(err){
			console.log(err);
		})
	};

	$scope.saveReservation = function(){
		console.log(helpers.urlEncodeObject($scope.selectedReservation));
		reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
		.then(function(){
			alert("Saved Successfully!");	
		})
		.catch(function(err){
			console.log(err);
		})		
	}
});

//IN HOUSE CONTROLLER
app.controller('DashboardInHouseController',function($scope,$http,$rootScope, TestService, getReservation, helpers, reservation, reservations){
	console.log("yep");
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$rootScope.pageTitle = "DASHBOARD|";
	$rootScope.subtitle = "in house";
	
	$scope.sortType = "reservationId";
	$scope.sortReverse = false;

	$scope.printInfo = getReservation.showData;
	
	$scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
	$scope.reservations;
	$scope.departDate = "2017-11-02";
	$scope.selecredReservation;
	reservations.reservationsInHouse().then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
	});

	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.reservationId);
		getReservation.showData(reservationNum.reservation.reservationId)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.arrivalDate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.departureDate).format("YYYY-MM-DD");
			console.log($scope.selectedReservation);
			console.log(helpers.urlEncodeObject($scope.selectedReservation));
		})
		.catch(function(err){
			console.log(err);
		})
	};

	$scope.saveReservation = function(){
		console.log(helpers.urlEncodeObject($scope.selectedReservation));
		reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
		.then(function(){
			alert("Saved Successfully!");	
		})
		.catch(function(err){
			console.log(err);
		})		
	}
});

app.controller("NewReservationController", function($scope,$rootScope, $http, reservations, $location){
	$("#surnameInput").focus();
	$rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
	$scope.save = function(){
		console.log($scope.bookingsSource);
		console.log($scope.arrivalDate);
		var fromDate = moment($scope.arrivalDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
		var toDate = moment($scope.departureDate, 'DD/MM/YYYY').format("YYYY-MM-DD")
		console.log(fromDate);
		console.log(toDate);
		reservations.createReservation($scope.surname, $scope.forename, fromDate, toDate, $scope.bookingsSource)
		.then(function(result){
			console.log(result);
			alert("reservation created successfully!");
			$location.path('/dashboard/arrivals');
		})
		.catch(function(err){
			console.log(err);
		});
	};
	
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
	
	$scope.currentDate = moment('01/11/2017', "DD/MM/YYYY");
	console.log($rootScope.currentDate);
	var date_input=$('#arrival, #departure'); //our date input has the name "date"
	var container=$('#whatever');;
	var options={
		format: 'dd/mm/yyyy',
		startDate: new Date(2017,10,01),
		todayHighlight: true,
		calendarWeeks: false,
		autoclose: true,
		todayBtn: false,
		todayHighlight: true,
		weekStart: 1,
		toValue: function (date, format, language) {
            date.format= 'yyyy-mm-dd'
        }
	};
	date_input.datepicker(options);
});

// , 
// defaultViewDate: $scope.currentDate.format("yyyy-mm-dd")

app.controller("PlannerController", function($scope,$rootScope, $http){
	$rootScope.pageTitle = "PLANNER";
	$rootScope.subtitle = "";
	$(".nav").find(".active").removeClass("active");
    $("#plannerLink").addClass("active");	
   	
});


app.controller("AvailabilityController", function($scope,$rootScope, $http){
	$rootScope.pageTitle = "AVAILABILITY|";
	$rootScope.subtitle = "by type";
	$(".nav").find(".active").removeClass("active");
	$("availabilityLink").addClass("active");	
   	
});

app.controller("SearchController", function($scope,$rootScope, $http){
	$rootScope.pageTitle = "SEARCH";
	$rootScope.subtitle = "";
	$(".nav").find(".active").removeClass("active");
	$("#searchLink").addClass("active");	
   	
});


$(document).ready(function(){
	$("#myModal").modal({show: false});
	$("#myMessageModal").modal({show: false});

	
});
