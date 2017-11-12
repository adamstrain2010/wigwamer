app.directive("allocationsList", function(dashboard, $rootScope){
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="row">\n' +
        '<div class="col-md-12" style="text-align: center; padding-top: 20px;" ng-if="loading">' +
        '<i class="fa fa-circle-o-notch fa-spin" style="font-size: 10em; color: rgba(255, 156,0,0.35)" aria-hidden="true"></i>' +
        '</div>' +
        '<div class="col-md-12" ng-if="!loading">\n' +
        '<table class="table table-striped table-bordered">' +
        '<thead>' +
        '<tr>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'idreservation\'; sortReverse = !sortReverse;" style="color: white">#<span ng-show="sortType == \'idreservation\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'idreservation\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +

        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'reservationname\'; sortReverse = !sortReverse;" style="color: white">Name<span ng-show="sortType == \'reservationname\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'reservationname\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'fromdate\'; sortReverse = !sortReverse;" style="color: white">Arrival Date<span ng-show="sortType == \'fromdate\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'fromdate\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'todate\'; sortReverse = !sortReverse;" style="color: white">Departure Date<span ng-show="sortType == \'todate\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'todate\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'unittypedesc\'; sortReverse = !sortReverse;" style="color: white">Unit Type<span ng-show="sortType == \'unittypedesc\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'unittypedesc\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" ng-click="sortType = \'unitdescription\'; sortReverse = !sortReverse;" style="color: white">Unit<span ng-show="sortType == \'unitdescription\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'unitdescription\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="background-color:#ff9800; color: white"><a href="#" >Actions</a></th>' +
        '</tr>' +
        // '<tr ng-repeat="reservation in reservations | filter:{ unitdescription: allocatedFilter}">' +
        '<tr ng-repeat="reservation in reservations | filter:{ unitdescription: allocatedFilter, idunittype: selectedUnitType.idunittype} | orderBy:sortType:sortReverse">' +
        '<td class="modalInput">{{reservation.idreservation}}</td>' +
        '<td class="modalInput">{{reservation.reservationname}}</td>' +
        '<td class="modalInput">{{reservation.fromdate}}</td>' +
        '<td class="modalInput">{{reservation.todate}}</td>' +
        '<td class="modalInput">{{reservation.unittypedesc}}</td>' +
        '<td class="modalInput">{{reservation.unitdescription}}</td>' +
        // '<td class="modalInput"><button class="info btn btn-warning" ng-click="showRoomSelectModal()">SELECT</button></td>' +
        '<td class="modalInput"><button class="info btn btn-warning" ng-click="showRoomSelectModal(selectedReservation.idunittype)">SELECT</button><button class="info btn btn-default margin-left-10" ng-click="clearAllocation(reservation.idreservation)">CLEAR</button></td>' +
        '</tr>' +
        '</thead>' +
        '</table>' +
        '</div>' +
        '<div class="modalBack">' +
        '<room-select style="display:none"></room-select>' +
        '</div>',

        link: function (scope, elem, attrs) {
            scope.loading = true;

            scope.sortReverse = false;
            scope.sortType = 'idreservation';

            var enumerateDaysBetweenDates = function(startDate, endDate) {
                startDate = moment(startDate);
                endDate = moment(endDate);

                var now = startDate.clone(), dates = [];

                while (now.isBefore(endDate)) {
                    dates.push(now.format('M/D/YYYY'));
                    now.add('days', 1);
                }
                console.log(dates);
                return dates;
            };

            scope.getRes = function(runDate){
                scope.loading = true;
                dashboard.getReservations(runDate)
                .then(function(response){
                    scope.reservations = response.data[0][0];
                    scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")})
                    })
                    .then(function(){
                        scope.loading = false;
                    })
            }

            scope.show = function(){
                scope.selectedReservation = this.reservation;
                console.log(scope);
                scope.updateList();
                enumerateDaysBetweenDates('2017-06-13','2017-06-16');
                console.log(this.reservation.fromdate);
                console.log(this.reservation.todate);
                $("#roomSelectModal").css("display", "block");
                $(".modalBack").css("display", "block");
            }

            scope.updateReservations = function(arrivalDate){
                scope.getRes(arrivalDate);
            }

            scope.reservations = [{"adam":20},{"adam":20},{"adam":20},{"adam":20},{"adam":20}]
        }
    }
})