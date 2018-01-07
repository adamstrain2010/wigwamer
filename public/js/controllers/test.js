app.controller('testController', function($scope, $mdDateRangePicker, dashboard){
    console.log("test");
    $scope.rooms = [{"num":101},{"num":102},{"num":103},{"num":104},{"num":105}];
    $scope.dates = ["2017-08-13","2017-08-14","2017-08-15", "2017-08-16"];

    //arrivalDate, departureDate
    
    // $scope.availDate = [
    //     [{"date": "2017-06-01","num":101, "avail": false, "arriving":true, "reservationId":1000, "resName": "Strain,Adam", "nights": 2, "arriving": '2017-06-01', "departing": '2017-06-03'},
    //     {"date": "2017-06-02","num":101, "avail": false, "arriving": false, "reservationId":1000, "resName": "Strain,Adam", "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-03","num":101, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-04","num":101, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-05","num":101, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null}],
    //
    //     [{"date": "2017-06-01","num":102, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-02","num":102, "avail": false, "arriving": true, "reservationId":1005, "resName": "Davies, Sarah", "nights": 1, "arriving": '2017-06-02', "departing": '2017-06-03'},
    //     {"date": "2017-06-03","num":102, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-04","num":102, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-05","num":102, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null}],
    //
    //     [{"date": "2017-06-01","num":103, "avail": false, "arriving": true, "reservationId":1001, "resName": "Holman,Richard", "nights": 2, "arriving": '2017-06-01', "departing": '2017-06-03'},
    //     {"date": "2017-06-02","num":103, "avail": false, "arriving": false,"reservationId":1001, "resName": "Holman,Richard", "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-03","num":103, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-04","num":103, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-05","num":103, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null}],
    //
    //     [{"date": "2017-06-01","num":201, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-02","num":201, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-03","num":201, "avail": false, "arriving": true, "reservationId":1002, "resName": "Strain,Adam", "nights": 2, "arriving": '2017-06-03', "departing": '2017-06-05'},
    //     {"date": "2017-06-04","num":201, "avail": false, "arriving": false, "reservationId":1002, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-05","num":201, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null}],
    //
    //     [{"date": "2017-06-01","num":202, "avail": false, "arriving": true, "reservationId":1003, "resName": "Strain,Adam", "nights": 1, "arriving": '2017-06-01', "departing": '2017-06-02'},
    //     {"date": "2017-06-02","num":202, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-03","num":202, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null},
    //     {"date": "2017-06-04","num":202, "avail": false, "arriving": true, "reservationId":1004, "resName": "Strain,Adam", "nights": 1, "arriving": '2017-06-04', "departing": '2017-06-05'},
    //     {"date": "2017-06-05","num":202, "avail": true, "arriving": false, "reservationId":null, "resName": null, "nights": null, "arriving": null, "departing": null}]
    // ];

    
    // for(var i = 0; i < $scope.availDate.length; i++){
    //     for(var i2 = 0; i2 < $scope.availDate[i].length; i2++){
    //         $scope.availDate[i].forEach(function(r){r.date = moment(r.date).format("DD/MM/YYYY"); console.log(r.date)});
    //             //= moment($scope.availDate[i][i2].date).format("DD/MM/YYYY");
    //     }
    //
    // }

    $scope.testing = function(){
        $scope.selectedRes = this.$parent.date;
        //console.log(this.$parent.date);
    }

    $scope.showScope = function(){
        console.log($scope);
    }



    dashboard.getPlannerData('2017-08-13', '2017-08-24')
        .then(function(data){
            var numDays = moment('2017-08-24').diff(moment('2017-08-13'), 'days');
            console.log("numDays: " + numDays);
            var plannerData = data.data[0][0];
            plannerData.forEach(function(r){r.date = moment(r.date).format("DD/MM/YYYY")})
            console.log("PLANNER DATA");
            $scope.availDate = plannerData.chunk(numDays);
            console.log(plannerData);
        })
        .then(function(){
            $scope.$digest();
        })
        .catch(function(err){
            console.log(err);
        })


    $scope.overCallback = function(){
        console.log("I'm over this!");
    }

    $scope.dropCallback = function(event, ui){
        console.log(event);
        console.log(ui);
        console.log("Dropped");
    }

    // $(document).ready(function(){
    //     $(".reservationDragBox").draggable();
    // })

    $(".dropper").on("drop", function(ev, ui){
        console.log("dropped");
    })

    $(".reservationDragBox").on("dragstop", function(ev, ui){
        console.log("stopped");
    })

    $scope.test = function(){
        console.log("testing");
    }
});


