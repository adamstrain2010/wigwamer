app.factory("dashboard", function($http){
    var getReservationsByDepartDate = function(departDate){
        var apiUrl = 'http://52.19.183.139:1234/api/reservationsByDepartDate?departDate=' + departDate;
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var getReservationByArrivalDate = function(){

    };
    var getReservationsInHouse = function(){
        var apiUrl = 'http://52.19.183.139:1234/api/reservationsInHouse';
        return $http.post(apiUrl);
    };
    var checkInIndividual = function(reservationNum, idUnit){
        var apiUrl = 'http://52.19.183.139:1234/api/checkIn?reservationNum=' + reservationNum + '&idUnit=' + idUnit;
        return $http.post(apiUrl);
    };
    var searchReservations = function(searchString){
        var apiUrl = 'http://52.19.183.139:1234/api/search?searchTerm=' + searchString;
        return $http.get(apiUrl);
    };
    var cancel = function(reservationNum){
        var apiUrl = 'http://52.19.183.139:1234/api/cancelReservation?reservationNum=' + reservationNum;
        return $http.post(apiUrl);
    };
    var newReservation = function(surname, forename, arrivalDate,departureDate, bookingSource, nationalityId, idUnitType, idUnit, idRateCode){
       if(idUnit != null){
           var apiUrl = "http://52.19.183.139:1234/api/saveReservation?clientId=1&surname=" + surname + "&forename=" + forename + "&arrivalDate=" + arrivalDate + "&departureDate=" + departureDate + "&bookingSource=" + bookingSource + "&idNationality=" + nationalityId + "&idUnitType=" + idUnitType + "&idUnit=" + idUnit + "&idRateCode=" + idRateCode;
       }
       else{
           var apiUrl = "http://52.19.183.139:1234/api/saveReservation?clientId=1&surname=" + surname + "&forename=" + forename + "&arrivalDate=" + arrivalDate + "&departureDate=" + departureDate + "&bookingSource=" + bookingSource + "&idNationality=" + nationalityId + "&idUnitType=" + idUnitType + "&idRateCode=" + idRateCode;
       }
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var checkout = function(reservationId, unitId){
        var apiUrl = 'http://52.19.183.139:1234/api/checkOut?reservationNum=' + reservationId + "&unitId=" + unitId;
        return $http.post(apiUrl);
    };
    var getdate = function(){
        var apiUrl = "http://52.19.183.139:1234/api/getSystemDate";
        return $http.get(apiUrl);
    };
    var getreservations = function(arrivalDate){
        var apiUrl = 'http://52.19.183.139:1234/api/reservations?arrivalDate=' + arrivalDate;
        return $http.post(apiUrl);
    };
    var getreservationsfull = function(arrivalFromDate, arrivalToDate, departureFromDate, departureToDate){
        console.log(arrivalFromDate);
        var apiUrl = 'http://52.19.183.139:1234/api/getReservationsFull?arrivalFromDate=' + arrivalFromDate + "&arrivalToDate=" + arrivalToDate +  "&departureFromDate=" + departureFromDate + "&departureToDate=" + departureToDate;
        console.log(apiUrl)
        return $http.post(apiUrl);
    };
    var getinhouse = function(inHouseDate, idunittype){
        var apiUrl = 'http://52.19.183.139:1234/api/reservations?inHouseDate=' + inHouseDate + "&idUnitType=" + idunittype;
        console.log(apiUrl);
        return $http.post(apiUrl);
    }
    var showdata = function(reservationId){
        var apiUrl = 'http://52.19.183.139:1234/api/getReservation?reservationId=' + reservationId;
        console.log(apiUrl);
        return $http({
            method: 'POST',
            url: apiUrl,
            cache: true
        })
            .then(function(data){
                return data.data
            })
    };
    var cancelall = function(){
        var apiUrl = 'http://52.19.183.139:1234/api/cancelAll';
        return $http.post(apiUrl);
    };
    var getroomsbasedonroomtype = function(roomTypeId){
        var apiUrl = 'http://52.19.183.139:1234/api/getRoomsBasedOnRoomType?roomTypeId=' + roomTypeId;
        return $http.get(apiUrl);
    };
    var getallspecials = function(){
        console.log("hitting here");
        var apiUrl = 'http://52.19.183.139:1234/api/getAllSpecials';
        console.log($http.get(apiUrl));
        return $http.get(apiUrl);
    };
    var insertextra = function(extra, idReservation, chargeDate){
        var apiUrl = 'http://52.19.183.139:1234/api/insertExtra?clientId=' + 1 + '&propertyId=1&extraId=' + extra.extraId +
            '&reservationId=' + idReservation + '&chargeDate=' + chargeDate + '&adultCharge=5.00';
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var deleteextra = function(extraId, resId){
        var apiUrl = 'http://52.19.183.139:1234/api/deleteExtra?extraId=' + extraId + '&resId=' + resId;
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var getreservationextras = function(idReservation){
        var apiUrl = 'http://52.19.183.139:1234/api/getReservationExtras?idReservation=' + idReservation;
        return $http.get(apiUrl);
    };
    var getcharges = function(idReservation){
        var apiUrl = "http://52.19.183.139:1234/api/getCharges?idReservation=" + idReservation;
        return $http.post(apiUrl);
    };
    var gettransactions = function(idReservation){
        var apiUrl = "http://52.19.183.139:1234/api/getTransactions?reservationId=" + idReservation;
        return $http.get(apiUrl);
    };
    var gettransactioncodes = function(clientId){
        var apiUrl = "http://52.19.183.139:1234/api/getTransactionCodes?clientId=" + clientId;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var getbalancetopay = function(idReservation){
        var apiUrl = "http://52.19.183.139:1234/api/getBalanceToPay?reservationId=" + idReservation;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var insertposting = function(idClient, idProperty, idReservation, idTransCode, transValue, transTaxValue, sysDate){
        var apiUrl = "http://52.19.183.139:1234/api/insertPosting?idClient=" + idClient + "&idProperty=" + idProperty +  "&reservationId=" + idReservation + "&transcodeId=" + idTransCode + "&value=" + transValue + "&tax=" + transTaxValue + "&sysDate=" + sysDate;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var getpostings = function(idReservation){
        var apiUrl = "http://52.19.183.139:1234/api/getPostings?reservationId=" + idReservation;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var voidtransaction = function(idTransaction){
        var apiUrl = "http://52.19.183.139:1234/api/voidTransaction?transId=" + idTransaction;
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var deleteextracharge = function(idReservationExtraCharge){
        var apiUrl = "http://52.19.183.139:1234/api/deleteExtra?idReservationExtra=" + idReservationExtraCharge;
        console.log(apiUrl);
        return $http.delete(apiUrl);
    };
    var getconcurrentrooms = function(fromDate, toDate, idUnitType){
        var apiUrl = "http://52.19.183.139:1234/api/getConcurrentRooms?fromDate=" + fromDate + "&toDate=" + toDate + "&idUnitType=" + idUnitType;
        console.log(apiUrl);
        return $http.get(apiUrl);
    }
    var getnonconcurrentrooms = function(idUnitType){
        var apiUrl = "http://52.19.183.139:1234/api/getNonConcurrentRooms?idUnitType=" + idUnitType;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var getdetailedavailability = function(fromDate, toDate, idUnitType){
        var apiUrl = "http://52.19.183.139:1234/api/getDetailedAvailability?fromDate=" + fromDate + "&toDate=" + toDate + "&idUnitType=" + idUnitType;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var getallreservations = function(arrivalDateFrom, arrivalDateTo, departureDateFrom, departureDateTo){
        var apiUrl = "http://52.19.183.139:1234/api/getAllReservations?arrivalFromDate=" + arrivalDateFrom + "&arrivalToDate=" + arrivalDateTo + "&departureFromDate=" + departureDateFrom + "&departureToDate=" + departureDateTo;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var updateres = function(reservationNumber,forename,arriving,departing,unitTypeId, unitId, rateCodeId){
        var apiUrl = "http://52.19.183.139:1234/api/updateRes?resId=" + reservationNumber + "&forename=" + forename + "&arriving=" + arriving + "&departing=" + departing + "&unitTypeId=" + unitTypeId + "&unitId=" + unitId + "&rateCodeId=" + rateCodeId;
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    var getbreakdown = function(resId){
        var apiUrl = "http://52.19.183.139:1234/api/getBreakdown?resId=" + resId;
        console.log(apiUrl);
        return $http.get(apiUrl);
    };
    var getplannerdata = function(fromDate, toDate){
        var apiUrl = "http://52.19.183.139:1234/api/getPlannerData?fromDate=" + fromDate + "&toDate=" + toDate;
        return $http.get(apiUrl);
    }
    return{
        getReservationsDeparting: getReservationsByDepartDate,
        method2: getReservationByArrivalDate,
        reservationsInHouse: getReservationsInHouse,
        checkInSingle: checkInIndividual,
        doSearch: searchReservations,
        cancelReservation: cancel,
        createReservation: newReservation,
        checkOut: checkout,
        getDate: getdate,
        getReservations: getreservations,
        showData: showdata,
        cancelAll: cancelall,
        getRoomsFromRoomType: getroomsbasedonroomtype,
        getAllSpecials: getallspecials,
        insertExtra: insertextra,
        deleteExtra: deleteextra,
        getReservationExtras: getreservationextras,
        getChargeBreakdown: getcharges,
        getTransactions: gettransactions,
        getTransactionCodes: gettransactioncodes,
        getBalanceToPay: getbalancetopay,
        insertPosting: insertposting,
        getPostings: getpostings,
        voidTransaction: voidtransaction,
        getInHouse: getinhouse,
        deleteExtraCharge: deleteextracharge,
        getConcurrentRooms: getconcurrentrooms,
        getNonConcurrentRooms: getnonconcurrentrooms,
        getDetailedAvailability: getdetailedavailability,
        getAllReservations: getallreservations,
        updateRes: updateres,
        getReservationsFull: getreservationsfull,
        getBreakDown: getbreakdown,
        getPlannerData: getplannerdata
    }
});

// app.factory("dashboard", function($http){
// var test = function(departDate){
// console.log("yeppers");
// console.log("Michael, what have I told you about yeppers?");
// };

// return{
// Test: test
// }
// });