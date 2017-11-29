app.controller('testController', function($scope, $mdDateRangePicker){
    $scope.showModal = function(){
        $(".modalBack").css("display", "block");
    }

    $scope.filter = {status:{"reservation": true, "cancellation": true, "dna": true, "enquiry": false, "waitlisted": true, "option": false, "cin": true, "cko": true, "city": true, "history": true},bookingsource:"Show All", bookingchannel:"Show All"};

    $scope.bookingSources = [{"reservationsourcedescription": "Booking.com"}]
    $scope.bookingChannels = [{"reservationchanneldescription": "Telephone"},{"reservationchanneldescription": "Walk In"},{"reservationchanneldescription": "Email"}];
    $scope.saveRooms = function(){
        console.log($scope.filter);
    }

    $('.closeBtn').click(function(){
        $(".modalBack").css("display", "none");
    })

    $scope.setCleanStatus = function(statusId){
        console.log(statusId);
    }
});


