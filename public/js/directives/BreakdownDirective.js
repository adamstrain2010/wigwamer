app.directive("breakdownPartial",function(dashboard){
    return{
        restrict: 'E',
        replace: true,
        template: '<div style="height: 100%"><div><div class="text-center" ng-show="!loaded"><i class="fa fa-circle-o-notch fa-spin loader" aria-hidden="true"></i></div></div>' +
        '<div style="height: 100%; overflow-y: scroll">' +
        '    <table class="table table-striped table-bordered" ng-show="loaded">\n' +
        '        <thead>\n' +
        '            <th>Date</th>\n' +
        '            <th>Room Type</th>\n' +
        '            <th>Room</th>\n' +
        '            <th>Rate Code</th>\n' +
        '            <th>PAX</th>\n' +
        '            <th>Value</th>\n' +
        '        </thead>\n' +
        '        <tbody>\n' +
        '            <tr ng-repeat="chargeRow in chargeRows">\n' +
        '                <td>{{chargeRow.chargedate}}</td>\n' +
        '                <td>Double</td>\n' +
        '                <td></td>\n' +
        '                <td>BAR</td>\n' +
        '                <td>1</td>\n' +
        '                <td>{{chargeRow.gross}}</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>' +
        '</div>',
        link: function(scope, elem, attrs){
            scope.loaded = false;

            scope.editRate = function(el){
                console.log(el);
                scope.editing = !scope.editing;
            }
            scope.editPax = function(el){
                console.log(el);
                scope.editing = !scope.editing;
            }
            scope.editing = false;
            function getChargesForReservation(reservationId){
                dashboard.getChargeBreakdown(reservationId)
                .then(function(data){
                    console.log(data);
                    scope.chargeRows = data.data[0][0];
                    scope.chargeRows.forEach(function(r){ r.chargedate = moment(r.chargedate).format("DD/MM/YY")});
                    scope.chargeRows.forEach(function(r){ r.gross = "£" + r.gross.toFixed(2)});
                    console.log(scope.chargeRows);
                    scope.loaded = true;
                })
                .catch(function(err){
                    console.log(err);
                })
            }

            scope.show = function(){
                console.log(this);
            }
            getChargesForReservation(scope.$parent.selectedReservation.idreservation);
        }
    };
});


