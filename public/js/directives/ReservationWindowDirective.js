app.directive('reservationWindowModal', function(){
    return{
        template: '<div class="modal-dialog modal-lg modalFullHeight modalBox" role="document" ng-esc="goTest()" tabindex="0" id="resModal">\n' +
        '\t\t<div class="modal-content">\n' +
        '\t\t\t<div class="modal-header modal-header-primary">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t<div class="col-md-12 padBottom15">\n' +
        '\t\t\t\t\t\t<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>\n' +
        '\t\t\t\t\t\t<h4 class="modal-title white" id="myModalLabel">{{ selectedReservation.reservationname }} ({{ selectedReservation.idreservation }}) <span class="toPay">To Pay: £ {{balToPay}}</span></h4>\n' +
        '\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" id="modalHeaderButtons" style="text-align: center">\n' +
        '\t\t\t\t\t<div class="col-md-2">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton" ng-click="setModal(\'reservation\')">Reservation</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="col-md-2">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton" ng-click="setModal(\'breakdown\')">Breakdown</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="col-md-2">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton" ng-click="setModal(\'posting\')">Posting</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="col-md-2">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton" ng-click="getExtras(); setModal(\'specials\')">Other Charges</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="col-md-2">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton" ng-click="setModal(\'history\')">History</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="col-md-2 dropdown">\n' +
        '\t\t\t\t\t\t<button class="btn modalButton dropdown-toggle" type="button" data-toggle="dropdown">More..\n' +
        '\t\t\t\t\t\t\t<span class="caret"></span></button>\n' +
        '\t\t\t\t\t\t<ul class="dropdown-menu">\n' +
        '\t\t\t\t\t\t\t<!-- <li><a href ng-click="cancel(this.selectedReservation.idreservation)" data-dismiss="modal">Cancel..</a></li> -->\n' +
        '\t\t\t\t\t\t\t<li><a href ng-click="cancelQuestion()" data-dismiss="modal">Cancel..</a></li>\n' +
        '\t\t\t\t\t\t\t<li><a href ng-click="setModal(\'notes\')">Notes..</a></li>\n' +
        '\t\t\t\t\t\t\t<li><a href ng-click="setModal(\'events\')">Events..</a></li>\n' +
        '\t\t\t\t\t\t\t<li><a href ng-click="testModal()">Test Modal</a></li>\n' +
        '\t\t\t\t\t\t</ul>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modal-body-custom" ng-switch="modalContextOpen">\n' +
        '\t\t\t\t<div class="row" ng-switch-when="reservation">\n' +
        '\t\t\t\t\t<res-details-modal></res-details-modal>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="posting">\n' +
        '\t\t\t\t\t<div class="col-md-12">\n' +
        '\t\t\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t\t\t<posting-partial></posting-partial>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="breakdown" style="height: 100%">\n' +
        '\t\t\t\t\t<div class="col-md-12" style="height: 100%">\n' +
        '\t\t\t\t\t\t<div class="row" style="height: 100%">\n' +
        '\t\t\t\t\t\t\t<breakdown-partial></breakdown-partial>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="history">\n' +
        '\t\t\t\t\t<div class="col-md-12">\n' +
        '\t\t\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t\t\t<history-partial></history-partial>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="specials">\n' +
        '\t\t\t\t\t<extras-form></extras-form>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="notes">\n' +
        '\t\t\t\t\t<div layout="column" class="md-inline-form">\n' +
        '\t\t\t\t\t\t<md-content layout-gt-sm="row" style="background-color: transparent">\n' +
        '\t\t\t\t\t\t\t<md-input-container style="width:100%">\n' +
        '\t\t\t\t\t\t\t\t<label>Reservation Notes</label>\n' +
        '\t\t\t\t\t\t\t\t<textarea max-rows="10"></textarea>\n' +
        '\t\t\t\t\t\t\t</md-input-container>\n' +
        '\t\t\t\t\t\t</md-content>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div layout="column" class="md-inlirne-form">\n' +
        '\t\t\t\t\t\t<md-content layout-gt-sm="row" style="background-color: transparent">\n' +
        '\t\t\t\t\t\t\t<md-input-container style="width:100%">\n' +
        '\t\t\t\t\t\t\t\t<label>Check In Notes</label>\n' +
        '\t\t\t\t\t\t\t\t<textarea max-rows="10"></textarea>\n' +
        '\t\t\t\t\t\t\t</md-input-container>\n' +
        '\t\t\t\t\t\t</md-content>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div layout="column" class="md-inline-form">\n' +
        '\t\t\t\t\t\t<md-content layout-gt-sm="row" style="background-color: transparent">\n' +
        '\t\t\t\t\t\t\t<md-input-container style="width:100%">\n' +
        '\t\t\t\t\t\t\t\t<label>Check Out Notes</label>\n' +
        '\t\t\t\t\t\t\t\t<textarea max-rows="10"></textarea>\n' +
        '\t\t\t\t\t\t\t</md-input-container>\n' +
        '\t\t\t\t\t\t</md-content>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t<div class="pull-right">\n' +
        '\t\t\t\t\t\t<button class="btn btn-default">Save Notes</button>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<div class="row" ng-switch-when="events">\n' +
        '\t\t\t\t\t<div class="col-md-12">\n' +
        '\t\t\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t\t\t<span>events</span>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modal-footer">\n' +
        '\t\t\t\t<div class="pull-left">\n' +
        '\t\t\t\t\t<button class="btn modalButton"  ng-click="balanceQuestion()" data-dismiss="modal" ng-disabled="!allocated" ng-if="resTypeOptions.canCheckIn">Check In</button>\n' +
        '\t\t\t\t\t<button class="btn modalButton"  ng-click="checkOutQuestion(this)" data-dismiss="modal" ng-if="resTypeOptions.canCheckOut">Check Out</button>\n' +
        '\t\t\t\t\t<span ng-if="!allocated">You must allocate all rooms prior to check-in.</span>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t\t<button type="button" class="btn btn-default closeBtn" ng-click="updateReservation()" ng-if="!saveButtonDisabled" ng-disabled="resForm.$pristine">Save</button>\n' +
        '\t\t\t\t<button type="button" class="btn btn-default btnNegative choiceButtons closeBtn" data-dismiss="modal">Close</button>\n' +
        '\t\t\t</div>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '\n' +
        '\n' +
        '\t<div class="messageModal modalBox modal-small" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n' +
        '\t\t<div class="modalContent">\n' +
        '\t\t\t<div class="modalHeader modal-header-primary">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t<div class="col-md-12 padBottom15 noSidePad">\n' +
        '\t\t\t\t\t\t<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>\n' +
        '\t\t\t\t\t\t<h5 class="modal-title white" id="myModalLabel"><span style="font-size: 1.2em"><i class=\'fa fa-key\' aria-hidden=\'true\'></i></span> {{message.title }}</h4>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modalBody">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t{{ message.body }}\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modalFooter">\n' +
        '\n' +
        '\t\t\t\t<button type="button" class="btn btn-default choiceButtons closeBtn">OK</button>\n' +
        '\t\t\t</div>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '\n' +
        '\t<div class="decisionModal modalBox modal-small" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n' +
        '\t\t<div class="modalContent">\n' +
        '\t\t\t<div class="modalHeader modal-header-primary">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t<div class="col-md-12 padBottom15 noSidePad">\n' +
        '\t\t\t\t\t\t<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>\n' +
        '\t\t\t\t\t\t<h5 class="modal-title white" id="myModalLabel"><span style="font-size: 1.2em"><i class=\'fa fa-key\' aria-hidden=\'true\'></i></span> {{message.title }}</h4>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modalBody">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t{{ message.body }}\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modalFooter">\n' +
        '\t\t\t\t<button type="button" class="btn btn-default choiceButtons" ng-click="carryOutCancellation()">Yes</button>\n' +
        '\t\t\t\t<button type="button" class="btn btn-default choiceButtons" ng-click="closeModal()">No</button>\n' +
        '\t\t\t</div>\n' +
        '\t\t</div>',
        restrict: 'E',
        replace: false,
        link: function(scope,elem, attrs){
            scope.modalContextOpen = 'reservation';

            scope.setModal = function(state){
                scope.modalContextOpen = state;
            }

            scope.clearUnit = function(){
                console.log(thisReservation.unitDescription);
            }

            scope.goTest = function(){
                console.log("Testing");
            }
        }
    }
})