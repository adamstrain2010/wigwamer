app.factory("appService", function($http){
	var getroomtypes = function(organisationId){
		var apiUrl = 'http://52.19.183.139:1234/api/getRoomTypes?organisationId=' + organisationId;
		return $http.get(apiUrl);
	};
	return{
		getRoomTypes: getroomtypes
	}
});