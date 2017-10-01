app.factory("search", function($http, helpers){
    var quicksearch = function(typing){
        var apiUrl = 'http://52.19.183.139:1234/api/search?searchTerm=' + typing;
        console.log(apiUrl);
        return $http.get(apiUrl);
    }
    return {
        quickSearch: quicksearch
    }


});