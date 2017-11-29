app.factory("appService", function($http){
	var getsystemdate = function(){
		var apiUrl = "http://52.19.183.139:1234/api/getSystemDate";
		return $http.get(apiUrl);
	};
	var getroomtypes = function(organisationId){
		var apiUrl = 'http://52.19.183.139:1234/api/getRoomTypes?organisationId=' + organisationId;
		console.log(apiUrl);
		return $http.get(apiUrl);
	};
	var getallnationalities = function(){
		console.log("HERE");
		var apiUrl = 'http://52.19.183.139:1234/api/getAllNationalities';
		return $http.get(apiUrl);
	};
	var getratecodes = function(idclient, idproperty){
		var apiUrl = "http://52.19.183.139:1234/api/getRateCodes?idClient=" + idclient + "&idProperty=" + idproperty;
		return $http.get(apiUrl);
	};
    function showsnackbar(message) {
        var x = document.getElementById("snackbar")
		x.innerHTML = message;
        setTimeout(function(){ x.className = "show"; }, 50);
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
	};
    function checkarrivalsprocessed(systemDate){
    	var apiUrl = "http://52.19.183.139:1234/api/reservations?arrivalDate='" + systemDate;
    	return $http.post(apiUrl);
	};
    function allocateroom(idReservation, idUnit){
    	if(idUnit == null){
            var apiUrl = "http://52.19.183.139:1234/api/deallocateRoom?idReservation=" + idReservation;
            return $http.post(apiUrl);
		}
		else{
            var apiUrl = "http://52.19.183.139:1234/api/allocateRoom?idReservation=" + idReservation + "&idUnit=" + idUnit;
            console.log(apiUrl);
            return $http.post(apiUrl);
		}

        console.log(apiUrl);

	};
    function autoallocate(reservationArray){
    	reservationArray = encodeURIComponent(reservationArray);
		var apiUrl = "http://52.19.183.139:1234/api/autoAllocate?reservations=" + reservationArray;
		return $http.post(apiUrl);
	};
    function rollday(){
    	var apiUrl = "http://52.19.183.139:1234/api/rollDay";
    	return $http.post(apiUrl);
	}
	return{
		getSystemDate: getsystemdate,
		getRoomTypes: getroomtypes,
		getAllNationalities: getallnationalities,
		getRateCodes: getratecodes,
		showSnackBar: showsnackbar,
		checkArrivalsProcessed: checkarrivalsprocessed,
		allocateRoom: allocateroom,
		autoAllocate: autoallocate,
		rollDay: rollday
	}
});

// app.factory("Entry", function($http){
//     // return $resource("http://52.19.183.139:1234/api/getRoomTypes/:organisationId");
// });