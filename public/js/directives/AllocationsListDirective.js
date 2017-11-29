app.directive("allocationsList", function(dashboard, $rootScope){
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="row">\n' +
        '<div class="col-md-12" style="text-align: center; padding-top: 20px;" ng-if="loading">' +
        '<i class="fa fa-circle-o-notch fa-spin" style="font-size: 10em; color: rgba(255, 156,0,0.35)" aria-hidden="true"></i>' +
        '</div>' +
        '<div class="col-md-12" style="text-align: center; padding-top: 20px;" ng-if="!loading && (toAllocateCount == 0 && !test)">' +
        '<h3>Nothing To Allocate</h3>' +
        '</div>' +
        '<div class="col-md-12" ng-if="!loading">\n' +
        '<table class="table table-striped table-bordered" ng-if="!loading && (toAllocateCount > 0 || test)">' +
        '<tr>' +
        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'idreservation\'; sortReverse = !sortReverse;" class="noFingerLink">Reservation #<span ng-show="sortType == \'idreservation\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'idreservation\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +

        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'reservationname\'; sortReverse = !sortReverse;" class="noFingerLink">Reservation Name<span ng-show="sortType == \'reservationname\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'reservationname\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'fromdate\'; sortReverse = !sortReverse;" class="noFingerLink">Arrival Date<span ng-show="sortType == \'fromdate\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'fromdate\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'todate\'; sortReverse = !sortReverse;" class="noFingerLink">Departure Date<span ng-show="sortType == \'todate\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'todate\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'unittypedesc\'; sortReverse = !sortReverse;" class="noFingerLink">Unit Type<span ng-show="sortType == \'unittypedesc\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'unittypedesc\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="color:#ff9800"><a href="#" ng-click="sortType = \'unitdescription\'; sortReverse = !sortReverse;" class="noFingerLink">Unit<span ng-show="sortType == \'unitdescription\' && sortReverse == false" class="fa fa-caret-down" style="color: white"></span><span ng-show="sortType == \'unitdescription\' && sortReverse == true" class="fa fa-caret-up ng-hide" style="color: white"></span></a></th>' +
        '<th style="color:#ff9800"><a href="#" class="noFingerLink"  >Actions</a></th>' +
        '</tr>' +
        // '<tr ng-repeat="reservation in reservations | filter:{ unitdescription: allocatedFilter}">' +
        '<tr ng-repeat="reservation in reservations | filter:{ unitnumber: allocatedFilter, idunittype: selectedUnitType.idunittype} | orderBy:sortType:sortReverse">' +
        '<td class="modalInput">{{reservation.idreservation}}</td>' +
        '<td class="modalInput">{{reservation.reservationname}}</td>' +
        '<td class="modalInput">{{reservation.fromdate}}</td>' +
        '<td class="modalInput">{{reservation.todate}}</td>' +
        '<td class="modalInput">{{reservation.unittypedesc}}</td>' +
        '<td class="modalInput">{{reservation.unitnumber}}</td>' +
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
                    scope.toAllocateCount = 0;
                    angular.forEach(scope.reservations, function(res){
                        console.log(res);
                        if(res.idunit == null){
                            scope.toAllocateCount +=  1;
                        }

                    })
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