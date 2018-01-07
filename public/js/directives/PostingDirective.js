app.directive("postingPartial", function($rootScope,dashboard){
    return {
        restrict: 'E',
        replace: false,
        template: '<div class="row">\n' +
        '\t<div class="col-md-3">\n' +
        '\t\t<div class="form-group">\n' +
        '\t\t\t<label>Transaction Code:</label>\n' +
        '\t\t\t<select class="form-control" id="tranCodeSelect" ng-model="selectedTransCode" ng-change="showSelection" ng-options="transCode as transCode.transactiondescription for transCode in transCodes">\n' +
        '\t\t\t</select>\n' +
        '\t\t</div>\n' +
        '\t\t<div class="form-group">\n' +
        '\t\t\t<label>Value:</label>\n' +
        '\t\t\t<input class="form-control" ng-model="postingValue" type="number">\n' +
        '\t\t</div>\n' +
        '\t\t<div class="form-group">\n' +
        '\t\t\t<button class="btn btn-default" ng-click="postTransaction()">Post</button>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '\t<div class="col-md-9">\n' +
        '\t\t<div class="text-center" ng-show="!loaded">\n' +
        '\t\t\t<i class="fa fa-circle-o-notch fa-spin loader" aria-hidden="true"></i>\n' +
        '\t\t</div>\n' +
        '\t\t<div class="text-center" ng-show="numPostings == 0 && loaded">\n' +
        '\t\t\t<h4>No Postings.</h5>\n' +
        '\t\t</div>\n' +
        '\t\t<table class="table table-striped table-bordered" ng-show="loaded && numPostings > 0">\n' +
        '\t\t\t<thead>\n' +
        '\t\t\t\t<th>Date</th>\n' +
        '\t\t\t\t<th>Transaction Desc</th>\n' +
        '\t\t\t\t<th>Value</th>\n' +
        '\t\t\t\t<th>Void</th>\n' +
        '\t\t\t</thead>\n' +
        '\t\t\t<tbody>\n' +
        '\t\t\t\t<tr ng-repeat="transaction in transactions | filter:(!showVoids || undefined) && showVoids" ng-class="{\'voidedTrans\':transaction.void}">\n' +
        '\t\t\t\t\t<td>{{transaction.datetransaction}}</td>\n' +
        '\t\t\t\t\t<td>{{transaction.transactiondescription}}</td>\n' +
        '\t\t\t\t\t<td>£{{transaction.valuetransaction}}</td>\n' +
        '\t\t\t\t\t<td><i class="fa fa-times" aria-hidden="true" style="color: #FF9800" ng-click="voidTrans(transaction.idtransaction)" role="button" tabindex="0"></i></td>\n' +
        '\t\t\t\t</tr>\n' +
        '<tr style="font-weight: bold">' +
        '<td></td>' +
        '<td>Total:</td>' +
        '<td>£{{total}}</td>' +
        '<td></td>' +
        '</tr>' +
        '\t\t\t</tbody>\n' +
        '\t\t</table>\n' +
        '\t</div>\n' +
        '\t<div class="pull-right" class="form-group">' +
        '\t<label>Show Voids</label>' +
        '\t<input type="checkbox" ng-model="showVoids">' +
        '\t</div>\n' +
        '</div>',
        link: function(scope, elem, attrs){
            scope.showVoids = true;

            var chosenReservation = scope.$parent.selectedReservation.idreservation;
            scope.loaded = false;
            scope.numPostings = 0;

            scope.transCodes = [];
            scope.transactions = [];


            scope.showSelection = function(){
                console.log(this);
            };

            scope.getTransactions = function(){
                dashboard.getTransactions(chosenReservation)
                    .then(function(result){
                        console.log("adam");
                        scope.loadPostings();
                    })
                    .then(function(){
                        console.log("yep");
                        scope.getTotal();
                    })
                    .then(function(){
                        scope.loaded = true;
                    })
                    .then(function(){
                        scope.getTransactionCodes();
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };



            //scope.getTransactions();

            scope.getTransactionCodes = function(){
                dashboard.getTransactionCodes(1)
                    .then(function(result){
                        scope.transCodes = result.data.recordset;
                    })
                    .catch(function(err){
                        console.log(err);

                    });
            }

            scope.getTotal = function(){
                scope.total = 0;
                for(var i = 0; i < scope.transactions.length; i++){
                    console.log(scope.transactions[i].valuetransaction);
                    scope.total += scope.transactions[i].valuetransaction;
                }
                scope.transactions.forEach(function(r){r.valuetransaction = r.valuetransaction.toFixed(2)})
                scope.total = scope.total.toFixed(2);
            }

            scope.loadPostings = function(){
                dashboard.getPostings(scope.$parent.selectedReservation.idreservation)
                    .then(function(result){
                        console.log(result.data.recordset);
                        scope.transactions = result.data.recordset;
                        scope.transactions.forEach(function(r){ r.datetransaction = moment(r.datetransaction).format("DD/MM/YY"), r.valuetransaction = r.valuetransaction});
                        scope.numPostings = scope.transactions.length;
                        scope.loaded = true;
                    })
                    .then(function(){
                        scope.getTotal();
                    })
                    .then(function(){
                        scope.getTransactionCodes();
                    })
                    .then(function(){
                        $rootScope.getBalanceToPay(scope.$parent.selectedReservation.idreservation);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }

            scope.loadPostings();


            scope.voidTrans = function(idTrans){
                if(this.transaction.void == true){
                    return;
                }
                else{
                    dashboard.voidTransaction(idTrans)
                        .then(function(){
                            scope.loadPostings();
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
            }

            scope.getPostings = function(){
                dashboard.getPostings(scope.$parent.selectedReservation.idreservation)
                    .then(function(result){
                        // console.log(result.data.recordset);
                        // scope.transactions = result.data.recordset;
                        // scope.transactions.forEach(function(r){ r.datetransaction = moment(r.datetransaction).format("DD/MM/YY")});
                        // scope.numPostings = scope.transactions.length;
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }


            scope.postTransaction = function(){
                console.log($rootScope);
                var valToPost = 0;
                if(scope.selectedTransCode.negative == "Y"){
                    valToPost = this.postingValue * -1;
                }
                else if(scope.selectedTransCode.negative == "N"){
                    valToPost = this.postingValue;
                }
                dashboard.insertPosting(scope.$parent.selectedReservation.idclient[0],scope.$parent.selectedReservation.idproperty, scope.$parent.selectedReservation.idreservation, this.selectedTransCode.idtransactioncode, valToPost.toFixed(2), 0, $rootScope.globalSystemDate.format("YYYY-MM-DD"))
                    .then(function(){
                        scope.loadPostings();
                    })
                // var transasctionToAdd = {"datetransaction": moment($rootScope.globalSystemDate).format("DD/MM/YYYY"), "transactiondescription":this.selectedTransCode.transactiondescription, "valuetransaction":"£" + valToPost.toFixed(2)};
                // console.log(this.selectedTransCode.idtransaction);
                // console.log(this.selectedTransCode);
                // scope.transactions.push(transasctionToAdd);
                scope.numPostings = scope.transactions.length;
                scope.postingValue = "";
                scope.selectedTransCode = "";
                $("#tranCodeSelect").focus();
            }
        }
    }

});