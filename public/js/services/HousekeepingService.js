app.factory("housekeeping",function($http){
	var cleanroom = function(roomId){
		var apiUrl = 'http://52.19.183.139:1234/api/cleanRoom?roomId=' + roomId;
		return $http.post(apiUrl);
	};
	return{
		setStatus: cleanroom
	} 
});