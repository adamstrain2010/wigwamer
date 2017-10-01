app.directive("extrasForm",function($compile, dashboard){
    return{
        restrict: 'E',
        replace: true,
        template: '<div class="row">\n' +
        '<div class="col-md-12">\n' +
        '<div class="col-md-3">\n' +
        '    <div class="form-group">\n' +
        '    <label>Charge</label>\n' +
        '    <select class="form-control" ng-model="chargeType" id="extrasSelect" ng-change="populateNext()" ng-options="extra as extra.extrasdescription for extra in extras">\n' +
        '</select>\n' +
        '</div>\n' +
        '<div class="form-group">\n' +
        '    <label>Quantity</label>\n' +
        '    <input class="form-control" type="number" min="1" ng-model="extrasQuantity">\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '    <button class="btn btn-default" ng-click="addExtraChargeToList()">Add</button>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-9">\n' +
        '    <div class="row">\n' +
        '    <div class="col-md-12">\n' +
        '        <div class="text-center" ng-show="!loaded">\n' +
        '           <i class="fa fa-circle-o-notch fa-spin loader" aria-hidden="true"></i>\n' +
        '        </div>\n' +
        '    <div ng-show="numRows == 0 && loaded" style="text-align: center"><h4>There are no Other Charges</h4></div>\n' +
        '    <div ng-show="numRows > 0 && loaded">' +
        '    <table class="table table-striped table-bordered ng-scope" style="table-layout: fixed; width: 100%">\n' +
        '    <thead>' +
        '        <th>Charge</th>\n' +
        '        <th>Qty</th>\n' +
        '        <th>Unit Price</th>\n' +
        '        <th>Sub Total</th>\n' +
        '        <th>Remove</th>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <tr ng-repeat="extraCharge in extraChargesToAdd">' +
        '            <td>{{extraCharge.extraDesc}}</td>' +
        '            <td>{{extraCharge.qty}}</td>\n' +
        '            <td>{{extraCharge.unitPrice}}</td>' +
        '            <td>{{extraCharge.subTotal}}</td>' +
        '            <td><i class="fa fa-times" aria-hidden="true" style="color: #FF9800" ng-click="removeRow(extraChargesToAdd, $index)"></i></td>' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '</table>\n' +
        '<div class="pull-right">\n' +
        '<button class="btn btn-default" ng-click="postExtrasToDB()">post</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>',
        link: function(scope, elem, attrs){
            function getExtras(){
                console.log("adam");
                dashboard.getAllSpecials()
                .then(function(data){
                    console.log(data);
                    if(data != null){
                        console.log(data.data.recordsets);
                        scope.extras = data.data.recordset;
                        console.log(scope.extras);
                        console.log("done");
                    }
                    else{
                        console.log("nada");
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
                .then(function(){
                    console.log("something");
                });
            }
            scope.loaded = false;
            var reservationId = scope.$parent.selectedReservation.idreservation;
            scope.numRows = scope.extraChargesToAdd.length;
            scope.addExtraChargeToList = function(){
                var toAdd = {"extraId": scope.chargeType.idextras, "extraDesc": scope.chargeType.extrasdescription ,"extraType": scope.chargeType, "qty": scope.extrasQuantity, "unitPrice": "£" + (2.2).toFixed(2), "subTotal": "£" + (scope.extrasQuantity * 2.2).toFixed(2)};
                scope.extraChargesToAdd.push(toAdd);
                scope.numRows = scope.extraChargesToAdd.length;
                scope.chargeType = "";
                scope.extrasQuantity = "";
                extrasSelect.focus();
            };
            scope.removeRow  = function(array, index){
                array.splice(index, 1);
                scope.numRows = scope.extraChargesToAdd.length;
            };
            scope.populateNext = function(){
                scope.extrasQuantity = 1;
            }
            scope.postExtrasToDB = function(){
                for(var i = 0; i < scope.extraChargesToAdd.length; i++){
                    console.log(scope.extraChargesToAdd[i]);
                    dashboard.insertExtra(scope.extraChargesToAdd[i], reservationId)
                    .then(function(result){
                        //do something here?
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                };
            }
            scope.getExtrasForReservation = function(){
                scope.extraChargesToAdd = [];
                dashboard.getReservationExtras(reservationId)
                .then(function(result){
                    scope.extraChargesToAdd = result.data.recordset;
                    scope.numRows = scope.extraChargesToAdd.length;
                    scope.loaded = true;
                })
                .then(function(){
                    getExtras();
                })
                .catch(function(err){
                    console.log(err);
                });
            }

            scope.getExtrasForReservation();
        }
    };
});


