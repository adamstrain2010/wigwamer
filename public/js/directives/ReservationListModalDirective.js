var data;
app.directive("reservationListModal", function(dashboard, $rootScope){
    return{
        template: '<div class="modal-dialog modal-lg modalFullHeight modalBox" role="document" esc-key="testing()">\n' +
        '\t\t<div class="modal-content">\n' +
        '\t\t\t<div class="modal-header modal-header-primary">\n' +
        '\t\t\t\t<div class="row">\n' +
        '\t\t\t\t\t<div class="col-md-12 padBottom15">\n' +
        '\t\t\t\t\t\t<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>\n' +
        '\t\t\t\t\t\t<h4 class="modal-title white" id="myModalLabel">Reservation List <span class="darker">|</span> {{ resListDateFormatted }} <span class="darker">|</span> {{ unitType }}</h4>\n' +
        '\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t\t</div>\n' +
        '<div class="row" style="padding-top: 15px;padding-left: 5px;" ng-show="loaded">\n' +
        '\t<div class="col-md-3">\n' +
        '\t\t<label class="radio-inline"><input type="radio" name="optStatusRadio" ng-model="resStatusContext.type" value="1" ng-checked="true">Reservations</label>\n' +
        '\t\t<label class="radio-inline"><input type="radio" name="optStatusRadio" ng-model="resStatusContext.type" value="2">Cancellations</label>\n' +
        '\t\t<label class="radio-inline"><input type="radio" name="optStatusRadio" ng-model="resStatusContext.type" value="">All</label>\n' +
        '\t</div>\n' +
        '\t<div class="col-md-1">\n' +
        '\t</div>\n' +
        '\t<div class="col-md-2">\n' +
        '\t</div>\n' +
        '\t<div class="col-md-1">\n' +
        '\t</div>\n' +
        '\t<div class="col-md-2">\n' +
        '\t\t<!-- Date input -->\n' +
        '\t\t<!-- Date input -->\n' +
        '\t</div>\n' +
        '\t<div class="col-md-2">\n' +
        '\t</div>\n' +
        '\t<div class="col-md-1" style="text-align: center">\n' +
        '\t</div>\n' +
        '<dir-pagination-controls\n' +
        '    class="modalPaginatorContainer"' +
        '    [max-size=""]\n' +
        '    [direction-links=""]\n' +
        '    [boundary-links=""]\n' +
        '    [on-page-change=""]\n' +
        '    [pagination-id=""]\n' +
        '    [template-url=""]\n' +
        '    [auto-hide=""]>\n' +
        '    </dir-pagination-controls>' +
        '</div>' +
        '\t\t\t<div class="modal-body" style="overflow-y: scroll; height:65%">\n' +
        '<div ng-show="status.length == 0"><h4 style="text-align: center">No Reservations</h4></div>' +
        '<table class="table table-striped table-bordered" ng-show="status.length > 0">' +
        '<thead>' +
        '<th><a class="noFingerLink" href="#">Status</a></th>' +
        '<th><a class="noFingerLink" href="#">Reservation #</a></th>' +
        '<th><a class="noFingerLink" href="#">Reservation Name</a></th>' +
        '<th><a class="noFingerLink" href="#">Arrival Date</a></th>' +
        '<th><a class="noFingerLink" href="#">Departure Date</a></th>' +
        '<th><a class="noFingerLink" href="#">Unit Type</a></th>' +
        '<th><a class="noFingerLink" href="#">Confirmation #</a></th>' +
        '<th><a class="noFingerLink" href="#">Booking Source</a></th>' +
        '</thead>' +
        '<tbody>' +
        '<tr dir-paginate="inHouseReservation in inHouseReservations | itemsPerPage: 15 | filter:{idreservationstatus:resStatusContext.type} as status">' +
        '<td>{{inHouseReservation.reservationstatusdescription}}</td>' +
        '<td>{{inHouseReservation.idreservation}}</td>' +
        '<td>{{inHouseReservation.reservationname}}</td>' +
        '<td>{{inHouseReservation.fromdate}}</td>' +
        '<td>{{inHouseReservation.todate}}</td>' +
        '<td>{{inHouseReservation.unittypedesc}}</td>' +
        '<td>{{inHouseReservation.reservationsourcecode}}-1234567</td>' +
        '<td><span data-toggle="tooltip" title="{{inHouseReservation.reservationsourcedescription}}" class="bSource ng-binding" style="background-color: {{inHouseReservation.reservationcolour}}; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold">{{inHouseReservation.reservationsourcecode}}</span></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '\n' +
        '\t\t\t</div>\n' +
        '\t\t\t\t<div class="modal-footer">\n' +
        '\t\t\t\t\t<button type="button" class="btn btn-default btnNegative choiceButtons closeBtn data-dismiss="modal"">Close</button>\n' +
        '\t\t\t\t</div>\n' +
        '\t\t</div>',
        restrict: 'E',
        replace: false,
        link: function(scope,elem, attrs){

            // scope.reservations = scop
            data = scope;
            scope.resStatusContext = {"type":1};
            scope.test = function(){
                scope.inHouseReservations = [];
                scope.inHouseReservations = scope.inHouseResList.data[0][0];
                console.log(scope.inHouseReservations);
                scope.inHouseReservations.forEach(function(r){r.fromdate = moment(r.fromdate).format("DD/MM/YYYY");r.todate = moment(r.todate).format("DD/MM/YYYY"); console.log(r)});
            }
            $(".closeBtn").click(function(){
                $(".modalBack").css("display", "none");
            })
        }
    }
})