app.controller("ViewReservationsController", function($scope, $rootScope ,dashboard, appService, $mdDateRangePicker){
    $rootScope.pageTitle = "VIEW RESERVATIONS";
    $rootScope.subtitle = "";

    $scope.loaded = false;

    $scope.flag = {"changed": false};

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.systemDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
            $scope.rawDate = result.data.recordset[0].systemdate;
            $scope.systemDateObj =   $rootScope.globalSystemDate.toDate();
            console.log($scope.systemDateObj);
        })
        .then(function(){
            // console.log($scope.departing.from.format(""));
            // dashboard.getAllReservations($scope.systemDate,$scope.systemDate, $scope.departing.from.format("YYYY-MM-DD"), $scope.departing.to.format("YYYY-MM-DD"))
            //     .then(function(data){
            //         console.log(data);
            //         $scope.reservations = data.data.recordset;
            //         $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
            //         $scope.loaded = true;
            //     })
            //     .catch(function(err){
            //
            //     })
            //from here
            $scope.arriveModel.dateStart =  $rootScope.globalSystemDate.toDate();
            $scope.arriveModel.dateEnd = $rootScope.globalSystemDate.toDate();
            $scope.departModel.dateStart = moment('1900-01-01').toDate();
            $scope.departModel.dateEnd= moment('2200-01-01').toDate();
            $scope.departModel.activeMonth = $rootScope.globalSystemDate.toDate().getMonth();
            //to here
            //$scope.getReservationsFull();
        })
        .then(function(){
            dashboard.getReservationsFull(moment($scope.arriveModel.dateStart).format("YYYY-MM-DD"), moment($scope.arriveModel.dateEnd).format("YYYY-MM-DD"), moment($scope.departModel.dateStart).format("YYYY-MM-DD"), moment($scope.departModel.dateEnd).format("YYYY-MM-DD"))
                .then(function(data){
                    console.log(data.data[0][0]);
                    $scope.reservations = data.data[0][0];
                    $scope.reservations.forEach(function(r){r.fromdate = moment(r.fromdate).format("DD/MM/YYYY"); r.todate = moment(r.todate).format("DD/MM/YYYY"); r.toPay = r.toPay.toFixed(2)})
                    console.log($scope.reservations);
                    $scope.loaded = true;
                })
                .catch(function(err){
                    console.log(err);
                })
        })
        .then(function(){
            $scope.arriving = {"from":moment($scope.systemDate), "to":moment($scope.systemDate)};
            $scope.arrivalDate = $rootScope.globalSystemDate.toDate();
            $scope.departureDate = $rootScope.globalSystemDate.clone().add(1, 'days').toDate();
            $scope.arriveModel.dateStart =  $rootScope.globalSystemDate.toDate();
            $scope.arriveModel.dateEnd = $rootScope.globalSystemDate.toDate();
            $scope.arriveModel.selectedTemplateName = moment($rootScope.globalSystemDate).format("DD MMM YYYY");
            $scope.departModel.dateStart =  $rootScope.globalSystemDate.toDate();
            $scope.departModel.dateEnd = $rootScope.globalSystemDate.toDate();

            // $scope.departModel.dateEnd = null;
            // $scope.departModel.dateStart =  null;
        })
        .catch(function(err){
            console.log(err);
        })

    var today = new Date();

    $('.closeBtn').click(function(){
        $scope.getReservationsFull();
        console.log("closing");
        $(".modalBack").css("display", "none");
        $scope.setModal('reservation');
    })

    $scope.getReservationsFull = function(){
        console.log($scope.flag.changed);
        var departFromDate = $scope.departModel.dateStart == null ? '1900-01-01' : $scope.departModel.dateStart;
        var departToDate = $scope.departModel.dateEnd == null ? '2200-01-01' : $scope.departModel.dateEnd;
        if($scope.flag.changed == false){
            departFromDate = '1900-01-01';
            departToDate = '2200-01-01';
        }
        dashboard.getReservationsFull(moment($scope.arriveModel.dateStart).format("YYYY-MM-DD"), moment($scope.arriveModel.dateEnd).format("YYYY-MM-DD"), moment(departFromDate).format("YYYY-MM-DD"), moment(departToDate).format("YYYY-MM-DD"))
            .then(function(data){
                console.log(data.data[0][0]);
                $scope.reservations = data.data[0][0];
                $scope.reservations.forEach(function(r){r.fromdate = moment(r.fromdate).format("DD/MM/YYYY"); r.todate = moment(r.todate).format("DD/MM/YYYY"); r.toPay = r.toPay.toFixed(2)})
                console.log($scope.reservations);
            })
            .catch(function(err){
                console.log(err);
            })
    }

    $scope.mdCustomTemplates = [
        {
            name:"SystemDate",
            dateStart: $scope.systemDateObj,
            dateEnd : $scope.systemDateObj
        }
    ];

    console.log($scope.mdCustomTemplates.dateEnd);

    $scope.page = 'calendar';

    $scope.onArrivalSelect = function(){
        $scope.arriving.from = moment($scope.arriveModel.dateStart);
        $scope.arriving.to = moment($scope.arriveModel.dateEnd);
        $scope.getReservations();
    }

    $scope.onDepartureSelect = function(){
        $scope.flag.changed = true;
        $scope.departing.from = moment($scope.departModel.dateStart);
        $scope.departing.to = moment($scope.departModel.dateEnd);
        $scope.getReservations();
    }

    $scope.getReservations = function(){
        console.log($scope.flag.changed);
        console.log($rootScope.globalSystemDate);
        statusCounter = statusCounter.length - 1;
        $scope.statusFilter = statuses[statusCounter];
        if($scope.arriveModel.dateStart == null){
            $scope.arriving.from = moment($scope.systemDate);
            console.log($scope.arriving.from);
        }
        if($scope.arriveModel.dateEnd == null && $scope.arriveModel.dateStart == null){
            $scope.arriving.to = moment($scope.systemDate);
            console.log($scope.arriving.to);
        }
        if($scope.arriveModel.dateEnd == null && $scope.arriveModel.dateStart != null){
            $scope.arriving.to = moment($scope.arriveModel.dateStart);
            console.log($scope.arriving.to);
        }
        if($scope.departModel.dateStart == null){
            $scope.departing.from = moment('1900-01-01');
            console.log($scope.departing.from);
        }
        if($scope.departModel.dateEnd == null && $scope.departModel.dateStart == null){
            $scope.departing.to = moment('2200-01-01');
            console.log($scope.departing.to);
        }
        if($scope.departModel.dateEnd == null && $scope.departModel.dateStart != null){
            $scope.departing.to = moment($scope.departModel.dateStart);
            console.log($scope.departing.to);
        }
        if($scope.arriveModel.dateStart == null && $scope.departModel.dateStart != null){
            $scope.arriving.from = moment("1900-01-01");
            $scope.arriving.to = moment("2200-01-01");
        }
        $scope.loaded = false;
        console.log($scope.arriving)
        dashboard.getReservationsFull($scope.arriving.from.format("YYYY-MM-DD"),$scope.arriving.to.format("YYYY-MM-DD"), $scope.departing.from.format("YYYY-MM-DD"), $scope.departing.to.format("YYYY-MM-DD"))
            .then(function(data){
                console.log(data);
                $scope.reservations = data.data[0][0];
                $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YYYY"); r.todate = moment(r.todate).format("DD/MM/YYYY");; r.toPay = r.toPay.toFixed(2)});
                $scope.loaded = true;
            })
            .catch(function(err){
                console.log(err);
            })
    }

    $scope.clearAll = function(){
        console.log(this);
        alert("hello");
    }

    $scope.testing123 = function(){
        console.log($scope);
        $scope.getReservations();
    }

    $scope.calendarModel = { selectedTemplate: 'TD' };
    $scope.arriveModel = { dateStart: null };
    $scope.departModel = {  };
    $scope.serviceModel = {};
    $scope.selectedDate = {};
    $scope.selectedDates = [];

    // $scope.arriveModel.activeMonth =  $scope.systemDate.


    $scope.statusFilter = '';

    var statuses = ["Reservation", "Cancellation","Checked In",''];
    var statusCounter = 0;

    $scope.showFilters = function(){
        console.log($scope);
        $(".modalBoxes").css("display", "none");
        $("#viewFilterModal").css("display", "block");
        $(".modalBack").css("display", "block");
    }


    $scope.selectedRange = {
        selectedTemplate: 'SystemDate',
        selectedTemplateName: 'Today',
        dateStart: null,
        dateEnd: null,
        showTemplate: false,
        fullscreen: false
    };

    $scope.arriving = {"from":$scope.systemDate, "to":$scope.systemDate};
    $scope.departing = {"from":moment("1900-01-01"), "to": moment('2200-01-01')};

    $scope.selectDateRange = function () {
        $mdDateRangePicker.show({
            model: $scope.serviceModel,
        }).then(function (result) {
            $scope.serviceModel = result;
        }).catch(function () {
            console.log('Cancelled');
        });
    }

    $scope.isDisabledDate = function(d) {
        return d.getDay() === 0 ||  d.getDay() === 6;
    }

    $scope.clearAll = function () {
        $scope.calendarModel = { dateStart: null };
        $scope.pickerModel = { dateStart: null };
        $scope.serviceModel = { dateStart: null };
    }

    $scope.thisReservation = {
        "reservationNumber":null,
        "surname":null,
        "forename": null,
        "arriving": null,
        "departing": null,
        "unitTypeId": null,
        "unitId": null,
        "unitDescription": null,
        "rateCodeId": null
    };

