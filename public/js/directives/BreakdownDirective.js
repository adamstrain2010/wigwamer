app.directive("breakdownPartial",function(dashboard){
    return{
        restrict: 'E',
        replace: false,
        template: '<div><div class="text-center" ng-show="!loaded"><i class="fa fa-circle-o-notch fa-spin loader" aria-hidden="true"></i></div>' +
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
        '                <td ng-dblclick="editPax(this)"><span ng-show="!editing" ng-model="pax">1</span><span ng-show="editing"><input type="number" ng-model="pax"></span></td>\n' +
        '                <td ng-dblclick="editRate(this)"><span ng-show="!editing">{{chargeRow.gross}}</span><span ng-show="editing"><input type="number" ng-model="chargeRow.gross"></span></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
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


