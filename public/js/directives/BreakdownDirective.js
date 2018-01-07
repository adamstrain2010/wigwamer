app.directive("breakdownPartial",function(dashboard){
    return{
        restrict: 'E',
        replace: true,
        template: '<div style="height: 100%"><div>' +
        '<div class="row">' +
        '<div class="col-md-12">' +
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="chargeShow.chargeType" value="" checked>All</label>\n' +
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="chargeShow.chargeType" value="accommodation">Accommodation</label>\n' +
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="chargeShow.chargeType" value="payment">Payments</label>\n' +
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="chargeShow.chargeType" value="postings">Postings</label>\n' +
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="chargeShow.chargeType" value="extra">Extras</label>\n' +
        '</div>' +
        '</div>' +
        '<div class="text-center" ng-show="!loaded"><i class="fa fa-circle-o-notch fa-spin loader" aria-hidden="true"></i></div></div>' +
        '<div style="height: 100%; overflow-y: scroll">' +
        '    <table class="table table-striped table-bordered" ng-show="loaded">\n' +
        '        <thead>\n' +
        '            <th>Date</th>\n' +
        '            <th>Type</th>\n' +
        '            <th>Description</th>\n' +
        '            <th>Value</th>\n' +
        '<th>Posted</th>' +
        '        </thead>\n' +
        '        <tbody>\n' +
        '            <tr ng-repeat="chargeRow in chargeRows | filter:{chargeType: chargeShow.chargeType}">\n' +
        '                <td>{{chargeRow.date}}</td>\n' +
        '                <td>{{chargeRow.chargeType}}</td>\n' +
        '                <td>{{chargeRow.description}}</td>\n' +
        '                <td>£{{chargeRow.value}}</td>\n' +
        '                <td><i ng-show="!chargeRow.posted" class="fa fa-times" aria-hidden="true"></i><i ng-show="chargeRow.posted" style="color: orange" class="fa fa-check" aria-hidden="true"></i></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>' +
        '</div>',
        link: function(scope, elem, attrs){
            scope.loaded = false;

            scope.chargeShow = {"chargeType" : ""};

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
                dashboard.getBreakDown(reservationId)
                    .then(function(result){
                        scope.chargeRows = result.data.recordset;
                        scope.chargeRows.forEach(function(r){r.date = r.date == null ? '' : moment(r.date).format("DD/MM/YYYY"); r.value = r.value.toFixed(2); r.posted = r.posted.toUpperCase() == 'N' ? false : true})
                        console.log(scope.chargeRows);
                        scope.loaded = true;
                    })
                    .catch(function(err){
                        console.log(err);
                    })

                // dashboard.getChargeBreakdown(reservationId)
                // .then(function(data){
                //     console.log(data);
                //     scope.chargeRows = data.data[0][0];
                //     scope.chargeRows.forEach(function(r){ r.chargedate = moment(r.chargedate).format("DD/MM/YY")});
                //     scope.chargeRows.forEach(function(r){ r.gross = "£" + r.gross.toFixed(2)});
                //     console.log(scope.chargeRows);
                //     scope.loaded = true;
                // })
                // .catch(function(err){
                //     console.log(err);
                // })
            }

            scope.show = function(){
                console.log(this);
            }
            getChargesForReservation(scope.$parent.selectedReservation.idreservation);
        }
    };
});


