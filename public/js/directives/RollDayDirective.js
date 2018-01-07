var test;

app.directive("rollDay",function(appService, $rootScope, dashboard,$mdDialog){
    return{
        restrict: 'E',
        replace: true,
        template: '<div class="rollBox">' +
        '<div class="rollInner" ng-show="checking">"' +
        '<h4 style="color: white">End of Day Check List</h4>' +
        '<ul class="noDec">' +
        '<li ng-repeat="stage in stages">' +
        '<span class="checkRollItem" ng-class="stage.checked ? \'proven\' : \'notProven\'">{{stage.text}}<i class="fa fa-check padding-left-10" aria-hidden="true" ng-if="stage.complete"></i><i class="fa fa-times padding-left-10" aria-hidden="true" ng-if="!stage.complete"></i></span>' +
        '</li>' +
        '</ul>' +
        '<button class="btn btn-default" ng-show="!checkAllValid && allComplete" ng-click="checkRoll()">Recheck</button>' +
        '<button class="btn btn-default" ng-show="checkAllValid && allComplete" ng-click="rollDay()">Roll Day</button>' +
        '</div>' +
        '<div class="rollInner" ng-show="!checking">"' +
        '<h4 style="color: white">Rolling Day</h4>' +
        '<ul class="noDec">' +
        '<li ng-repeat="stage in rollingStages">' +
        '<span class="checkRollItem" ng-class="proven">{{stage.text}}<i class="fa fa-check padding-left-10" aria-hidden="true"></i></span>' +
        '</li>' +
        '</ul>' +
        '<button class="btn btn-default" ng-show="rollComplete" ng-click="changeDay()">OK</button>' +
        '</div>' +
        '</div>',
        link: function(scope, elem, attrs){
            var dateToRoll;
            scope.checkAllValid = true;
            scope.allComplete = false;
            scope.checking = true;
            console.log("hello");
            appService.getSystemDate()
                .then(function(result){
                    dateToRoll = new moment(result.data.recordsets[0][0].systemdate).format("YYYY-MM-DD");
                    console.log(dateToRoll);
                })
                .then(function(){
                    scope.checkRoll();


                })
                .catch(function(err){
                    console.log(err);
                })

            scope.arrivals = {"text": "Arrivals Processed","complete": false, "checked": false}
            scope.departures = {"text": "Departures Processed","complete": false, "checked": false}
            scope.changes = {"text": "Room Changes Processed","complete": true, "checked": false}
            scope.shifts = {"text": "All Shifts Processed","complete": true, "checked": false}

            scope.stages = [scope.arrivals, scope.departures, scope.changes, scope.shifts];


            scope.accommodation = {"text": "Accommodation Posted","complete": false};

            scope.rollingStages = [scope.accommodation];

            scope.rollComplete = true;

            scope.rollDay = function(){
                scope.checkOutQuestion();
            }

            scope.checkOutQuestion = function(ev){
                var confirm = $mdDialog.confirm()
                    .title('Roll Day')
                    .textContent('Are you sure you want to roll the day? Once done this cannot be reversed.')
                    .ariaLabel('Are you sure you want to roll the day? Once done this cannot be reversed')
                    .targetEvent(ev)
                    .cancel('No')
                    .ok('Roll Day')

                $(".modalBack").css("display", "none");
                $mdDialog.show(confirm).then(function() {
                    appService.rollDay();
                    scope.checking = false;
                }, function() {
                    $(".modalBack").css("display", "block");
                });
            }

            scope.changeDay = function(){
                var alert = $mdDialog.alert()
                    .title('Day Roll Complete')
                    .textContent('The day has been successfully rolled. You will now be redirected to the login screen.')
                    .ariaLabel('The day has been successfully rolled. You will now be redirected to the login screen.')
                    .ok('OK')

                $mdDialog.show(alert)
                    .then(function(){
                        window.location.href = "/";
                    })
            }

            scope.checkRoll = function(){
                scope.allComplete = false;
                scope.checkAllValid = true;
                scope.arrivals.complete = false;
                scope.departures.complete = false;
                scope.departures.checked = false;
                scope.departures.checked = false;

                appService.checkArrivalsProcessed(dateToRoll)
                    .then(function(result){
                        var numReservations = result.data[0][0].length;
                        if(numReservations === 0){
                            scope.arrivals.complete = true;
                        }
                        else{
                            scope.checkAllValid = false;
                        }
                    })
                    .then(function(){
                        scope.arrivals.checked = true;
                    })
                    .then(function(){
                        dashboard.getReservationsDeparting(dateToRoll)
                            .then(function(result){
                                var numReservations = result.data[0][0].length;
                                if(numReservations === 0){
                                    scope.departures.complete = true;
                                }
                                else{
                                    scope.checkAllValid = false;
                                }
                            })
                            .then(function(){
                                scope.departures.checked = true;
                            })

                    })
                    .then(function(){
                        scope.allComplete = true;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        }
    };
});
