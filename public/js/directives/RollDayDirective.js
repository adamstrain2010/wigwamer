var test;

app.directive("rollDay",function(appService, $rootScope){
    return{
        restrict: 'E',
        replace: true,
        template: '<div class="rollBox">' +
        '<h4 style="color: white">End of Day Check List</h4>' +
        '<ul class="noDec">' +
        '<li ng-repeat="stage in stages">' +
        '<span class="checkRollItem" ng-class="stage.checked ? \'proven\' : \'notProven\'">{{stage.text}}<i class="fa fa-check padding-left-10" aria-hidden="true" ng-if="stage.complete"></i><i class="fa fa-times padding-left-10" aria-hidden="true" ng-if="!stage.complete"></i></span>' +
        '</li>' +
        '</ul>' +
        '<button class="btn btn-default" ng-if="!checkAllValid && allComplete">Recheck</button>' +
        '' +

        '</div>',
        link: function(scope, elem, attrs){
            var dateToRoll;
            scope.checkAllValid = true;
            scope.allComplete = false;
            console.log("hello");
            appService.getSystemDate()
                .then(function(result){
                    dateToRoll = new moment(result.data.recordsets[0][0].systemdate).format("YYYY-MM-DD");
                    console.log(dateToRoll);
                })
                .then(function(){
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
                            var i = 1
                            var id = window.setInterval(function(){
                                if(i >= scope.stages.length) {
                                    clearInterval(id);
                                    return;
                                }
                                if(scope.stages[i].complete == false){
                                    scope.checkAllValid = false;
                                }
                                if(i == scope.stages.length - 1){
                                    console.log("wahoo!");
                                    scope.allComplete = true;
                                }
                                scope.stages[i].checked = true;
                                console.log(scope.stages[i]);
                                console.log(i);
                                scope.$apply();
                                i++;
                            }, 1000)
                        }, function(){
                            console.log("here");
                        })
                        .catch(function(err){
                            console.log(err);
                        });

                })
                .catch(function(err){
                    console.log(err);
                })

            scope.arrivals = {"text": "Arrivals Processed","complete": false, "checked": false}
            scope.departures = {"text": "Departures Processed","complete": true, "checked": false}
            scope.changes = {"text": "Room Changes Processed","complete": true, "checked": false}
            scope.shifts = {"text": "All Shifts Processed","complete": true, "checked": false}

            scope.stages = [scope.arrivals, scope.departures, scope.changes, scope.shifts];

        }
    };
});
