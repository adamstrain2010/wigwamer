//DEPARTURES CONTROLLER
app.controller('DashboardDeparturesController',function($scope,$http,$rootScope, helpers, reservation, dashboard,appService, $mdDialog){

    $scope.showSnack = function(){
        appService.showSnackBar($rootScope.message);
    };

    $scope.showSnackTest = function(){
        $rootScope.message = "This is how a message will look.";
        appService.showSnackBar($rootScope.message);
    };

    if($rootScope.messageToShow == true){
        $scope.showSnack();
        $rootScope.messageToShow = false;
    };








    $scope.testing = function(){
        console.log("adam");
    }

    appService.getSystemDate()
        .then(function(result){
            $rootScope.globalSystemDate = moment(result.data.recordset[0].systemdate);
            $rootScope.displayDate = moment(result.data.recordset[0].systemdate).format("Do MMMM YYYY");
            $scope.systemDate = moment(result.data.recordset[0].systemdate).format("YYYY-MM-DD");
        })
        .then(function(){
            getReservations($scope.systemDate);// $scope.arrivalDate = moment($rootScope.globalSystemDate, "DD/MM/YYYY").toDate();
            // $scope.departDate = moment($rootScope.globalSystemDate, "DD/MM/YYYY").toDate();
        })
        // .then(function(){
        //     appService.getRoomTypes(1)
        //         .then(function(data){
        //             $scope.unitTypes = data.data.recordset;
        //         })
        //         .then(function(){
        //             appService.getRateCodes(1,1)
        //                 .then(function(data){
        //                     $scope.ratecodes = data.data.recordset;
        //                 })
        //                 .catch(function(err){
        //                     console.log(err);
        //                 });
        //         })
        //         .catch(function(err){
        //             console.log(err);
        //         });
        // })
        .catch(function(err){
            console.log(err);
        });

    function getReservations(arrivalDate){
        $scope.loaded = false;
        dashboard.getReservationsDeparting($scope.systemDate)
            .then(function(response){
				$scope.reservations = response.data[0][0];
				$scope.numReservations = $scope.reservations.length;
				$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
				$scope.reservations.forEach(function(r){ r.toPay = r.toPay.toFixed(2)});
                $scope.loaded = true;
            });
    }



    $scope.testModal = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam')

        $mdDialog.show(confirm).then(function() {
            $scope.status = 'You decided to get rid of your debt.';
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.resTypeOptions = {"canCancel": false, "canCheckIn": false, "canCheckOut": true};

    $scope.cancelStatus = null;

    $scope.checkOutQuestion = function(ev){
    	console.log($scope.selectedReservation);
        var confirm = $mdDialog.confirm()
            .title('Check Out')
            .textContent('Are you sure you want to check out #' + $scope.selectedReservation.idreservation +" - " + $scope.selectedReservation.reservationname + '?')
            .ariaLabel('Are you sure you want to cancel this reservation?')
            .targetEvent(ev)
            .cancel('No')
            .ok('Yes')

        $(".modalBack").css("display", "none");
        $mdDialog.show(confirm).then(function() {
            dashboard.checkOut($scope.selectedReservation.idreservation, $scope.selectedReservation.idunit)
                .then(function(){
                    getReservations($scope.systemDate);
                })
        }, function() {

            $(".modalBack").css("display", "block");
        });
    }

    $scope.balanceQuestion = function(ev){
        console.log($scope.selectedReservation.idreservation);
    	// dashboard.getBalanceToPay($scope.selectedReservation.idreservation)
         //    .then(function(result){
         //        var balance = (result.data[0][0][0].balanceToPay).toFixed(2);
         //        if(balance > 0){
         //            var confirm = $mdDialog.confirm()
         //                .title('Check In')
         //                .textContent('Are you sure you want to check in this reservation? It still has an unsettled balance of £' + balance + '.')
         //                .ariaLabel('Are you sure you want to check in this reservation? It still has an unsettled balance.')
         //                .targetEvent(ev)
         //                .cancel('No')
         //                .ok('Yes')
         //            $(".modalBack").css("display", "none");
         //            $mdDialog.show(confirm).then(function() {
         //                console.log($scope.selectedReservation);
         //                $scope.checkIn($scope.selectedReservation);
         //                //$scope.checkIn();
         //            }, function() {
         //                $(".modalBack").css("display", "block");
         //            });
         //        }
         //        else{
         //            $scope.checkIn($scope.selectedReservation);
         //        }
         //    })
         //    .catch(function(err){
         //        console.log(err);
         //    })

    }

    $scope.checkInMessage = function() {
        $rootScope.message = "The guest is now checked in. You may hand the key to the guest";
        $scope.showSnack();
    }

    // $scope.cancel = function(resNum){
    // $scope.closeModal();
    // $scope.decision = null;
    // $scope.message = {"title": "Cancelling Reservation", "body": "Are you sure you want to cancel reservation #" + resNum + "?"};

    // $(".decisionModal").css("display","block");
    // }


    $scope.showSimpleToast = function(){
        $mdToast.show(
            $mdToast.simple()
                .position('top right')
                .textContent('Reservation Cancelled')
        )
    };


    // $scope.openToast = function($event) {
    // $mdToast.show($mdToast.simple().textContent('Reservation cancelled').position("bottom right"));
    // };

    $scope.carryOutCancellation = function(){
        resNum = this.selectedReservation.idreservation;
        dashboard.cancelReservation(resNum)
            .then(function(data){
                dashboard.getReservations($scope.systemDate)
                    .then(function(response){
                        $scope.loaded = false;
                        $scope.reservations = response.data[0][0];;
                        $scope.numReservations = $scope.reservations.length;
                        $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY"); r.toPay = r.toPay.toFixed(2)});
                        $scope.loaded = true;
                    })
                    .then(function(){
                        $rootScope.message = "Reservarvation #" + resNum + " has been cancelled.";
                        $scope.showSnack();
                    })
            })
    }



    $scope.numReservations = null;


    $scope.loaded = false;
    $('.closeBtn').click(function(){
        getReservations($rootScope.globalSystemDate);
        console.log("closing");
        $(".modalBack").css("display", "none");
        $scope.setModal('reservation');
    })

    // $scope.arrivalDate = '2017-06-11';
    $scope.changeToResAll = function(){
        var apiUrl = "http://52.19.183.139:1234/api/changeAllToReservation";
        $http.post(apiUrl)
            .then(function(){
                dashboard.getReservations($scope.systemDate)
                    .then(function(response){
                        $scope.reservations = response.data.recordset;
                        $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
                    });
            });
    };

    $scope.testSave = function(){
        var els = [];
        els = document.getElementsByClassName('ng-touched');
        console.log(this);
    }

    $scope.saveButtonDisabled = false;

    $scope.setModal = function(state){
        $scope.saveButtonDisabled = state != 'reservation' ? true : false;
        $scope.modalContextOpen = state;
    }
    $scope.modalContextOpen = "reservation";

    $rootScope.systemDateLong = moment('2017-11-01').format("dddd, MMMM Do YYYY");

    $scope.modalMenuOptions = [{"title": "Reservation","state":"reservation"},{"title": "Breakdown","state":"breakdown"},{"title": "Posting","state":"posting"},{"title": "History","href":"history"}]

    //$scope.contextMenu = {"title":"check in", "function":"checkIn(this.selectedReservation.idreservation)"};
    $scope.contextMenu = {"title":"check in", "function":"console.log(this)"};


    $scope.checkIn = function(el){
        console.log(el);
        dashboard.checkInSingle(el.idreservation, el.idunit)
            .then(function(data){
                dashboard.getReservations($scope.systemDate)
                    .then(function(response){
                        $scope.loaded = false;
                        $scope.reservations = response.data[0][0];
                        $scope.numReservations = $scope.reservations.length;
                        $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY"); r.toPay = r.toPay.toFixed(2)});
                        $(".modalFullHeight").css("display", "none");
                        $scope.checkInMessage();
                        $(".modalBack").css("display", "none");
                        $scope.loaded = true;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            })
    };
    $scope.filterText = '';
    $(document).on('hidden.bs.modal',"#myModal",function(){
        if($scope.checkedIn == true){
        }
    });

    // $(document).on('hidden.bs.modal','#myModal',function(){
    // $("#myMessageModal").modal("show");
    // });

    // $(document).ready(function(){
    // $("#myMessageModal").modal("show");
    // });




    // $scope.closeModal = function(){
    // $(".fullScreenModal").css("display", "none")
    // $("body").css("overflow", "scroll")
    // };

    $(document).on("click", "#searchClose", function(){
        $scope.closeModal();
    });

    $scope.searchedReservations = [{"name":"adam"},{"name":"roger"},{"name":"david"},{"name":"jim"}];

    $rootScope.contextMenuOptions = [{"title": "Arrivals","href":"dashboard/arrivals"},{"title": "Departures","href":"dashboard/departures"},{"title": "In House","href":"dashboard/inHouse"},{"title": "New Reservation","href":"dashboard/newReservation"}]
    $rootScope.pageTitle = "DASHBOARD|";
    $rootScope.subtitle = "departures";

    $scope.sortType = "reservationname";
    $scope.sortReverse = true;

    $rootScope.searchOpen = false;
    $rootScope.search = function(){
        $("#mainSearchInput").val('');
        $("body").css("overflow", "hidden")
        $(".fullScreenModal").css("display","block");
        $scope.searchOpen = true;
        $("#mainSearchInput").focus();
    };

    $scope.searchedResers;

    $scope.doSearch = function(searchTerm){
        if(searchTerm.length >= 3){
            dashboard.doSearch(searchTerm)
                .then(function(result){
                    $scope.searchedResers = result.data.recordset;
                })
        }
        else{
            $scope.searchedResers = [];
        }
    };

    $scope.hideModal = function(){
    };

    $scope.printInfo = dashboard.showData;



    $scope.reservation = {reservationNum: -1, surname:"surname", forename:"forename", reservationName: "surname,forename",arrivalDate: moment("1900-01-01"), departureDate: moment("1900-01-01"),bookingSource:-1};
    $scope.reservations;
    $scope.selectedReservation;
    //getReservations();


    $scope.selectedReservation;

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

    $scope.setCurrentReservation = function(reservationNum){
        dashboard.showData(reservationNum.reservation.idreservation)
            .then(function(res){
                $scope.selectedReservation = res.recordset[0];
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

                $scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.fromdate).toDate();
                $scope.selectedReservation.departureDate = moment($scope.selectedReservation.todate).toDate();
                if($scope.selectedReservation.idunit == null){
                    $scope.allocated = false;
                }
                else{
                    $scope.allocated = true;
                }
                console.log($scope.allocated);
                $(".modalFullHeight").css("display", "block");
                $('.modalBack').css("display", "block");
                console.log($scope.selectedReservation);
            })
            .then(function(){
                $scope.getBalanceToPay(reservationNum.reservation.idreservation);
            })
            .catch(function(err){
                console.log(err);
            })
    };

    // $scope.saveReservation = function(){
    // console.log(helpers.urlEncodeObject($scope.selectedReservation));
    // reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
    // .then(function(){
    // alert("Saved Successfully!");
    // })
    // .catch(function(err){
    // console.log(err);
    // });
    // };

    // $scope.createReservation = function(){
    // console.log("yep");
    // $http.post("http://52.19.183.139:1234/api/createReservation")
    // .then(function(data){
    // dashboard.getReservations($scope.arrivalDate).then(function(response){
    // $scope.reservations = response.data.recordset;
    // $scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
    // });
    // });
    // };

    $scope.add500Reservations = function(callback){
        for(var i = 0; i < $scope.newResN; i++){
            var ranNum = Math.floor(Math.random()*4) + 1
            dashboard.createReservation("Strain", "Adam", $scope.systemDate, $rootScope.globalSystemDate.add("days",1).format("YYYY-MM-DD"), ranNum, 1,1,1)
                .catch(function(err){
                    console.log(err);
                });
        }
        console.log($scope.newResN + " reservations entered.");
        console.log("ALL RESERVATIONS ADDED");
        getReservations($scope.systemDate);
        // dashboard.getReservations($scope.arrivalDate).then(function(response){
        // $scope.loaded = false;
        // $scope.reservations = response.data.recordset;
        // $scope.numReservations = $scope.reservations.length;
        // $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
        // $scope.loaded = true;
        // });
    };


    $scope.cancelAll = function(){
        dashboard.cancelAll()
            .then(function(data){
                getReservations($scope.systemDate);
                // dashboard.getReservations($scope.arrivalDate)
                // .then(function(response){
                // $scope.loaded = false;
                // $scope.reservations = response.data.recordset;
                // $scope.numReservations = $scope.reservations.length;
                // $scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
                // $scope.loaded = true;
                // });
            })
            .catch(function(err){
                console.log(err);
            });
    };

    $scope.closeModal = function(){
        $(".modalBox").css("display","none");
        $(".modalBack").css("display","none");
    };

    $scope.message;

    $scope.checkedIn = false;



    $scope.extraChargesToAdd = [];
    $scope.addExtraChargeToList = function(){
        // var toAdd = {"extraId": HERE, "extraType": $scope.extraType, "qty": $scope.qty, "unitPrice": 2.2, "subTotal": $scope.qty * 2.2};
        // $scope.extraChargesToAdd.push(toAdd);
        // console.log($scope.addExtraChargeToAdd);
    }

    $rootScope.getBalanceToPay = function(idReservation){
        dashboard.getBalanceToPay(idReservation)
            .then(function(result){
                $rootScope.balToPay = (result.data[0][0][0].balanceToPay).toFixed(2);
            })
            .catch(function(err){
                console.log(err);
            })
    };

    $scope.isPristine = function(el){
        if(document.getElementsByName("resForm")[0].classList.contains('ng-pristine')){
            console.log("ITS PRISTINE!");
        }
    }

    $scope.updateReservation = function(){
        $scope.loaded = false;
        $scope.numReservations = 0;
        console.log($scope.resForm);
        console.log(resForm);
        dashboard.updateRes($scope.thisReservation.reservationNumber,$scope.thisReservation.forename,moment($scope.thisReservation.arriving, "MM/DD/YYYY").format("YYYY-MM-DD"),moment($scope.thisReservation.departing, "MM/DD/YYYY").format("YYYY-MM-DD"),$scope.thisReservation.unitTypeId, $scope.thisReservation.unitId, $scope.thisReservation.rateCodeId)
            .then(function(result){
                $rootScope.message = "Reservation " + $scope.thisReservation.reservationNumber + " successfully updated.";
                $scope.showSnack();
                getReservations($scope.systemDate);
            })
            .catch(function(err){
                console.log(err);
            })

    }



}).config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
    }
});