app.directive("hkSelectModal", function(dashboard, $rootScope, housekeeping){
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="row">\n' +
        '        <div class="col-md-4 col-md-offset-4" style="background-color: orange; margin-top: 80px;padding-bottom: 40px">\n' +
        '            <div class="row" style="padding-top: 10px">\n' +
        '                <button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">×</span></button>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-12" style="text-align: center">\n' +
        '                    <h4 style="color: white">Select Housekeeping Status</h4>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-8 col-md-offset-2" style="text-align: center;" ng-click="setCleanStatus(1)">\n' +
        '                    <span class=""><h5 class="selectChoice" >DIRTY</h5></span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-8 col-md-offset-2" style="text-align: center;" ng-click="setCleanStatus(2)">\n' +
        '                    <span class=""><h5 class="selectChoice" >HOUSEKEEPER IN UNIT</h5></span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-8 col-md-offset-2" style="text-align: center;" ng-click="setCleanStatus(3)">\n' +
        '                    <span class=""><h5 class="selectChoice" >INSPECTION REQUIRED</h5></span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col-md-8 col-md-offset-2" style="text-align: center;" ng-click="setCleanStatus(4)">\n' +
        '                    <span class=""><h5 class="selectChoice" >CLEAN</h5></span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>',

        link: function (scope, elem, attrs) {
            scope.selectedunit = null;

            function hideModals(){
                $(".modalBack").css("display", "none");
                $("#roomSelectModal").css("display", "none");
            }

            $('.closeBtn').click(function(){
                hideModals();
            })

            scope.openHKSelectModal = function(el){
                scope.selectedunit = el.unit.idunit;
                console.log(scope.selectedunit);
                $(".modalBack").css("display", "block");
            }
            scope.setCleanStatus = function(statusId){
                console.log(scope);
                scope.loaded = false;
                housekeeping.setStatus(scope.selectedunit, statusId)
                    .then(function(result) {
                        housekeeping.getHKUnits(scope.systemDate)
                            .then(function (unitData) {
                                scope.units = unitData.data.recordsets[0];
                                scope.units.forEach(function (r) {
                                    if (r.idreservation != null) {
                                        r.fromdate = moment(r.fromdate).format("DD/MM/YYYY");
                                        r.todate = moment(r.todate).format("DD/MM/YYYY");
                                    }
                                    if(r.residreservation != null){
                                        r.resfromdate = moment(r.resfromdate).format("DD/MM/YYYY");
                                        r.restodate = moment(r.restodate).format("DD/MM/YYYY");
                                    }
                                })
                                hideModals();
                                scope.loaded = true;
                            })
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }
        }
    }
})