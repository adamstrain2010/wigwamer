app.directive("searchKey", function(){
	return function(scope,element, attrs){
		element.bind("keyup", function(){
			console.log(attrs.$$element[0].value);
		})
	};
});