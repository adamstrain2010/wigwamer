app.directive("historyPartial", function($rootScope,dashboard){
    return {
        restrict: 'E',
        replace: false,
        template: '<div class="row">\n' +
        '<div class="col-md-12">' +
        '<table class="table table-striped table-bordered">' +
        '<tr>' +
        '<thead>' +
        '<tr>' +
        '<th style="width: 10%">Date</th>' +
        '<th style="width: 90%">Message</th>' +
        '</tr>' +
        '</thead>' +
        '<tr ng-repeat="entry in history">' +
        '<td>{{entry.insertdate}}</td>' +
        '<td style="text-align: left">{{entry.type}} was changed from {{entry.oldvalue}}  to {{entry.newvalue}}.</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</div>',
        link: function(scope, elem, attrs){
            scope.history = [{"insertdate":"31/10/2017","type": "arrival date","oldvalue": "01/06/2017", "newvalue": "02/06/2017"},{"insertdate":"31/10/2017","type": "arrival date","oldvalue": "02/06/2017", "newvalue": "01/06/2017"}];
        }
    }

});