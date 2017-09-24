app.controller("SearchController", function($scope,$rootScope, $http){
	$rootScope.pageTitle = "SEARCH";
	$rootScope.subtitle = "";
	$(".nav").find(".active").removeClass("active");
	$("#searchLink").addClass("active");	
});