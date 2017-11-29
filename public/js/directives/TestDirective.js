app.directive('testDirective', function(){
    return{
        template: '<div class="modal-dialog modal-lg modalFullHeight modalBox" role="document" esc-key="testing()" id="resModal">\n' +
        '\t\t<div class="modal-content">\n' +
        '\t\t\t<div class="modal-header modal-header-primary">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t<div class="col-md-12 padBottom15">\n' +
        '\t\t\t\t\t\t<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>\n' +
        '\t\t\t\t\t\t<h4 class="modal-title white" id="myModalLabel">Filters</h4>\n' +
        '\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '\t\t\t<div class="modal-body-custom">\n' +
        '<div class="row">' +

        '<div class="col-md-2">' +
        '<fieldset>' +
        '<legend>Reservation Status</legend>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.res">Reservation</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.cxl">Cancellation</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.dna">Did Not Arrive</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.cin">Checked In</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.cko">Checked Out</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.cty">City Ledger</label></div>' +
        '<div class="checkbox"><label><input type="checkbox" ng-model="statusFilter.his">History</label></div>' +
        '</fieldset>' +
        '</div>' +

        '<div class="col-md-2">' +
        '<fieldset>' +
        '<legend>Booking Details</legend>' +
        '<div class="form-group" style="margin-top: 10px"><label for="selectSource">Booking Source</label><select class="form-control" id="selectSource">' +
        '<option val="">All Sources</option>' +
        '</select></div>' +
        '<div class="form-group"><label for="selectChannel">Booking Channel</label><select class="form-control" id="selectChannel">' +
        '<option val="">All Channels</option>' +
        '</select></div>' +
        '</fieldset>' +
        '</div>' +

        '\t\t\t</div>\n' +
        '\t\t\t<div class="modal-footer">\n' +
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

            scope.statusFilter = {"res": true, "cxl": true, "dna": true,"cin": true,"cko": true,"cty": true,"his":true};
        }
    }
})