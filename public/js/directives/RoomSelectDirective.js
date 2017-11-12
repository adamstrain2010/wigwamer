app.directive("roomSelect", function(dashboard, $rootScope, appService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="row" id="roomSelectModal">\n' +
        '<div class="col-md-12">\n' +
        '<div class="modal-dialog modal-lg modalFullHeight modalBox" role="document" esc-key="testing()">' +
        '<div class="modal-content">'+
        '<div class="modal-header modal-header-primary">'+
        '<div class="row">'+
        '<div class="col-md-12 padBottom15">'+
        '<button type="button" class="close closeBtn" data-dismiss="modal" aria-label="Close"><span class="white" aria-hidden="true">&times;</span></button>'+
    '<h4 class="modal-title white" id="myModalLabel">Select a Room | <i>{{numSelectable - numSelected}} Double<span ng-if="(numSelectable - numSelected) != 1">s</span> left to select</i></span>'+

    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="modal-body-custom" ng-switch="modalContextOpen">' +
        '<div class="row" style="padding-bottom: 15px">' +
        '    <div class="col-md-3 padBottom15">'+
         '   <label class="radio-inline"><input type="radio" name="optradio" ng-model="availContext.type" value="a" checked>Available</label>'+
        '<label class="radio-inline"><input type="radio" name="optradio" ng-model="availContext.type" value="r">All</label>'+
        '</div>'+
        '   <div class="row">'+
      '  <div class="col-md-12">'+
        '<div class="row">'+
        '<div>'+
        '<div>'+
    '<table style="width: 100%">'+
        '<tr>'+
        '<td style="border: thin solid black; height: 40px;"></td>'+
        '<th ng-repeat="day in days" style="border: thin solid black">{{day}}</th>'+
    '</tr>'+
    '<tr ng-repeat="room in rooms" class="roomRow">'+
        '<td style="border: thin solid black; height: 40px; font-weight: bold">{{room.number}}</td>'+
    '<td ng-repeat="day in days" style="border: thin solid black; height: 40px;" ng-click="selectRoom(room)" class="dayRoom"><i ng-show="room.selected" class="fa fa-check white" aria-hidden="true"></i></td>'+
    '</tr>'+
    '</table>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+

    '</div>'+
    '<div class="modal-footer">' +
    '<button class="btn modalButton" data-dismiss="modal" ng-click="saveRooms()">Select</button>'+
    '<button type="button" class="btn btn-default btnNegative choiceButtons closeBtn" data-dismiss="modal">Close</button>'+
        '</div>'+
        '</div>' +

    '</div>\n' +
        '</div>',
        link: function (scope, elem, attrs) {
            scope.updateList = function(){
                console.log(scope);
            }


            scope.availContext = {"type":"a"};
            var enumerateDaysBetweenDates = function(startDate, endDate) {
                startDate = moment(startDate);
                endDate = moment(endDate);

                var now = startDate.clone(), dates = [];

                while (now.isBefore(endDate)) {
                    dates.push(now.format('DD/MM/YYYY'));
                    now.add('days', 1);
                }
                return dates;
            };

            console.log(this);
            scope.days = enumerateDaysBetweenDates('2017-06-13', '2017-06-15');

            //scope.rooms = [{"number":101,"roomId": 1000001, "selected": false},{"number":102,"roomId": 1000002, "selected": false},{"number":103,"roomId": 1000003,  "selected": false},{"number":104, "roomId": 1000004,  "selected": false}];
            //scope.days = ["01/01/2017","02/01/2017","03/01/2017","04/01/2017"];


            scope.numSelectable = 1;
            scope.numSelected = 0;

            scope.selectedRooms = [];

            scope.clearAllocation = function(idRes){
                console.log(this);
                console.log(scope);
                appService.allocateRoom(this.reservation.idreservation,null)
                    .then(function(result){
                        console.log(result);
                    })
                    .catch(function(err){
                        console.log(err);
                    })

                scope.updateReservations(scope.arrivalDate);
            }

            scope.showRoomSelectModal = function(){
                scope.numSelected = 0;
                scope.selectedRooms = [];
                var selectedUnitType;
                var arriving;
                var departing;
               if(this.hasOwnProperty('reservation')){
                    scope.selectedReservation = this.reservation;
                    selectedUnitType = this.reservation.idunittype;
                    console.log(selectedUnitType);
                    arriving = moment(this.reservation.fromdate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    console.log(this.reservation.todate)
                    departing = moment(this.reservation.todate, "DD/MM/YYYY").format("YYYY-MM-DD");
                }
                else{
                    console.log(this);
                    console.log(scope);
                    selectedUnitType = this.selectedUnitType.idunitype;
                    arriving = moment(this.arrivalDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    departing = moment(this.departureDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                }
                console.log("SELECTED UNNIT TYPE: " + selectedUnitType);
                console.log(scope);
                console.log(arriving);
                console.log(departing);

                //scope.days = enumerateDaysBetweenDates('2017-06-13', '2017-06-15');
                scope.days = enumerateDaysBetweenDates(arriving, departing);
                console.log
                if(selectedUnitType == null){
                    alert("select a room type first");
                    return;
                }
                else{
                    dashboard.getConcurrentRooms(arriving,departing,selectedUnitType)
                        .then(function(result){
                            console.log("done!");
                            scope.rooms = result.data[0][0];
                            console.log(scope.rooms);
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
                $("#roomSelectModal").css("display", "block");
                $(".modalBack").css("display", "block");
            }

            scope.Tester = function(){

            };

            scope.selectRoom = function(){
                var rows = document.getElementsByClassName("roomRow");
                console.log(rows);
                var els = rows[this.$parent.$index].getElementsByClassName("dayRoom");
                var runSelect = null;
                //console.log(rows[this.parent.index]);
                if(rows[this.$parent.$index].getElementsByClassName("dayRoom")[0].classList.contains("selectedBox")){
                    runSelect = false;
                }
                else if(!rows[this.$parent.$index].getElementsByClassName("dayRoom")[0].classList.contains("selectedBox") && scope.numSelected < scope.numSelectable){
                    runSelect = true;
                }
                if(runSelect == false){
                    for(var i = 0; i < els.length; i++){
                        rows[this.$parent.$index].getElementsByClassName("dayRoom")[i].classList.remove("selectedBox");
                        this.$parent.room.selected = false;
                    };
                    var indexOfRoom = scope.selectedRooms.indexOf(this.$parent.room.roomId);
                    console.log(indexOfRoom);
                    if(indexOfRoom > -1){
                        scope.selectedRooms.splice(indexOfRoom,1);
                    }
                    console.log(scope.numSelected);
                    if(scope.numSelected > 0){
                        scope.numSelected--;
                    }
                }
                else if(runSelect == true){
                    for(var i = 0; i < els.length; i++){
                        if(scope.numSelected < scope.numSelectable){
                            els[i].className += " selectedBox";
                            this.$parent.room.selected = true;
                            //console.log(this.parent.room);
                        }
                    }
                    scope.selectedRooms.push(this.$parent.room.roomId)
                    scope.numSelected++;
                    //console.log(scope.numSelected);
                }
                console.log(scope.selectedRooms);
                console.log("");
            }

            scope.saveRooms = function(){
                console.log(scope);
                console.log(this);
                for(var i = 0; i < scope.selectedRooms.length; i++){
                    this.roomsToSave = scope.selectedRooms;
                    if(scope.hasOwnProperty('selectedReservation')){
                        console.log(this.roomsToSave);
                        appService.allocateRoom(scope.selectedReservation.idreservation,this.roomsToSave[0])
                            .then(function(result){
                                console.log(result);
                            })
                            .catch(function(err){
                                console.log(err);
                            })
                        hideModals();
                        scope.updateReservations(scope.arrivalDate);
                    }
                    else{
                        console.log("SCOPE:");
                        console.log(scope);
                        console.log("THIS:");
                        console.log(this);
                        hideModals();
                        //$scope.rooms;
                    }
                }

                if(scope.numSelectable != scope.numSelected){
                    var choice = confirm("You have not allocated all rooms. Do you want to continue?");
                    if(choice == true){
                        hideModals();
                    }
                    else{
                        return;
                    }
                }



            }

            function hideModals(){
                $(".modalBack").css("display", "none");
                $("#roomSelectModal").css("display", "none");
            }


            $('.closeBtn').click(function(){
                hideModals();
            })
        }
    }
})