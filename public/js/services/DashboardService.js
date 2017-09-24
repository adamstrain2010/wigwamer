app.factory("dashboard", function($http){
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
		var apiUrl = "http://52.19.183.139:1234/api/saveReservation?clientId=1&surname=" + surname + "&forename=" + forename + "&arrivalDate=" + arrivalDate + "&departureDate=" + departureDate + "&bookingSource=" + bookingSource;
		return $http.post(apiUrl);
	};
	var checkout = function(reservationId){
		console.log("checkOutIndividual");
		console.log(reservationId);
		var apiUrl = 'http://52.19.183.139:1234/api/checkOut?reservationNum=' + reservationId;
		return $http.post(apiUrl);
	};
	var getdate = function(){
		var apiUrl = "http://52.19.183.139:1234/api/getSystemDate";
		return $http.get(apiUrl);
	};
	var getreservations = function(arrivalDate){
		var apiUrl = 'http://52.19.183.139:1234/api/reservations?arrivalDate=' + arrivalDate;
		return $http.post(apiUrl);
	};
	var showdata = function(reservationId){
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
	};
	var cancelall = function(){
		var apiUrl = 'http://52.19.183.139:1234/api/cancelAll';
		return $http.post(apiUrl);
	}
	return{
		getReservationsDeparting: getReservationsByDepartDate,
		method2: getReservationByArrivalDate,
		reservationsInHouse: getReservationsInHouse,
		checkInSingle: checkInIndividual,
		doSearch: searchReservations,
		cancelReservation: cancel,
		createReservation: newReservation,
		checkOut: checkout,
		getDate: getdate,
		getReservations: getreservations,
		showData: showdata,
		cancelAll: cancelall
	}
});

// app.factory("dashboard", function($http){
	// var test = function(departDate){
		// console.log("yeppers");
		// console.log("Michael, what have I told you about yeppers?");
	// };
	
	// return{
		// Test: test
	// }
// });