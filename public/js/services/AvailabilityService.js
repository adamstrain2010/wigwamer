app.factory('availability', function($http){
    var getavailabilitybyrange = function(clientId, propertyId, rateCodeId, unitTypeId, fromDate, toDate){
        var apiUrl = "http://52.19.183.139:1234/api/testingRoute?clientId=" + clientId + "&propertyId=" + propertyId + "&rateCodeId=" + rateCodeId + "&unitTypeId=" + unitTypeId + "&fromDate=" + fromDate + "&toDate=" + toDate;
        // var apiUrl = "http://52.19.183.139:1234/api/testingRoute";
        return $http.get(apiUrl);
    };
    //FUNCTION TO RETURN ONLY ROOMTYPES THAT AREA AVAILABLE FOR WHOLE DATE RANGE - NOT SOME OF THE DATE RANGE
    var checkavailbyrange = function(arrivalDate, departureDate){
        var fromDate = moment(arrivalDate).format("YYYY-MM-DD");
        var toDate = moment(departureDate).format("YYYY-MM-DD");
        var numDays = moment(toDate).diff(moment(fromDate), 'days');
        var availRows;
        getavailabilitybyrange(1, 1, 1, -1, fromDate, toDate)
            .then(function(result){
                availRows = result.data[0][0];
                availRows.forEach(function(r){ r.configdate = moment(r.configdate).format("DD/MM/YY")});
                availRows.forEach(function(r){ r.rate = "£" + r.rate.toFixed(2)});
                availRows = availRows.chunk(numDays);
                availRows.forEach(function(r){ r.forEach(function(innerR){
                    if(innerR.unitsavailable == 0){
                        var index = availRows.indexOf(r);
                        if(index > 1){
                            availRows.splice(index, 1);
                        }
                    }}
                )
                });
            })
            .then(function(availRows){
                //console.log(availRows);
                return availRows;
            })
            .catch(function(err){
                console.log(err);
            })
    };

    return {
        getAvailabilityByRange: getavailabilitybyrange,
        checkAvailabilityByRange: checkavailbyrange
    }
})

