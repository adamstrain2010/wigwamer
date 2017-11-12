app.controller('testController', function($scope,Entry){
    var entry = Entry.get({organisationId: 1}, function(){
        console.log(entry);
    })
});


