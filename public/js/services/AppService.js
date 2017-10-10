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
    function showsnackbar(message) {
        var x = document.getElementById("snackbar")
		x.innerHTML = message;
        setTimeout(function(){ x.className = "show"; }, 50);
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
	};
	return{
		getSystemDate: getsystemdate,
		getRoomTypes: getroomtypes,
		getAllNationalities: getallnationalities,
		showSnackBar: showsnackbar
	}
});