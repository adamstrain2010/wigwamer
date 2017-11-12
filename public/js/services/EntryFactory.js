app.factory("Entry", function($resource){
    return $resource("http://52.19.183.139:1234/api/getRoomTypes/:organisationId");
})