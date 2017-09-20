angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			css: 'css/login.css'
		})

		.when('/dashboard/arrivals', {
			templateUrl: 'views/dashboard/arrivals.html',
			controller: 'DashboardArrivalsController'
		})
		
		.when('/dashboard/departures', {
			templateUrl: 'views/dashboard/departures.html',
			controller: 'DashboardDeparturesController'
		})
		
		.when('/dashboard/inHouse', {
			templateUrl: 'views/dashboard/inHouse.html',
			controller: 'DashboardInHouseController'
		})
		
		.when('/dashboard/newReservation', {
			templateUrl: 'views/dashboard/newReservation.html',
			controller: 'NewReservationController'
		})

		.when('/planner', {
			templateUrl: 'views/planner.html',
			controller: 'PlannerController'	
		})
		
		.when('/reservations/availability', {
			templateUrl: 'views/reservations/availability.html',
			controller: 'AvailabilityController'	
		})
		
		.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'SearchController'	
		})
		
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

}]);