$scope.setCurrentReservation = function(reservation){
    $(".modalBoxes").css("display", "none");
    $("#resWinModal").css("display", "block");
    $(".modalBack").css("display", "block");
    dashboard.showData(reservation.res.idreservation)
        .then(function(res){
            console.log(res);
            $scope.selectedReservation = res.recordset[0];
            console.log($scope.selectedReservation);
            $scope.thisReservation.reservationNumber = $scope.selectedReservation.idreservation;
            $scope.thisReservation.surname = $scope.selectedReservation.surname;
            $scope.thisReservation.forename = $scope.selectedReservation.forename;
            $scope.thisReservation.arriving = moment($scope.selectedReservation.fromdate).toDate();
            $scope.thisReservation.departing = moment($scope.selectedReservation.todate).toDate();
            $scope.thisReservation.unitTypeId = $scope.selectedReservation.idunittype;
            $scope.thisReservation.unitId = $scope.selectedReservation.idunit;
            $scope.thisReservation.unitDescription = $scope.selectedReservation.unitdescription;
            $scope.thisReservation.rateCodeId = $scope.selectedReservation.idratecode;

            console.log($scope.thisReservation);

            console.log($scope.thisReservation);

            $scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.fromdate).toDate();
            $scope.selectedReservation.departureDate = moment($scope.selectedReservation.todate).toDate();
            if($scope.selectedReservation.idunit == null){
                $scope.allocated = false;
            }
            else{
                $scope.allocated = true;
            }
            $(".modalFullHeight").css("display", "block");
            $('.modalBack').css("display", "block");
            console.log($scope.selectedReservation);
        })
        .then(function(){
            $scope.getBalanceToPay(reservation.res.idreservation);
        })
        .catch(function(err){
            console.log(err);
        })
    };

    $rootScope.getBalanceToPay = function(idReservation){
        dashboard.getBalanceToPay(idReservation)
            .then(function(result){
                $rootScope.balToPay = (result.data[0][0][0].balanceToPay).toFixed(2);
            })
            .catch(function(err){
                console.log(err);
            })
    };

    $(".closeBtn").click(function(){
        $(".modalBack").css("display", "none");
    });

}).config(function($mdDateLocaleProvider){
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }})