app.directive('resDetailsModal', function(appService){
    return{
        template: '<div class="modal-dialog modal-lg modalFullHeight modalBox" role="document" esc-key="testing()">' +
        '<div class="col-md-12">\n' +
        '\t\t\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t\t\t<form name="resForm" ng-model="resForm">\n' +
        '\t\t\t\t\t\t\t\t<div class="col-md-3">\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
        '\t\t\t\t\t\t\t\t\t\t<label>Reservation Num:</label>\n' +
        '\t\t\t\t\t\t\t\t\t\t<input type="text" ng-model="thisReservation.reservationNumber" name="resId" disabled class="modalInput form-control">\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
        '\t\t\t\t\t\t\t\t\t\t<label>Surname:</label>\n' +
        '\t\t\t\t\t\t\t\t\t\t<input type="text" ng-model="thisReservation.surname" name="surname"  class="modalInput form-control">\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
        '\t\t\t\t\t\t\t\t\t\t<label>Forename</label>\n' +
        '\t\t\t\t\t\t\t\t\t\t<input type="text" ng-model="thisReservation.forename" name="forename" class="modalInput form-control">\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t<div class="col-md-3">\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group" id="whatever">\n' +
        '\t\t\t\t\t\t\t\t\t\t<!-- Date input -->\n' +
        '\t\t\t\t\t\t\t\t\t\t<label class="control-label" for="date">Arriving</label><br>\n' +
        '\t\t\t\t\t\t\t\t\t\t<md-datepicker ng-model="thisReservation.arriving" id="arrival" name="arrivingDate" class="" ></md-datepicker>\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group" id="whatever">\n' +
        '\t\t\t\t\t\t\t\t\t\t<!-- Date input -->\n' +
        '\t\t\t\t\t\t\t\t\t\t<label class="control-label" for="date">Departing</label><br>\n' +
        '\t\t\t\t\t\t\t\t\t\t<md-datepicker ng-model="thisReservation.departing" id="arrival" name="arrivingDate" class="" ></md-datepicker>\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t<div class="col-md-3">\n' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
        '\t\t\t\t\t\t\t\t\t\t<label>Room Type</label>\n' +
        '\t\t\t\t\t\t\t\t\t\t<select class="form-control" ng-model="thisReservation.unitTypeId" ng-options="unit.idunittype as unit.unittypedesc  for unit in unitTypes" ng-change="clearUnit()" style="margin-top:4px">\n' +
        '\t\t\t\t\t\t\t\t\t\t</select>\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '<div class="form-group">' +
        '<label>Unit</label><br>\n' +
        '                        <div>\n' +
        '                        <input class="form-control" type="text" readonly style="display: inline-block; width:70%" ng-model="thisReservation.unitDescription">\n' +
        '                        <button class="btn btn-warning" style="display: inline-block; min-width: 80px" ng-click="selectUnit()">\n' +
        '                            <i class="fa fa-bed" aria-hidden="true"></i>'+
        '                        </button>\n' +
        '                        </div>' +
        '</div>' +
        '\t\t\t\t\t\t\t\t\t<div class="form-group">\n' +
        '\t\t\t\t\t\t\t\t\t\t<label>Rate Code</label>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<select class="form-control" ng-model="thisReservation.rateCodeId" ng-options="ratecode.idratecode as ratecode.ratecodedesc for ratecode in ratecodes" style="margin-top:4px">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<option selected value="" disabled>Select a Rate Code</option>\n' +
        '\t\t\t\t\t\t\t\t\t\t</select>\n' +
        '\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t<div class="col-md-3">\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t</form>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>' +

        '</div>',
        restrict: 'E',
        replace: false,
        link: function(scope,elem, attrs){
            scope.selectUnit = function(){
                scope.rooms = [{},{}];
                console.log(scope);
                $("#resModal").css("display", "none");
                $("#roomSelectModal").css("display", "block");
            }

            scope.getUnits = function(){
                console.log("doing it");
                appService.getRoomTypes(1)
                    .then(function(data){
                        scope.unitTypes = data.data.recordset;
                        console.log(scope.unitTypes);
                    })
                    .then(function(){
                        appService.getRateCodes(1,1)
                            .then(function(data){
                                scope.ratecodes = data.data.recordset;
                            })
                            .catch(function(err){
                                console.log(err);
                            });
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }

            scope.clearUnit = function(){
                scope.thisReservation.unitDescription = null;
                scope.thisReservation.unitId = -2   ;
            }

            //scope.getUnits();
        }
    }
})