app.factory("housekeeping",function($http){
	var cleanroom = function(roomId, statusId){
		var apiUrl = 'http://52.19.183.139:1234/api/cleanRoom?roomId=' + roomId + "&statusId=" + statusId;
		console.log(apiUrl);
		return $http.post(apiUrl);
	};
	var gethkunits = function(date){
		var apiUrl = 'http://52.19.183.139:1234/api/getHKUnits?date=' + date;
		console.log(apiUrl);
		return $http.get(apiUrl);
	};
	return{
		setStatus: cleanroom,
        getHKUnits: gethkunits
	} 
});