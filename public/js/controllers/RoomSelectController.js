app.controller("roomSelect",function($scope){
    $scope.rooms = [{"number":101,"roomId": 1000001, "selected": false},{"number":102,"roomId": 1000002, "selected": false},{"number":103,"roomId": 1000003,  "selected": false},{"number":104, "roomId": 1000004,  "selected": false}];
    $scope.days = ["01/01/2017","02/01/2017","03/01/2017","04/01/2017"];

    $scope.numSelectable = 3;
    $scope.numSelected = 0;

    $scope.selectedRooms = [];

    $scope.selectRoom = function(){
        var rows = document.getElementsByClassName("roomRow");
        var els = rows[this.$parent.$index].getElementsByClassName("dayRoom");
        var runSelect = null;
        //console.log(rows[this.$parent.$index]);
        if(rows[this.$parent.$index].getElementsByClassName("dayRoom")[0].classList.contains("selectedBox")){
            runSelect = false;
        }
        else if(!rows[this.$parent.$index].getElementsByClassName("dayRoom")[0].classList.contains("selectedBox") && $scope.numSelected < $scope.numSelectable){
            runSelect = true;
        }
        if(runSelect == false){
            for(var i = 0; i < els.length; i++){
                rows[this.$parent.$index].getElementsByClassName("dayRoom")[i].classList.remove("selectedBox");
                this.$parent.room.selected = false;
            };
            var indexOfRoom = $scope.selectedRooms.indexOf(this.$parent.room.roomId);
            console.log(indexOfRoom);
            if(indexOfRoom > -1){
                $scope.selectedRooms.splice(indexOfRoom,1);
             }
            console.log($scope.numSelected);
            if($scope.numSelected > 0){
                $scope.numSelected--;
            }
        }
        else if(runSelect == true){
            for(var i = 0; i < els.length; i++){
                if($scope.numSelected < $scope.numSelectable){
                    els[i].className += " selectedBox";
                    this.$parent.room.selected = true;
                    //console.log(this.$parent.room);
                }
            }
            $scope.selectedRooms.push(this.$parent.room.roomId)
            $scope.numSelected++;
            //console.log($scope.numSelected);
        }
        // console.log($scope.selectedRooms);
        console.log("runSelect: " + runSelect);
        console.log("numSelectable: " + $scope.numSelectable);
        console.log("numSelected: " + $scope.numSelected);
        console.log("");
    }


})