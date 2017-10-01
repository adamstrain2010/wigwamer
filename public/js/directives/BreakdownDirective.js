app.directive("breakdownPartial",function(dashboard){
    return{
        restrict: 'E',
        replace: false,
        template: '<div>\n' +
        '    <table class="table table-striped table-bordered">\n' +
        '        <thead>\n' +
        '            <th>Charge Date</th>\n' +
        '            <th>Description</th>\n' +
        '            <th>Value</th>\n' +
        '            <th>Void</th>\n' +
        '        </thead>\n' +
        '        <tbody>\n' +
        '            <tr ng-repeat="chargeRow in chargeRows">\n' +
        '                <td>{{chargeRow.chargedate}}</td>\n' +
        '                <td>{{chargeRow.transactiondescription}}</td>\n' +
        '                <td>{{chargeRow.gross}}</td>\n' +
        '                <td></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>',
        link: function(scope, elem, attrs){
            function getChargesForReservation(reservationId){
                dashboard.getChargeBreakdown(reservationId)
                .then(function(data){
                    scope.chargeRows = data.data[0][0];
                    scope.chargeRows.forEach(function(r){ r.chargedate = moment(r.chargedate).format("DD/MM/YY")});
                    console.log(scope.chargeRows);
                })
                .catch(function(err){
                    console.log(err);
                })
            }

            getChargesForReservation(scope.$parent.selectedReservation.idreservation);
        }
    };
});


