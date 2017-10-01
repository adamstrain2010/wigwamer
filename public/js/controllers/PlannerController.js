app.controller("PlannerController", function($scope,$rootScope, $http){
	$rootScope.pageTitle = "PLANNER";
	$rootScope.subtitle = "";
	$(".nav").find(".active").removeClass("active");
    $("#plannerLink").addClass("active");	
});