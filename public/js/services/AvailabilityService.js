app.factory('availability', function($http){
    var getavailabilitybyrange = function(clientId, propertyId, rateCodeId, unitTypeId, fromDate, toDate){
        var apiUrl = "http://52.19.183.139:1234/api/testingRoute?clientId=" + clientId + "&propertyId=" + propertyId + "&rateCodeId=" + rateCodeId + "&unitTypeId=" + unitTypeId + "&fromDate=" + fromDate + "&toDate=" + toDate;
        // var apiUrl = "http://52.19.183.139:1234/api/testingRoute";
        return $http.get(apiUrl);
    }
    // var getavailabilitybyrange = function(){
    //     console.log("ypp");
    //     //var apiUrl = "http://52.19.183.139:1234/api/getAvailabilityRange?clientId=" + clientId + "&propertyId=" + propertyId + "&rateCodeId=" + rateCodeId + "&unitTypeId=" + unitTypeId + "&fromDate=" + fromDate + "&toDate=" + toDate;
    //     var apiUrl = "http://52.19.183.139:1234/api/testingRoute";
    //     console.log(apiUrl);
    //     return $http.get(apiUrl);
    // }
    return {
        getAvailabilityByRange: getavailabilitybyrange
    }
})