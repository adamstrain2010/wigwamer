app.factory("dashboard", function($http){
	var getReservationsByDepartDate = function(departDate){
		var apiUrl = 'http://52.19.183.139:1234/api/reservationsByDepartDate?departDate=' + departDate;
		return $http.post(apiUrl);
	};
	var getReservationByArrivalDate = function(){

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
	var newReservation = function(surname, forename, arrivalDate,departureDate, bookingSource, nationalityId, idUnitType, idRateCode){
		var apiUrl = "http://52.19.183.139:1234/api/saveReservation?clientId=1&surname=" + surname + "&forename=" + forename + "&arrivalDate=" + arrivalDate + "&departureDate=" + departureDate + "&bookingSource=" + bookingSource + "&idNationality=" + nationalityId + "&idUnitType=" + idUnitType + "&idRateCode=" + idRateCode;
		return $http.post(apiUrl);
	};
	var checkout = function(reservationId){
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
	};
	var getroomsbasedonroomtype = function(roomTypeId){
		var apiUrl = 'http://52.19.183.139:1234/api/getRoomsBasedOnRoomType?roomTypeId=' + roomTypeId;
		return $http.get(apiUrl);
	};
	var getallspecials = function(){
		console.log("hitting here");
		var apiUrl = 'http://52.19.183.139:1234/api/getAllSpecials';
		console.log($http.get(apiUrl));
		return $http.get(apiUrl);
	};
	var insertextra = function(extra, idReservation){
		var apiUrl = 'http://52.19.183.139:1234/api/insertExtra?clientId=' + extra.extraType.idclient + '&propertyId=1&extraId=' + extra.extraId +
		'&reservationId=' + idReservation + '&chargeDate=2017-06-01&adultCharge=51.75';
		return $http.post(apiUrl);
	};
	var getreservationextras = function(idReservation){
        var apiUrl = 'http://52.19.183.139:1234/api/getReservationExtras?idReservation=' + idReservation;
        return $http.get(apiUrl);
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
		cancelAll: cancelall,
		getRoomsFromRoomType: getroomsbasedonroomtype,
		getAllSpecials: getallspecials,
        insertExtra: insertextra,
        getReservationExtras: getreservationextras
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