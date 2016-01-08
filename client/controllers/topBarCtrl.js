angular.module('FoodParty')
.controller('TopBarController', function($scope, MainService, $state, $timeout) {

	$scope.logout = function() {
		MainService.logout().then(function(){
			$state.go('login');
		})
	}

    $timeout(function(){
        $(".topBtn").click(function () {
            var t = $(this);
            $timeout(function(){

            },1)
        });
    },1)



})