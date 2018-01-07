app.directive('ngDraggable', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var options = scope.$eval(attrs.ngDraggable); //allow options to be passed in
            elm.draggable(options);
        }
    };
});

app.directive('droppable', function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm, attrs) {
            var options = scope.$eval(attrs.ngDroppable); //allow options to be passed in
            elm.droppable(options);
        }
    };
});