app.directive("rollDay",function($rootScope, $mdDialog, $route, appService){
    return{
        restrict: 'E',
        replace: false,
        template:
        '<div class="rollBox">\n' +
        '<div class="row">' +
        '<div class="col-md-12">' +
        '<h3 class="modal-title white text-center" style="margin-right: 10px">End of Day Check List</h3>' +
        '</div>' +
        '</div>' +
        '    <div class="row"  ng-repeat="checkItem in checkItems">' +
        '        <div class="col-md-6 col-md-offset-3">' +
        '            <div class="checkRollItem" ng-class="{\'proven\': checkItem.proven, \'notProven\': !checkItem.proven}">' +
        '               {{checkItem.title}}<i class="fa fa-check padding-left-10" ng-show="checkItem.passed" aria-hidden="true"></i><i class="fa fa-times padding-left-10" ng-show="!checkItem.passed" aria-hidden="true"></i>' +
        '            </div>' +
        '        </div>' +
        '     </div>' +
        '   <div class="row">' +
        '       <div class="col-md-6 col-md-offset-3" style="text-align:center; margin-top: 30px">' +
        '           <button ng-click="nextRollStage()" class="btn btn-default" style="margin-right: 10px" ng-class="{\'complete\': complete, \'notComplete\': !complete}">Proceed to Roll Day</button>' +
        '       </div>' +
        '   </div>' +
        // '   <div class="row">' +
        // '       <div class="col-md-6 col-md-offset-3" style="text-align:center; margin-top: 30px">' +
        // '           <button ng-click="check()" class="btn btn-default" style="margin-right: 10px">Check</button>' +
        // '       </div>' +
        // '   </div>' +
        '</div>',
        link: function(scope, elem, attrs){
            scope.checkItems = [{"name":"arrivals","title":"Arrivals Processed", "proven": false, "passed": false},{"name":"departures","title":"Departures Processed","proven": false, "passed": false},{"name":"changes","title":"Room Changes Processed","proven": false,"passed": false},{"name":"shifts","title":"All Shifts Processed", "proven": false, "passed": false}]

            scope.recheck = false;

            scope.complete = false;

            scope.rollComplete = true;

            var els = document.getElementsByClassName("checkRollItem");
            function doTimeout(el, m){

                setTimeout(function(){
                    console.log(m);
                    if(m == 1){
                        scope.rollComplete = true;
                        appService.checkArrivalsProcessed($rootScope.globalSystemDate.format("YYYY-MM-DD"))
                            .then(function(data){
                                console.log(data);
                                if(data.data[0][0].length != 0){
                                    scope.rollComplete = false;
                                    //alert("You still have arrivals to process.")
                                    //return;
                                }
                                else{
                                    scope.checkItems[m -1].passed = true;

                                }
                                scope.checkItems[m -1].proven = true;
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        }
                    if(m != 5 && m != 1){
                        scope.$apply(function(){
                            scope.checkItems[m -1].passed = true;
                            scope.checkItems[m -1].proven = true;
                        });
                    }
                    else if(m == 5){
                        if(scope.rollComplete == true){
                            scope.$apply(function(){
                                scope.complete = true;
                            })
                        }
                        else{
                            scope.recheck = true;
                            document.getElementsByClassName("btn-default")[0].innerHTML = "Recheck";
                            $(".checkRollItem").css("color", "rgb(204, 122, 0");
                            scope.$apply(function(){
                                scope.complete = true;
                            });
                            scope.checkInMessage("Please remedy issues listed above, prior to rolling the day.");
                        }
                    }
                },1000 * m);


            }

            for(var i = 0; i < 4 + 1; i++){
                doTimeout(els[i], i + 1);
            }

            scope.nextRollStage = function(ev) {
                if (scope.recheck == false) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure?')
                        .textContent('Rolling the day cannot be undone. Do you definitely want to roll the day?')
                        .ariaLabel('Do you definitely want to roll the day?')
                        .targetEvent(ev)
                        .cancel('No')
                        .ok('Yes')

                    //$(".modalBack").css("display", "none");
                    $mdDialog.show(confirm).then(function () {
                        $rootScope.rollDay();
                    }, function () {
                        scope.recheck = true;
                        document.getElementsByClassName("btn-default")[0].innerHTML = "Recheck";
                        $(".checkRollItem").css("color", "rgb(204, 122, 0");
                    });
                }
                else {
                    $route.reload();
                }
            }


}}})