app.directive('ngEsc', function () {
    return function (scope, element, attrs) {
        element.bind("keyup", function (event) {
            if(event.which === 27) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEsc);
                });

                event.preventDefault();
            }
        });
    };
});