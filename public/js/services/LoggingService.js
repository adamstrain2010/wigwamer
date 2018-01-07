app.factory("logger", function($http){
    var logchange = function(idproperty, idclient,resid, detail, from, to, iduser, insertdate){
        var apiUrl = 'http://52.19.183.139:1234/api/logChange?idProperty=' + idproperty + "&idClient=" + idclient + "&resId=" + resid + "&detail=" + detail + "&from=" + from + "&to=" + to + "&idUser=" + iduser + "&insertDate=" + insertdate;
        console.log(apiUrl);
        return $http.post(apiUrl);
    };
    return{
        logChange: logchange
    }
});

