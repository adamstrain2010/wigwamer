angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			css: 'css/login.css'
		})

		.when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController'
		})

		.when('/planner', {
			templateUrl: 'views/planner.html',
			controller: 'PlannerController'	
		})
		
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

}]);
