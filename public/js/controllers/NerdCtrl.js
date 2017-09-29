angular.module('NerdCtrl', []).controller('NerdController', function($scope, $rootScope, $cookieStore, $location) {
    $scope.$on('$routeChangeStart', function(next, current){
		$location.path() != '/' ? !$cookieStore.get("user") ? location.href = '/' : '' : '';

    });

});
