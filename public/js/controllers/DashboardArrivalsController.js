//ARRIVALS CONTROLLER
app.controller('DashboardArrivalsController',function($scope,$http,$rootScope,  helpers, reservation, dashboard,$animate, $mdDialog){
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
	
	$scope.cancelStatus = null;
	
	$scope.cancelQuestion = function(ev){
		var confirm = $mdDialog.confirm()
		.title('Cancel')
		.textContent('Are you sure you want to cancel this reservation?')
		.ariaLabel('Are you sure you want to cancel this reservation?')
		.targetEvent(ev)
		.cancel('No')
		.ok('Yes')
		
		$(".modalBack").css("display", "none");
		$mdDialog.show(confirm).then(function() {
			$scope.carryOutCancellation();
		}, function() {
			$(".modalBack").css("display", "block");
		});
	}
	
	$scope.checkInMessage = function() {
      alert = $mdDialog.alert({
        title: 'Check In',
        textContent: 'The reservation is now checked in. The key can be handed to the guest.',
        ok: 'Close'
      });

      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }
	
	// $scope.cancel = function(resNum){
		// $scope.closeModal();
		// $scope.decision = null;
			// $scope.message = {"title": "Cancelling Reservation", "body": "Are you sure you want to cancel reservation #" + resNum + "?"};
			
			// $(".decisionModal").css("display","block");
	// }
	
	
	$scope.carryOutCancellation = function(){
		resNum = this.selectedReservation.idreservation;
		dashboard.cancelReservation(resNum)
		.then(function(data){
			dashboard.getReservations($scope.arrivalDate)
			.then(function(response){
				$scope.loaded = false;
				$scope.reservations = response.data.recordset;
				$scope.numReservations = $scope.reservations.length;
				$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
				$scope.loaded = true;
			})
			.then(function(){
				$scope.message = {"title": "Cancelled", "body": "Reservation #" + resNum + " has been cancelled."};
				$(".decisionModal").css("display","none");
				$(".messageModal").css("display","block");
			})
		})
	}
	
	
	
	$scope.numReservations = null;
	//JUST FOR DEV
	//DELETE AFTERWARDS
	$scope.tester = false;
	
	
	$scope.loaded = false;
	$('.closeBtn').click(function(){
		$(".modalBack").css("display", "none");
	})
	
	$scope.arrivalDate = '2017-06-11';
	$scope.changeToResAll = function(){
		var apiUrl = "http://52.19.183.139:1234/api/changeAllToReservation";
		$http.post(apiUrl)
		.then(function(){
			dashboard.getReservations($scope.arrivalDate)
			.then(function(response){
				$scope.reservations = response.data.recordset;
				$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
			});
		});
	};
	
	$scope.setModal = function(state){
		$scope.modalContextOpen = state;
	}
	$scope.modalContextOpen = "reservation";
	
	$rootScope.systemDateLong = moment('2017-11-01').format("dddd, MMMM Do YYYY");
	
	$scope.modalMenuOptions = [{"title": "Reservation","state":"reservation"},{"title": "Breakdown","state":"breakdown"},{"title": "Posting","state":"posting"},{"title": "History","href":"history"}]
	
	//$scope.contextMenu = {"title":"check in", "function":"checkIn(this.selectedReservation.idreservation)"};
	$scope.contextMenu = {"title":"check in", "function":"console.log(this)"};
	
	
	$scope.checkIn = function(el){
		console.log(el);
		dashboard.checkInSingle(el)
		.then(function(data){
				dashboard.getReservations($scope.arrivalDate)
				.then(function(response){
					$scope.loaded = false;
					$scope.reservations = response.data.recordset;
					$scope.numReservations = $scope.reservations.length;
					$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
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
	$rootScope.subtitle = "arrivals";
	
	$scope.sortType = "reservationname";
	$scope.sortReverse = false;

	$rootScope.searchOpen = false;
	$rootScope.search = function(){
		console.log("searching function activated");
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
				console.log(result.data.recordset)
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
	
	dashboard.getReservations($scope.arrivalDate).then(function(response){
		$scope.reservations = response.data.recordset;
		$scope.numReservations = $scope.reservations.length;
		$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
		$scope.loaded = true;
	});

	$scope.selectedReservation;
	
	$scope.setCurrentReservation = function(reservationNum){
		console.log(reservationNum.reservation.idreservation);
		dashboard.showData(reservationNum.reservation.idreservation)
		.then(function(res){
			$scope.selectedReservation = res.recordset[0]; 
			$scope.selectedReservation.arrivalDate = moment($scope.selectedReservation.fromdate).format("YYYY-MM-DD");
			$scope.selectedReservation.departureDate = moment($scope.selectedReservation.todate).format("YYYY-MM-DD");
			console.log($scope.selectedReservation);
			console.log(helpers.urlEncodeObject($scope.selectedReservation));
			$(".modalFullHeight").css("display", "block");
			$('.modalBack').css("display", "block");
		})
		.catch(function(err){
			console.log(err);
		})
	};

	$scope.saveReservation = function(){
		console.log(helpers.urlEncodeObject($scope.selectedReservation));
		reservation.save(encodeURI(helpers.urlEncodeObject($scope.selectedReservation)))
		.then(function(){
			alert("Saved Successfully!");	
		})
		.catch(function(err){
			console.log(err);
		});		
	};
	
	$scope.createReservation = function(){
		console.log("yep");
		$http.post("http://52.19.183.139:1234/api/createReservation")
		.then(function(data){
			dashboard.getReservations($scope.arrivalDate).then(function(response){
				$scope.reservations = response.data.recordset;
				$scope.reservations.forEach(function(r){ r.arrivalDate = moment(r.arrivalDate).format("DD/MM/YY"); r.departureDate = moment(r.departureDate).format("DD/MM/YY")});
			});
		});
	};
	
	$scope.add500Reservations = function(){
		for(var i = 0; i < $scope.newResN; i++){
			dashboard.createReservation("Strain", "Adam", '2017-06-11', '2017-06-12', 1)
			.then(function(result){
				console.log(result);
				console.log("reservation #" + i + "created successfully!");
			})
			.catch(function(err){
				console.log(err);
			});
		}
		console.log("ALL RESERVATIONS ADDED");
		dashboard.getReservations($scope.arrivalDate).then(function(response){
			$scope.loaded = false;
			$scope.reservations = response.data.recordset;
			$scope.numReservations = $scope.reservations.length;
			$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
			$scope.loaded = true;
		});
	};
	
	
	$scope.cancelAll = function(){
		console.log("going");
		dashboard.cancelAll()
		.then(function(data){
			dashboard.getReservations($scope.arrivalDate)
			.then(function(response){
				$scope.loaded = false;
				$scope.reservations = response.data.recordset;
				$scope.numReservations = $scope.reservations.length;
				$scope.reservations.forEach(function(r){ r.fromdate = moment(r.fromdate).format("DD/MM/YY"); r.todate = moment(r.todate).format("DD/MM/YY")});
				$scope.loaded = true;
			});
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
	
	
	
});	

