app.filter('status',['$filter' function($filter){
    return function(items){
        var terms = query.split(",");
        var arrayToReturn = [];

        items.forEach(function(item){
            var passTest = true;
            terms.forEach(function(term){
                passTest = passTest && (item.toLowerCase().indexOf(term.toLowerCase())> -1);
            })
            if(passTest){
                arrayToReturn.push(item);
            }
        })
        return arrayToReturn;
    }
}])